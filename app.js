const express=require("express");
const axios=require("axios");
const app=express();
const session = require("express-session");

//const { verifyToken } = require("./middlewares/middlewares");


const PORT=3000;



//REQUERIR Y ACCEDER URLENCODED Y JSON:  Middleware para manejar datos de formulario y JSON///El orden importa tiene que ir aquí arriba!!!!!!!!!!!!!
app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

//- Configuración de sesión
//utilizaremos el session vamos a guardarlas de manera permanente y no tendremos que reestablecer una y otra vez la session del token
app.use(
    session({
    secret: "tu_secreto_secreto", // Clave secreta para firmar el token PTE gener con crypto)
    resave: false, // No guardar cambios en la sesión siempre, solo cuando se realice algún cambio./sólo se guardarán cambios si hay un cambio de session, si no poemos resave se guardará si hay o no cambio de session
    saveUninitialized: true, // Se guarda la inicialización de la sesión.con esto se va a guardad la inciailización de nuestra sessión, se no existe se crea. Siempre lo pondremos en TRUE
    cookie: { secure: false }, // sirve para mantener esta session activa.Cambia a 'true' si estás utilizando HTTPS
    })
    );


//app.use("/characters", verifyToken)

const routes=require("./routes/routes");

app.use("/", routes);


app.listen(PORT, ()=>{
    console.log(`Está escuchando en el puerto http://localhost:${PORT}`)//el puerto nunca debe coincidir ocn el del front
})