# 🚀 API Escalable Node.js + Express + Supabase

## 📝 Descripción del Proyecto

Esta es una API de backend robusta y escalable construida con **Node.js** y **Express.js**. Su propósito es actuar como un intermediario seguro (Backend for Frontend, **BFF**) entre una aplicación cliente (frontend) y la base de datos **Supabase (PostgreSQL)**.

El proyecto está diseñado con buenas prácticas de producción, enfocándose en la **modularidad**, la **seguridad** (HTTPS manejado por proxy), y la **escalabilidad horizontal** (API *Stateless*).

## 🏛️ Arquitectura y Tecnologías Clave

* **Runtime:** Node.js
* **Framework:** Express.js
* **Base de Datos:** Supabase (PostgreSQL)
* **Cliente DB:** `@supabase/supabase-js` (usando la clave `service_role` para el backend)
* **Seguridad:** `helmet`, `cors`, variables de entorno (`dotenv`).
* **Patrón de Código:** Rutas, Controladores y Servicios (Separación de Responsabilidades).

### Principio de Seguridad (HTTPS)

Esta API está diseñada para correr en **HTTP** (`http://localhost:3000`). En producción, la capa de **HTTPS** y la terminación SSL se gestionan mediante un **Reverse Proxy (Proxy Inverso)**, como **Nginx** o el Balanceador de Carga de la plataforma de hosting (Render, Vercel, etc.). Esto garantiza la seguridad y la eficiencia de la aplicación.

## ⚙️ Configuración y Uso

Sigue estos pasos para poner en marcha el proyecto en tu entorno local.

### Prerrequisitos

* Node.js (versión 18 o superior)
* npm (incluido con Node.js)
* Un proyecto activo en [Supabase](https://supabase.com/) con la tabla `posts` creada.

### 1. Clonar el Repositorio e Instalar Dependencias

```bash
# Clona tu repositorio (o inicia el proyecto)
git clone [URL_DE_TU_REPOSITORIO]
cd apiBaseDatos

# Instala todas las dependencias
npm install