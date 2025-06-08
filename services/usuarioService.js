const db = require('../config/database.js');
const consultarUsuarios = async () => {
    try {
        const result = await db.query('SELECT * FROM usuarios');
        const usuarios = result.rows.map(({senha, ...rest}) => rest); 
        return usuarios;
    } catch (error) {
        throw new Error('Erro ao consultar usuários: ' + error.message);
    }
}
const criarUsuario = async (nomeusuario, nascimentousuario, cursoid, senha, email) => {
    try {
        const result = await db.query(
            'INSERT INTO usuarios (nomeusuario, nascimentousuario, cursoid, senha, email) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [nomeusuario, nascimentousuario, cursoid, senha, email]
        );
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao criar usuário: ' + error.message);
    }
}
const atualizarUsuario = async (usuarioid, nomeusuario, nascimentousuario, cursoid, senha, email) => {
    try {
        const result = await db.query('UPDATE usuarios SET nomeusuario = $2, nascimentousuario = $3, cursoid = $4, senha = $5, email = $6 WHERE usuarioid = $1 RETURNING *', [usuarioid, nomeusuario, nascimentousuario, cursoid, senha, email]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao atualizar usuário: ' + error.message);
    }
}
const deletarUsuario = async (usuarioid) => {
    try {
        const result = await db.query('DELETE FROM usuarios WHERE usuarioid = $1 RETURNING *', [usuarioid]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao deletar usuário: ' + error.message);
    }
}
const consultarUsuarioPorId = async (usuarioid) => {
    try {
        const result = await db.query('SELECT * FROM usuarios WHERE usuarioid = $1', [usuarioid]);
        if (result.rows.length > 0) {
            const { senha, ...rest } = result.rows[0];
            return rest;
        }
        return null;
    } catch (error) {
        throw new Error('Erro ao consultar usuário: ' + error.message);
    }
};

module.exports = {
    consultarUsuarios,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    consultarUsuarioPorId
};