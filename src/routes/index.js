const express = require('express');
const router = express.Router();

// Importamos los routers específicos
const postsRouter = require('./posts.routes');

// Definimos los prefijos de ruta (Endpoints)

// Todas las rutas que empiecen por /posts serán manejadas por postsRouter
// Ejemplo: POST /api/posts
router.use('/posts', postsRouter); 

// Puedes añadir más módulos así:
// router.use('/users', require('./users.routes'));

module.exports = router;