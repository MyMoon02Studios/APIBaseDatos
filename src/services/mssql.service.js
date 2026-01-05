// dependecias
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);

// mssql
const sql = require("mssql/msnodesqlv8");
import sqlconfig from "../config/basedatos.mjs";

/**
 * 2. Funciones de Base de Datos para la tabla 'posts'
 * (Aquí irían todas tus interacciones con la DB)
 */

// Función para subir un nuevo post
const createPost = async (title, content, author) => {
  try {
    const server = await sql.connect(sqlconfig);

    const result = await server.request()
      // IMPORTANTE: Mayúsculas en VarChar y Text
      .input('title', sql.VarChar(sql.MAX), title)
      .input('content', sql.VarChar(sql.MAX), content)
      .input('author', sql.VarChar(sql.MAX), author)
      // Usamos solo OUTPUT para mayor eficiencia
      .query(`
        INSERT INTO posts (title, text, author) 
        OUTPUT INSERTED.* VALUES (@title, @content, @author)
      `);
    
    // Con OUTPUT INSERTED, los datos vienen en el primer recordset
    return { data: result.recordset[0] };

  } catch (error) {
    console.error(`Error al crear el post: ${error.message}`);
    throw error; // Es buena práctica relanzar el error para manejarlo en la ruta
  }
};

// Función para obtener todos los posts (¡un buen ejemplo de escalabilidad!)
const getAllPosts = async () => {
  try {
    const server = await sql.connect(sqlconfig);
    const result = await server.request()
      .query('SELECT * FROM posts ORDER BY created_at DESC');
    
    return result.recordset[0];
    
  }catch (error) {
    console.error(`Error al obtener los posts: ${error.message}`);
    throw error;
  }



};

// Exportamos solo el cliente y las funciones que los controladores necesitan
export {
  createPost,
  getAllPosts,
};
