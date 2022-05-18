const axios = require("axios") // consulta api
const { v4: uuidv4 } = require('uuid') // genera id único universal
const fs = require("fs") // persistencia de los datos

const nuevoUsuario = async () => {
    try {
        const { data } = await axios.get("https://randomuser.me/api/") // extraer de la espera axios.get ApiRandomUser
        const usuario = data.results[0] // mapeo de la ubicación 0 de la propiedad results (esto depende demodelo de datos de la Api )
        const user = { // objeto 
            id: uuidv4().slice(30), // cortamos identificador quitando 30/36 caracteres quedando en un id de 6 dígitos
            correo: usuario.email,
            nombre: `${usuario.name.title} ${usuario.name.first} ${usuario.name.last}`, // interpolación para componer nombre
            foto: usuario.picture.large,
            pais: usuario.location.country,
        }
        return user // funcion será llamada por el servidor por eso debe retornar 
    }   catch (e) {
        throw e // devolvemos error en caso de error
    }
}

const guardarUsuario = (usuario) => {
    const usuariosJSON = JSON.parse(fs.readFileSync("usuarios.json", "utf8")) // Parseo contenido JSON de usuarios.json
    usuariosJSON.usuarios.push(usuario) // uso metodo push para agregar nuevo usario
    fs.writeFileSync("usuarios.json", JSON.stringify(usuariosJSON)) // escribe usuario en el arreglo
}  // JSON.stringify convierte un objeto o valor de JS en cadena de texto JSON

module.exports = { nuevoUsuario, guardarUsuario } // exportar metodos 