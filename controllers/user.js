var jwt = require('jsonwebtoken');
var config = require('../config.js');
const axios = require("axios");
const API_KEY = "47f5e50ab41047a87b3a3280cdda25013421300cec8ad39b97df4eba7c7d1711";
async function createInbox() {
    // call MailSlurp createInbox endpoint
     await axios
      .post(`https://api.mailslurp.com/createInbox?apiKey=${API_KEY}`)
      .then((res) => {
         axios({
            method: "POST",
            url: `https://api.mailslurp.com/sendEmail?apiKey=${API_KEY}`,
            data: {
              senderId: res.data.id,
              to: "res.data.emailAddress",
              subject: "Hello inbox 2",
              body: "Test from inbox 1",
            },
          });
      });

  }
  
module.exports = function(router) {
    router.post('/login', function(req, res) {
        /*
         * Check if the username and password is correct
         */
        if( req.body.username === 'admin' && req.body.password === 'admin' ) {
            res.json({
                id: 1,
                username: 'admin',
                jwt: jwt.sign({
                    id: 1,
                }, config.JWT_SECRET, { expiresIn: 60*60 })
            });
        } else {
            /*
             * If the username or password was wrong, return 401 ( Unauthorized )
             * status code and JSON error message
             */
            res.status(401).json({
                error: {
                    message: 'Wrong username or password!'
                }
            });
        }
    });
    router.post("/uploadConfig",function(req,res){
        createInbox();
    })
    router.get("/",(req, res)=>{
        res.send("ddd")
    })
    return router;
};
