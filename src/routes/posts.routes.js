const express = require('express');
const router = express.Router(); // Creamos un mini-servidor/router
const { 
  createPostController,
  getAllPostsController
} = require('../controllers/posts.controller'); // Importamos los controladores

// 1. Ruta para CREAR un nuevo post
// Cuando el usuario hace POST a /, ejecuta createPostController
router.post('/', createPostController);

// 2. Ruta para OBTENER todos los posts
// Cuando el usuario hace GET a /, ejecuta getAllPostsController
router.get('/', getAllPostsController);

module.exports = router;