const users=require("../users/users");
const express=require("express");
const {generateToken, verifyToken}= require("../middlewares/middlewares") ;
const router=express.Router();
const axios=require("axios");



router.get('/', (req, res) => {
    //Comprobamos si el usuario ya está logeado para cambiar la ruta
    if (req.session.token){
        const usuarioLogeado = `
        <h2>Bienvenido</h2>
        <a href="/search">Ir al buscador de personajes</a><br>
        <form action="/logout" method="post">
            <button type="submit">Cerrar sesión</button>
         </form>
        `
        return res.send(usuarioLogeado);
    }
    const loginForm = `
        <form action="/login" method="post">
        <label for="username">Usuario:</label>
        <input type="text" id="username" name="username" required><br>

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required><br>

        <button type="submit">Iniciar sesión</button>
        </form>

        <a href="/search">dashboard</a>
        `;
    const token = req.session.token;
    console.log(token)

        res.send(loginForm);
    });

    router.post("/login", (req, res) => {
        const {username, password} = req.body;//ERROR desctructurig

        const user = users.find( //si ese user está que me busque contraseña
        (user) => user.username === username && user.password === password
        );
    
        if (user) { //ERROR
        const token = generateToken(user);
        req.session.token = token;
        res.redirect("/characters");//respuesta al dashboard si hay usuario
        } else { //si no hay usuario respondemos con el status 401
        res.status(401).json({ message: "Credenciales incorrectas" });
        }
    });


router.get("/characters", async (req, res)=>{//accedemos a usuarios para que nos devuelva todo el json
    const url=("https://rickandmortyapi.com/api/character") 
        try{
            const response=await axios.get(url)//ASINCRONÍA
            const data=response.data//response.data es un array por lo que no podemos, en este caso hacer destructurin
            res.json(data.results)
            
        }catch (ERROR){
            res.status(404).json({message: "personaje no encontrado", error:ERROR})
        }
    })
/*
router.get('/search', (req, res) => {
        const characterForm = `
            <form action="/search" method="post">
            <label for="Nombre personaje"></label>
            <input type="text" id="Nombre personajes" name="nombre" required><br>
            <button type="submit">Enviar</button>
    
            <button type="submit">Logout</button>
            </form>
    
            <a href="/search/:nombre">dashboard</a>
            `;
    
            res.send(characterForm);
        });

router.post("/search", async (req, res)=>{
    const rickAndMortyNombre=req.body.nombre
    
    const url=(`https://rickandmortyapi.com/api/character/?name=${rickAndMortyNombre}`) 
    
        //haremos un try and catch para manejo de errores:
        try{
            const response=await axios.get(url)//ASINCRONÍA
            const data =response.data
            res.json(data)
        }catch (ERROR){
            res.status(404).json({error: "personaje no encontrado"})
        }
    })*/

router.post('/logout', (req, res) => {
        req.session.destroy((err) => {
          if (err) {
            console.error('Error al cerrar sesión:', err);
          }
          res.redirect('/');
        });
      });   

module.exports=router;


