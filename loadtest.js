const ac = require('autocannon');

const instance = ac({
    url: 'http://localhost:8080',
    connections: 10,
    duration: 10,
    requests:[
        {
            method: 'POST',
            path: '/api/auth/signin',
            body: Json.stringify({
                username:  'abc',
                password: 'abc'
            }),
            onResponse: (status, res, context) => {
                if(status == 200) {
                    cconsole.log(res);

                    context.accessToken = res.accessToken;
                    context.refreshToken = res.refreshToken;
                }
            }
        },
        {
            method: 'GET',
            path: '/api/content/app',
            setUpRequest: (req, context) => {
                headers: {
                    'x-access-token:' `${context.accessToken}`
                }
            }
        }
    ]
}, (err, res) => {
    if(err) {
        console.log(err);
    }

    console.log(res);
});