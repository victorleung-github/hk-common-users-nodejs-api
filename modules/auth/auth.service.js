const mssqlcon = require('../../dbconnection');
const mssql = require('mssql');
const crypto = require('crypto');
const jwt = require("jsonwebtoken");

class authService {
    async login(req, res) {
      try {
        var prod = req.body;
        const conn = await mssqlcon.getConnection();
        const result = await conn.request()
        .input("email", mssql.NVarChar, prod.email)
        .input("password", mssql.NVarChar, prod.password)
        .query(`select * from users where email = @email and password = @password;`);
        if(result.recordset.length > 0){
            let jwtSecret = "JWTSecret";
            let refreshId = req.body.email + jwtSecret;
            let salt = crypto.randomBytes(16).toString('base64');
            let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
            req.body = {
                id: result.recordset[0].id,
                email: result.recordset[0].email,
                permissionLevel: result.recordset[0].permissionLevel,
                display_name: result.recordset[0].display_name,
                provider: 'email',
                refreshKey: salt,
            };
            let user_data = {
                email: result.recordset[0].email,
                username: result.recordset[0].username,
                name: result.recordset[0].first_name + ' ' + result.recordset[0].last_name,
                display_name: result.recordset[0].display_name,
                provider: 'email', 
            }
            let token = jwt.sign(req.body, jwtSecret, { expiresIn: '10d' });
            let b = Buffer.from(hash);
            let refresh_token = b.toString('base64');

            //res.cookie('auth', token, {SameSite:'None', Secure:false, maxAge:864000000 });
            //res.cookie('user', JSON.stringify(user_data), { maxAge:864000000 });
            res.status(201).send({accessToken: token, refreshToken: refresh_token});

        }else{
            res.send("No Record found.");
        }

      }
      catch (error) {
         console.log(error);
      }
    }

    async getToken(req, res) {
      try {
        if(req && req.cookies && req.cookies.auth){
          jwt.verify(req.cookies.auth,'JWTSecret', function(err, decode){
            if(err){
              res.send("Token invalid.");
            }else{
              console.log(decode);
              if (decode && decode.email){
                let token = req.cookies.auth;
                let jwtSecret = "JWTSecret";
                let refreshId = decode.email + jwtSecret;
                let salt = crypto.randomBytes(16).toString('base64');
                let hash = crypto.createHmac('sha512', salt).update(refreshId).digest("base64");
                let b = Buffer.from(hash);
                let refresh_token = b.toString('base64');
                res.status(201).send({accessToken: token, refreshToken: refresh_token});
              }else{
                res.send("Token invalid.");
              }

            } 
          });
  
        }else{
          res.send("No Cookies found.");
        }

      }
      catch (error) {
         console.log(error);
      }
    }

    async getUser(req, res) {
      try {
        if(req && req.cookies && req.cookies.user){
          let user = JSON.parse(req.cookies.user);
          res.status(201).send(user);
        }else{
          res.send("No Cookies found.");
        }

      }
      catch (error) {
         console.log(error);
      }
    }

    async logout(req, res) {
      let jwtSecret = "JWTSecret";
      try {
        if(req.cookies && req.cookies.auth){
          jwt.verify(req.cookies.auth, jwtSecret, function(err, decode){
            if(err){
              req.user = undefined;
            }else{
              res.clearCookie("auth");
              res.clearCookie("user");
            } 
            next();
          });
          res.clearCookie("auth");
        }else{
          req.user = undefined;
          next();
        }  

      }
      catch (error) {
          console.log(error);
      }
    }
}
module.exports = new authService();