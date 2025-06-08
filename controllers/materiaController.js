const materiaService = require('../services/materiaService');

const criarMateria = async (req, res) => {
    try{
        const {materiaid, nomemateria, cursoid} = req.body;
        if (!materiaid || !nomemateria || !cursoid) {
            return res.status(400).json({message: 'Entrada inválida!'});
        }
        const materiaCriada = await materiaService.criarMateria(materiaid, nomemateria, cursoid);
        res.status(201).json(materiaCriada);
    }  catch (error) {
        res.status(500).json({error: error.message});
    }
}
const consultarMaterias = async (req, res) => {
    try {
        const materias = await materiaService.consultarMaterias();
        res.status(200).json(materias);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
const atualizarMateria = async (req, res) => {
    try {
        const {materiaid, nomemateria, cursoid} = req.body;
        if (!materiaid || !nomemateria || !cursoid) {
            return res.status(400).json({message: 'Entrada inválida!'});
        }
        const materiaAtualizada = await materiaService.atualizarMateria(materiaid, nomemateria, cursoid);
        res.status(200).json(materiaAtualizada);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
const deletarMateria = async (req, res) => {
    try {
        const {materiaid} = req.body;
        if (!materiaid) {
            return res.status(400).json({message: 'Entrada inválida!'});
        }
        const materiaDeletada = await materiaService.deletarMateria(materiaid);
        res.status(200).json(materiaDeletada);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const consultarMateriasPorCurso = async (req, res) => {
    try {
        const { cursoid } = req.query;
        if (!cursoid) {
            return res.status(400).json({ message: 'Curso não informado!' });
        }
        const materias = await materiaService.consultarMateriasPorCurso(cursoid);
        res.status(200).json(materias);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

module.exports = {
    criarMateria,
    consultarMaterias,
    atualizarMateria,
    deletarMateria,
    consultarMateriasPorCurso
}