const mssql = require('mssql');
class DBConnection {
  async getConnection() {
     try {
       return await mssql.connect({

              user: 'isvsqladmin',
              password: 'P!2151984',
              server: 'isvsqlserver.database.windows.net', // You can use 'localhost\\instance' to connect to named instance
              database: 'FIS',
              "options": {
                  "encrypt": true,
                  "enableArithAbort": true
              }
       });
       
    }
    catch(error) {
      console.log(error);
    }
  }
}
module.exports = new DBConnection();