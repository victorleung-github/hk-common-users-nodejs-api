const mssqlcon = require('../../dbconnection');
const mssql = require('mssql');
class usersService {
    async getUsers(req, res) {
      try {

         const conn = await mssqlcon.getConnection();
         const result = await conn.request().query('select * from users');
         res.send(result.recordset);

      }
      catch (error) {
         console.log(error);
      }
    }

    async addUsers(req, res) {
      try {
         var prod = req.body;
         const conn = await mssqlcon.getConnection();
         const output = await conn.request()
         .input("username", mssql.NVarChar, prod.username)
         .input("password", mssql.NVarChar, prod.password)
         .input("encrypted_password", mssql.NVarChar, prod.encrypted_password)
         .input("email", mssql.NVarChar, prod.email)
         .input("phone", mssql.NVarChar, prod.phone)
         .input("avatar", mssql.NVarChar, prod.avatar)
         .input("display_name", mssql.NVarChar, prod.display_name)
         .input("first_name", mssql.NVarChar, prod.first_name)
         .input("last_name", mssql.NVarChar, prod.last_name)
         .input("facebook", mssql.NVarChar, prod.facebook)
         .input("wechat", mssql.NVarChar, prod.wechat)
         .input("gmail", mssql.NVarChar, prod.gmail)
         .input("permission_level", mssql.Bit, prod.permission_level)
         .input("second_factor_enabled", mssql.Bit, 0)
         .input("is_valid", mssql.Bit, 1)
         .input("created_by", mssql.VarChar, "System Admin")
         .input("created_datetime", mssql.DateTime, new Date())
         .input("modified_by", mssql.VarChar, "System Admin")
         .input("modified_datetime", mssql.DateTime, new Date())
         .query(`
            INSERT INTO 
               [dbo].[users] 
            (
               [username],
               [password],
               [encrypted_password],
               [email],
               [phone],
               [avatar],
               [display_name],
               [first_name],
               [last_name],
               [facebook],
               [wechat],
               [gmail],
               [permission_level],
               [second_factor_enabled],
               [is_valid],
               [created_by],
               [created_datetime],
               [modified_by],
               [modified_datetime]
            ) VALUES ( 
                @username,
                @password,
                @encrypted_password,
                @email,
                @phone,
                @avatar,
                @display_name,
                @first_name,
                @last_name,
                @facebook,
                @wechat,
                @gmail,
                @permission_level,
                @second_factor_enabled,
                @is_valid,
                @created_by,
                @created_datetime,
                @modified_by,
                @modified_datetime
            )`
               );

         res.send(output);
      }
      catch (error) {
         console.log(error);
      }
    }

}
module.exports = new usersService();