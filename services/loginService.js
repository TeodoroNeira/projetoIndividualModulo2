const db = require('../config/database.js');

const login = async (email, senha) =>   {
    try {
        const result = await db.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);
        if (result.rows.length > 0) {
            const user = result.rows[0];
            delete user.senha; // Remova a senha antes de retornar
            return { success: true, user };
        } else {
            return { success: false };
        }
    } catch (error) {
        throw new Error('Erro ao validar o login: ' + error.message);     
    }
}

module.exports = {
    login
}