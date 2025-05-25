const loginService = require('../services/loginService');

const login = async (req, res) => {
    try {
    const {email, senha } = req.body;
    if (!email || !senha) {
        return res.status(400).json({message: 'Entrada inválida!'});
    }
    const loginTentativa = await loginService.login(email, senha);
    if (loginTentativa.success){
        res.status(200).json(loginTentativa);
    }else {
            res.status(401).json({ message: 'Login ou senha inválidos' });
        }
    
} catch (error) {
    res.status(500).json({error: error.message});
    }
};




module.exports = {
    login
}