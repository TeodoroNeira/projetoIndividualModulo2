const db = require('../config/database.js');

class Usuarios {

    static async consultarUsuarios() {
        const result = await db.query('SELECT * FROM usuarios');
        const usuarios = result.rows.map(({senha, ...rest}) => rest); 
        return usuarios;
    }
    static async criarUsuario(usuarioid, nomeusuario, nascimentousuario, cursoid, senha, email) {
        const result = await db.query('INSERT INTO usuarios (usuarioid, nomeusuario, nascimentousuario, cursoid, senha, email) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [usuarioid, nomeusuario, nascimentousuario, cursoid, senha, email]);
        return result.rows[0];
    }
    static async atualizarUsuario(usuarioid, nomeusuario, nascimentousuario, cursoid, senha, email) {
        const result = await db.query('UPDATE usuarios SET nomeusuario = $2, nascimentousuario = $3, cursoid = $4, senha = $5, email = $6 WHERE usuarioid = $1 RETURNING *', [usuarioid, nomeusuario, nascimentousuario, cursoid, senha, email]);
        return result.rows[0];
    }
    static async deletarUsuario(usuarioid) {
        const result = await db.query('DELETE FROM usuarios WHERE usuarioid = $1 RETURNING *', [usuarioid]);
        return result.rows[0];
    }
}

module.exports = Usuarios;