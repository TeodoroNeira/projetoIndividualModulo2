const db = require('../config/database.js');

const consultarCursos = async () => {
    try{
        const result = await db.query('SELECT * FROM cursos');
        return result.rows;
    } catch (error) {
        throw new Error('Erro ao consultar cursos: ' + error.message);
    }
}

const criarCurso = async (cursoid, nomecurso) => {
    try{
        const result = await db.query('INSERT INTO cursos (cursoid, nomecurso) VALUES ($1, $2) RETURNING *', [cursoid, nomecurso]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao criar curso: ' + error.message);
    }   
}

const atualizarCurso = async (cursoid, nomecurso) => {
    try{
        const result = await db.query('UPDATE cursos SET nomecurso = $2 WHERE cursoid = $1 RETURNING *', [cursoid, nomecurso]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao atualizar curso: ' + error.message);
    }
}

const deletarCurso = async (cursoid) => {
    try{
        const result = await db.query('DELETE FROM cursos WHERE cursoid = $1 RETURNING *', [cursoid]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao deletar curso: ' + error.message);
    }
}

module.exports = {
    consultarCursos,
    criarCurso,
    atualizarCurso,
    deletarCurso
}