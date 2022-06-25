//Group members
//Hung Man Kei   (1155127099)	 Ng Megan Hoi Ling (1155124894)
//Ching Sze Yuen (1155126621)    Tsai Kwun Ki      (1155126289)

const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
/*
    app.use("/loc", createProxyMiddleware({
        target: 'http://localhost:3003',
        changeOrigin: true,
        pathRewrite: {
            "^/loc": ""
        }
    }))*/
    app.use("/mpc", createProxyMiddleware({
        target: 'https://maps.googleapis.com/maps/api/place',
        changeOrigin: true,
        pathRewrite: {
            "^/mpc": ""
        }
    }))

    // app.use(
    //     createProxyMiddleware('/mpc', {
    //         target: 'https://maps.googleapis.com',
    //         changeOrigin: true,
    //         ws: true,
    //         pathRewrite: {
    //             "^/mpc": ""
    //         },
    //     })
    // )
    // app.use(
    //     createProxyMiddleware('/loc', {
    //         target: 'http://localhost:3001',
    //         changeOrigin: true,
    //         ws: true,
    //         pathRewrite: {
    //             "^/loc": ""
    //         },
    //     })
    // );

};