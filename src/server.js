const app = require('./app'); // Importamos la configuración de Express
const config = require('./config'); // Importamos las variables de entorno

const startServer = () => {
  // Obtenemos el puerto de nuestro archivo de configuración (del .env)
  const port = config.port;

  // Iniciamos el servidor HTTP
  app.listen(port, () => {
    console.log(`\n------------------------------------------------`);
    console.log(`🚀 Servidor de API escalable iniciado en modo ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔗 Accede a la API en: http://localhost:${port}/api`);
    console.log(`------------------------------------------------\n`);
    
    // NOTA HTTPS: Recuerda que esta URL es HTTP local. 
    // En producción, el Reverse Proxy (Nginx) se encargará de servirlo como HTTPS.
  });
};

// Ejecutamos la función
startServer();