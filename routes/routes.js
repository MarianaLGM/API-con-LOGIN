const users=require("../users/users");
const express=require("express");
const {generateToken, verifyToken}= require("../middlewares/middlewares") ;
const router=express.Router();
const axios=require("axios");

router.get('/', (req, res) => {
    const loginForm = `
        <form action="/login" method="post">
        <label for="username">Usuario:</label>
        <input type="text" id="username" name="username" required><br>

        <label for="password">Contraseña:</label>
        <input type="password" id="password" name="password" required><br>

        <button type="submit">Iniciar sesión</button>
        </form>

        <a href="/dashboard">dashboard</a>
        `;

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



module.exports=router;


