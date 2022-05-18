//const url = require("url")
const http = require("http")
const fs = require("fs")
const { nuevoUsuario, guardarUsuario } = require("./usuarios") // destructurar metodos importados

http // disponibilizar ruta raiz con la app
    .createServer((req, res) => {
        if (req.url === "/" && req.method === "GET") {
            res.setHeader("content-type", "text/html")
            res.end(fs.readFileSync("index.html", "utf8"))
        }
        if (req.url.startsWith("/usuario") && req.method === "POST") { // crear ruta para ejecutar funcion con consulta asincrona con axios a la ApiRandomUser
            nuevoUsuario()
                .then(async (usuario) => { // .then muestra el retorno exitoso de la función nuevoUsuario (usuarios.js)
                    guardarUsuario(usuario)
                    res.end(JSON.stringify(usuario))
                })
                .catch((e) => {  // manejo de error
                    res.statusCode = 500
                    res.end()
                    console.log("Error en el registro de un usuario", e)
                })
        }
        if (req.url.startsWith("/usuarios") && req.method === "GET") { // especificar ruta y verifica metodo GET
            res.setHeader("content-type", "application/json")
            res.end(fs.readFileSync("usuarios.json", "utf8")) // lee data de usuarios.json
        }
    })
    .listen(3000, console.log("servidor inicializado en puerto 3000"))

