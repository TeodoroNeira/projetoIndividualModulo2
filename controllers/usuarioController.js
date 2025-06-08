const usuarioService = require('../services/usuarioService');
const consultarUsuarios = async (req, res) => {
    try {
        const usuarios = await usuarioService.consultarUsuarios();
        res.status(200).json(usuarios);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
const criarUsuario = async (req, res) => {
    try {
        const { nomeusuario, nascimentousuario, cursoid, senha, email } = req.body;
        if (!nomeusuario || !nascimentousuario || !cursoid || !senha || !email) {
            return res.status(400).json({ message: 'Entrada inválida!' });
        }
        const novoUsuario = await usuarioService.criarUsuario(nomeusuario, nascimentousuario, cursoid, senha, email);
        res.status(201).json(novoUsuario);
    } catch (error) {
        res.status(500).json({ errsor: error.message });
    }
};
const atualizarUsuario = async (req, res) => {
    try {
        const { usuarioid, nomeusuario, nascimentousuario, cursoid, senha, email } = req.body;
        if (!usuarioid || !nomeusuario || !nascimentousuario || !cursoid || !senha || !email) {
            return res.status(400).json({ message: 'Entrada inválida!' });
        }
        const usuarioAtualizado = await usuarioService.atualizarUsuario(usuarioid, nomeusuario, nascimentousuario, cursoid, senha, email);
        res.status(200).json(usuarioAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}; 
const deletarUsuario = async (req, res) => {
    try {
        const { usuarioid } = req.body;
        if (!usuarioid) {
            return res.status(400).json({ message: 'Entrada inválida!' });
        }
        const usuarioDeletado = await usuarioService.deletarUsuario(usuarioid);
        res.status(200).json(usuarioDeletado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const consultarUsuarioPorId = async (req, res) => {
    try {
        const { usuarioid } = req.query;
        if (!usuarioid) {
            return res.status(400).json({ message: 'Usuário não informado!' });
        }
        const usuario = await usuarioService.consultarUsuarioPorId(usuarioid);
        if (!usuario) {
            return res.status(404).json({ message: 'Usuário não encontrado!' });
        }
        res.status(200).json(usuario);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    consultarUsuarios,
    criarUsuario,
    atualizarUsuario,
    deletarUsuario,
    consultarUsuarioPorId
}