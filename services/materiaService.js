const db = require('../config/database');

const consultarMaterias = async () => {
    try{
        const result = await db.query('SELECT * FROM materias');
        return result.rows;
    } catch (error) {
        throw new Error('Erro ao consultar matérias: ' + error.message);
}
}
const criarMateria = async (materiaid, nomemateria, cursoid) => {
    try{
        const result = await db.query('INSERT INTO materias (materiaid, nomemateria, cursoid) VALUES ($1, $2, $3) RETURNING *', [materiaid, nomemateria, cursoid]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao criar matéria: ' + error.message);
    }   
}

const atualizarMateria = async (materiaid, nomemateria, cursoid) => {
    try{
        const result = await db.query('UPDATE materias SET nomemateria = $2, cursoid = $3 WHERE materiaid = $1 RETURNING *', [materiaid, nomemateria, cursoid]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao atualizar matéria: ' + error.message);
    }
}
const deletarMateria = async (materiaid) => {
    try{
        const result = await db.query('DELETE FROM materias WHERE materiaid = $1 RETURNING *', [materiaid]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao deletar matéria: ' + error.message);
    }
}

const consultarMateriasPorCurso = async (cursoid) => {
    try {
        const result = await db.query('SELECT * FROM materias WHERE cursoid = $1', [cursoid]);  
        return result.rows;
    }
    catch (error) {
        throw new Error('Erro ao consultar matérias por curso: ' + error.message);
    }
}

module.exports = {
    consultarMaterias,
    criarMateria,
    atualizarMateria,
    deletarMateria,
    consultarMateriasPorCurso
}