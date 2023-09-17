const jwt = require('jsonwebtoken');
const CustomAPIError = require('../errors/custom-errors');

const login = async(req, res) => {
    const {username, password} = req.body;

    if(!username || !password){
        throw new CustomAPIError('Username and Password must be provided.', 400);
    }
    // console.log(username, password);
    
    // just for demo, normally provided by DB.
    const id = new Date().getDate();

    const token = jwt.sign({id, username}, process.env.JWT_SECRET, {expiresIn: '30d'});

   res.status(200).json({msg:'User created!', token})
}

const dashboard = async(req, res) => {
 
    const authHeader = req.headers.authorization;

    if(!authHeader || !authHeader.startsWith('Bearer ')){
        throw new CustomAPIError('No token provided', 401);
    }

    const token = authHeader.split(' ')[1];
   
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log(decoded);
        const luckyNumber = Math.floor(Math.random()* 100);
        res.status(200).json({msg:`Hello, ${decoded.username}`, secret: `Here is your authorized data, your lucky number is ${luckyNumber}`});

    } catch (error) {
        throw new CustomAPIError('Not authorized to access this route', 401);
    }

}

module.exports = {
    login,
    dashboard
}