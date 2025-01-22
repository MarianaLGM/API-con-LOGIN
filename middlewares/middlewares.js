const jwt = require("jsonwebtoken");
const users=require("../users/users");

//-Función para generar un token JWT utilizando la información del usuario.

function generateToken(user) {
    console.log("este token se ha generado",user)
    return jwt.sign({ user: user.id }, "tu_secreto_secreto", { expiresIn: "1h" });
    }

//- MIDDLEWARE VERIFICACIÓN: verifica la validez del token almacenado en la sesión.

function verifyToken(req, res, next) {
    const token = req.session.token;
    console.log("este es el middleware")
    if (!token) {
    return res.status(401).json({ message: "Token no proporcionado" });
    }   
    jwt.verify(token, "tu_secreto_secreto", (err, decoded) => {//decoded es el resultado que nos está dando ese usuario con el token
    if (err) {
    return res.status(401).json({ message: "Token inválido", error: err.message });
    } 
        req.user = decoded.user;
        next();
    });
    }


module.exports = {
    generateToken,
    verifyToken,
};
    