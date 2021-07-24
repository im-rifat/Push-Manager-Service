const { verifySignUp, validation } = require("../middlewares");
const controller = require("../controllers/authController");
const express = require('express');

const Router = new express.Router();

Router.post('/signup',
            [
                validation.signUpValidationSchema,
                verifySignUp.checkDuplicateUsernameOrEmail,
                verifySignUp.checkRoleExisted
            ],
            controller.signUp);

Router.post('/signin',controller.signIn);
Router.post('/refreshtoken', controller.refreshToken);

module.exports = Router;