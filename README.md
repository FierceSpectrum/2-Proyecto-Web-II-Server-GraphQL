# 2° Proyecto Web II Server GraphQL

## Descripción

Este proyecto es una implementación de una API GraphQL que se agrega a la API REST existente. Utiliza JWT para la autenticación y Mongoose para definir esquemas de datos. La API GraphQL se ejecuta en el puerto `3006` y proporciona resolvers para manejar operaciones CRUD sobre cuentas, avatares, playlists, usuarios y videos.

## Funcionalidades

- **GraphQL API:** Permite consultas y mutaciones usando GraphQL.
- **Autenticación JWT:** Protege las consultas y mutaciones mediante tokens JWT.
- **Esquemas y Resolvers:** Utiliza esquemas Mongoose y resolvers para manejar datos.

## Estructura del Proyecto

### Configuración

La API GraphQL está configurada para ejecutarse en el puerto `3006`. Asegúrate de que este puerto esté disponible antes de iniciar el servidor.

### Modelos y Esquemas

Los esquemas son definidos usando Mongoose. Los modelos incluyen:

- **Account**: Maneja la información de las cuentas.
- **Avatar**: Representa los avatares de los usuarios.
- **Playlist**: Define las playlists de videos.
- **User**: Representa los usuarios del sistema.
- **Video**: Define los videos disponibles.

Los esquemas se definen en archivos separados para cada modelo.

### Esquemas GraphQL

Los esquemas de GraphQL se configuran usando la función `buildSchema` de la librería GraphQL. Estos esquemas definen las consultas y mutaciones disponibles.

### Resolvers

Los resolvers son funciones que manejan las consultas y mutaciones de GraphQL. Los resolvers principales incluyen:

- **Account Resolvers**: `GetAccount`, `GetAccounts`
- **Avatar Resolvers**: `GetAvatar`, `GetAvatars`
- **Playlist Resolvers**: `GetPlaylist`, `GetPlaylists`, `GetPlaylistByUser`
- **User Resolvers**: `GetUser`, `GetUsers`
- **Video Resolvers**: `GetVideo`, `GetVideos`, `GetVideoInPlaylist`, `GetVideosInPlaylist`

### Configuración de GraphQL

En el archivo `index.js`, se configura el servidor GraphQL utilizando `GraphQLHTTP`. Se importan los esquemas, resolvers y se definen las queries disponibles.

### Middleware

- **Autenticación JWT**: Se utiliza para proteger la API GraphQL, asegurando que solo los usuarios autenticados puedan acceder a las consultas y mutaciones.

### Ejecución

Para iniciar la aplicación, utiliza los siguientes comandos:

```bash
# Instalar dependencias
npm install

# Iniciar el servidor
npm start
```

### Consultas GraphQL

Ejemplos de consultas GraphQL:

*   **Obtener un usuario:**
    
    ```graphql
    query {
      getUser(id: "user-id") {
        id
        name
        email
      }
    }
    ```

*   **Obtener una lista de usuarios:**
    
    ```graphql
    query {
      getUsers {
        id
        name
        email
      }
    }
    ```

*   **Obtener una playlist por ID:**
    
    ```graphql
    query {
      getPlaylist(id: "playlist-id") {
        id
        name
        videos {
          id
          title
        }
      }
    }
    ```

### Notas

*   Asegúrate de que la base de datos esté en funcionamiento antes de iniciar el servidor.
*   La configuración de JWT debe estar correctamente establecida para garantizar la seguridad de la API.

### Dependencias

- **Node.js**
- **Mongoose**
- **GraphQL**
- **JWT**
- **GraphQLHTTP**

## Estado del Proyecto

Este proyecto fue creado durante el primer cuatrimestre del año 2024, como una práctica para aprender los fundamentos del desarrollo web. Actualmente, se están realizando algunas actualizaciones para mejorar la estructura del código y la organización del repositorio en GitHub.

## Licencia

Este proyecto no tiene una licencia formal. Fue creado con fines educativos y no está destinado para uso comercial. Los desarrolladores son estudiantes de ingeniería de software que están aprendiendo y mejorando sus habilidades.
