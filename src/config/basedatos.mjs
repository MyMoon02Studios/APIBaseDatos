import { createRequire } from "module";
const require = createRequire(import.meta.url);

const sql =  require('mssql/msnodesqlv8');

const Config = {
  // Usamos el Driver 17 que aparece en tu lista
  server: 'localhost\\SQLEXPRESS', // Corresponde a Server=localhost\SQLEXPRESS
  database: 'MyMoonChat',               // Corresponde a Database=curso
  driver: 'ODBC Driver 17 for SQL Server',           // Especifica que use el driver nativo de Windows
  options: {
    trustedConnection: true,       // Corresponde a Trusted_Connection=yes
    encrypt: false                 // Corresponde a Encrypt=no (evita problemas de certificados)
  }
};

export default Config;