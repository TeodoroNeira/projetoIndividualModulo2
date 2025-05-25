const cursoService = require('../services/cursoService');

const consultarCursos = async (req, res) => {
    try {
        const cursos = await cursoService.consultarCursos();
        res.status(200).json(cursos);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const criarCurso = async (req, res) => {
    try {
        const { cursoid, nomecurso } = req.body;
        if (!cursoid || !nomecurso) {
            return res.status(400).json({ message: 'Entrada inválida!' });
        }
        const novoCurso = await cursoService.criarCurso(cursoid, nomecurso);
        res.status(201).json(novoCurso);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const atualizarCurso = async (req, res) => {
    try {
        const { cursoid, nomecurso } = req.body;
        if (!cursoid || !nomecurso) {
            return res.status(400).json({ message: 'Entrada inválida!' });
        }
        const cursoAtualizado = await cursoService.atualizarCurso(cursoid, nomecurso);
        res.status(200).json(cursoAtualizado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const deletarCurso = async (req, res) => {
    try {
        const { cursoid } = req.body;
        if (!cursoid) {
            return res.status(400).json({ message: 'Entrada inválida!' });
        }
        const cursoDeletado = await cursoService.deletarCurso(cursoid);
        res.status(200).json(cursoDeletado);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    consultarCursos,
    criarCurso,
    atualizarCurso,
    deletarCurso
};