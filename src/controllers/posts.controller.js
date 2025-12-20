// Importamos solo las funciones que necesitamos del servicio de Supabase
const { createPost, getAllPosts } = require('../services/supabase.service');
const config = require('../config');

// Función para manejar la creación de un nuevo post (POST /api/posts)
const createPostController = async (req, res, next) => {
  try {
    // 1. Extraer datos de la petición (req.body)
    const { title, content, author, key } = req.headers;

    // *Validación básica (ESENCIAL en cualquier API)*
    if (!title || !content) {
      // Si faltan datos, enviamos un error 400 (Bad Request)
      return res.status(400).json({ 
        message: 'Faltan campos. Los campos "title", "content" y "author" son obligatorios.' 
      });
    }

    if (!key) {
      return res.status(403).json({
        message: 'La clave secreta es obligatoria.'
      });
    }

    else if (key !== config.postKey) {
      return res.status(403).json({
        message: 'Clave secreta incorrecta.'
      });
    }

    // 2. Llamar a la lógica de negocio (el Service)
    // El controlador NO sabe cómo Supabase guarda esto, solo llama a la función.
    const newPost = await createPost(title, content, author);

    // 3. Enviar la respuesta (201 Created)
    return res.status(201).json({
      message: 'Post creado con éxito.',
      data: newPost,
    });

  } catch (error) {
    // Si el servicio lanza un error (ej. error de base de datos), lo pasamos al 
    // manejador global de errores (el último middleware en app.js)
    next(error);
  }
};

// Función para obtener todos los posts (GET /api/posts)
const getAllPostsController = async (req, res, next) => {
  try {
    // 1. Llamar a la lógica de negocio (el Service)
    const posts = await getAllPosts();

    // 2. Enviar la respuesta (200 OK)
    return res.status(200).json({
      count: posts.length,
      data: posts,
    });

  } catch (error) {
    next(error);
  }
};


module.exports = {
  createPostController,
  getAllPostsController,
};