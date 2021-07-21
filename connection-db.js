var mysql = require('mysql'),
    con;

con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "root",
  database : "data_base_3unidade"
});

con.connect((err) => {
  if(!err)
      console.log('Database is connected!');
  else
      console.log('Database not connected! : '+ JSON.stringify(err, undefined,2));
});

module.exports = con;