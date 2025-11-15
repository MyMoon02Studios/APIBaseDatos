const { createClient } = require('@supabase/supabase-js');
const config = require('../config');

// 1. Conexión centralizada
// Creamos el cliente de Supabase usando la URL y la clave secreta
const supabase = createClient(config.supabaseUrl, config.supabaseKey);

/**
 * 2. Funciones de Base de Datos para la tabla 'posts'
 * (Aquí irían todas tus interacciones con la DB)
 */

// Función para subir un nuevo post
const createPost = async (title, content) => {
  // .from('posts') <- Define la tabla a usar
  // .insert <- Define la acción (INSERT)
  // .select() <- Nos aseguramos de devolver el registro recién insertado
  const { data, error } = await supabase
    .from('posts') 
    .insert([{ title, content }])
    .select(); // Devolvemos los datos creados

  if (error) {
    // Es buena práctica lanzar errores para que el controlador los maneje
    throw new Error(`Error al crear el post: ${error.message}`);
  }

  // Devolvemos el primer (y único) registro insertado
  return data[0];
};

// Función para obtener todos los posts (¡un buen ejemplo de escalabilidad!)
const getAllPosts = async () => {
  const { data, error } = await supabase
    .from('posts')
    .select('*'); // '*' significa todas las columnas

  if (error) {
    throw new Error(`Error al obtener los posts: ${error.message}`);
  }

  return data;
};

// Exportamos solo el cliente y las funciones que los controladores necesitan
module.exports = {
  supabase,
  createPost,
  getAllPosts,
};