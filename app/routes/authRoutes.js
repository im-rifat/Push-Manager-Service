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
            controller.signup);

Router.post('/signin',controller.signIn);

module.exports = Router;