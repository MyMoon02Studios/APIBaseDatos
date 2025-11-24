// Este código cargará nuestro archivo .env
require('dotenv').config();

// Exporta un objeto con todas las variables necesarias
const config = {
  port: process.env.PORT || 3000,
  supabaseUrl: process.env.SUPABASE_URL,
  supabaseKey: process.env.SUPABASE_KEY,
  postKey: process.env.POST_KEY,
};

// Verificación de seguridad: si falta la URL o la clave, detenemos la app
if (!config.supabaseUrl || !config.supabaseKey) {
  throw new Error('FATAL ERROR: SUPABASE_URL and SUPABASE_KEY must be defined in the .env file.');
}

module.exports = config;