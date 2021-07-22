const authConfig = require('../configs/authConfig');
const db = require('../models');
const StatusCodes = require('../utils/statusCodes');
const error = require('../errors');

const User = db.user;
const Role = db.role;

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

signup = async (req, res, next) => {
    let savedUser;
    let role;

    try {

        console.log('signup');

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

        let token = jwt.sign({ id: user._id }, authConfig.secretKey, {
            expiresIn: authConfig.accessTokenLife,
        });

        var authorities = [];
        for (let i = 0; i < user.roles.length; i++) {
            authorities.push('ROLE_' + user.roles[i].name.toUpperCase());
        }

        res.status(StatusCodes.StatusCodes.OK).send({
            id: user._id,
            username: user.username,
            email: user.email,
            roles: authorities,
            accessToken: token
        });
    } catch(err) {
        next(err);
    }
};

module.exports = {
    signup,
    signIn
};