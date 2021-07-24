const authConfig = require('../configs/authConfig');
const StatusCodes = require('../utils/statusCodes');
const error = require('../errors');
const bcrypt = require('bcryptjs');
const token = require('../utils/token');

const {user: User, role: Role, refreshtoken: RefreshToken} = require('../models');

signUp = async (req, res, next) => {
    let savedUser;
    let role;

    try {

        const user = new User({
            username: req.body.username,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 8)
        });

        savedUser = await user.save();

        if(req.body.roles) {
            role = await Role.find({name: { $in: req.body.roles }}).exec();

            user.roles = roles.map(role => role._id);
        } else {
            role = await Role.find({name: 'user'}).exec();

            user.roles = [role._id];
        }

        user.save();

        res.send({ message: 'User was registered successfully' });
    } catch(err) {
        if(savedUser) {
            try {
                await User.findByIdAndDelete(savedUser._id).exec();
            } catch(err) {
                return next(err);
            }

            return;
        }

        next(err);
    }
};

signIn = async (req, res, next) => {
    try {
        let user = await User.findOne({username: req.body.username}).populate('roles').exec();

        if(!user) {
            return next(new error.Api404Error('User not found'));
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if (!passwordIsValid) {
            return next(new error.ApiError(StatusCodes.StatusCodes.UNAUTHORIZED, 'Invalid password'));
        }

        let accesstoken = token.create({id: user._id}, authConfig.accessTokenKey, authConfig.accessTokenLife);
        let refreshtoken = token.create({id: user._id}, authConfig.refreshTokenKey, authConfig.refreshTokenLife);

        new RefreshToken({
            token: refreshtoken
        }).save();

        var authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
        }

        res.status(StatusCodes.StatusCodes.OK).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: accesstoken,
            refreshToken: refreshtoken
        });
    } catch(err) {
        next(err);
    }
};

refreshToken = async (req, res, next) => {
    const {refreshToken : requestToken} = req.body;

    console.log(requestToken);

    if(!requestToken) {
        return next(new error.TokenError('Refresh token is required'));
    }

    let refreshToken;

    try {
        refreshToken = await RefreshToken.findOne({
            token: requestToken
        }).exec();

        console.log(refreshToken);

        if(!refreshToken) {
            return next(new error.TokenError('Refresh token not found'));
        }
    } catch(err) {
        next(err);
    }

    let verified;
    try {
        verified = token.verify(refreshToken, authConfig.refreshTokenKey);
    } catch(err) {
        await RefreshToken.findByIdAndDelete(refreshToken._id).exec();
        return next(new error.TokenError('Refresh token expired. Please make a new sign in request.'));
    }

    if(!verified) {
            
        await RefreshToken.findByIdAndDelete(refreshToken._id).exec();
        return next(new error.TokenError('Refresh token expired. Please make a new sign in request.'));
    }

    const newaccesstoken = token.create({id: verified.id}, authConfig.accessTokenKey, authConfig.accessTokenLife);
    const newrefreshtoken = token.create({id: verified.id}, authConfig.refreshTokenKey, authConfig.refreshTokenLife);

    try {
    await RefreshToken.findByIdAndUpdate(refreshToken._id, {token: newrefreshtoken}
        , {new: true, useFindAndModify: false}).exec();

        res.status(StatusCodes.StatusCodes.OK).send({
            accessToken: newaccesstoken
        });
    } catch(err) {
        next(err);
    }
};

module.exports = {
    signUp,
    signIn,
    refreshToken
};