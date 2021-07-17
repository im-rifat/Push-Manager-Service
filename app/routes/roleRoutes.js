const { authJwt } = require("../middlewares");
const controller = require("../controllers/userController");

module.exports = function (app) {
    app.use(function (req, res, next) {
        res.header(
            "Access-Control-Allow-Headers",
            "x-access-token, Origin, Content-Type, Accept"
        );
        next();
    });

    app.use("/api/content", [authJwt.verifyToken], controller.userBoard);

    app.use(
        "/api/mod",
        [authJwt.verifyToken, authJwt.isModerator],
        controller.moderatorBoard
    );

    app.use(
        "/api/admin",
        [authJwt.verifyToken, authJwt.isAdmin],
        controller.adminBoard
    );
};