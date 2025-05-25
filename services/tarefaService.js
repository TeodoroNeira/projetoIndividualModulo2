const db = require('../config/database');

const consultarTarefas = async () => {
    try{
        const result = await db.query('SELECT * FROM tarefas');
        return result.rows;
    } catch (error) {
        throw new Error('Erro ao consultar tarefas: ' + error.message);
}
}
const criarTarefa = async (tarefaid, nometarefa, descricaotarefa, status, datainicio, datafim, materiaid, usuarioid) => {
    try{
        const result = await db.query('INSERT INTO tarefas (tarefaid, nometarefa, descricaotarefa, status, datainicio, datafim, materiaid, usuarioid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [tarefaid, nometarefa, descricaotarefa, status, datainicio, datafim, materiaid, usuarioid]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao criar tarefa: ' + error.message);
    }
}

const atualizarTarefa = async (tarefaid, nometarefa, descricaotarefa, status, datainicio, datafim, materiaid, usuarioid) => {
    try{
        const result = await db.query('UPDATE tarefas SET nometarefa = $2, descricaotarefa = $3, status = $4, datainicio = $5, datafim = $6, materiaid = $7 WHERE tarefaid = $1 RETURNING *', [tarefaid, nometarefa, descricaotarefa, status, datainicio, datafim, materiaid]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao atualizar tarefa: ' + error.message);
    }
}
const deletarTarefa = async (tarefaid) => {
    try{
        const result = await db.query('DELETE FROM tarefas WHERE tarefaid = $1 RETURNING *', [tarefaid]);
        return result.rows[0];
    } catch (error) {
        throw new Error('Erro ao deletar tarefa: ' + error.message);
    }
}

module.exports = {
    consultarTarefas,
    criarTarefa,
    atualizarTarefa,
    deletarTarefa
}