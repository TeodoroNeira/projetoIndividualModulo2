const db = require('../config/database');

class Tarefa {
        static async consultarTarefas(usuarioid) {
        const result = await db.query('SELECT * FROM tarefas WHERE usuario_id = $1', [usuarioid]);
        return result.rows;
    }
    static async criarTarefa(tarefaid, nometarefa, descricaotarefa, status, datainicio, datafim, materiaid, usuarioid) {
        const result = await db.query('INSERT INTO tarefas (tarefaid, nometarefa, descricaotarefa, status, datainicio, datafim, materiaid, usuarioid) VALUES ($1, $2, $3, $4, $5, $6, $7, $8) RETURNING *', [tarefaid, nometarefa, descricaotarefa, status, datainicio, datafim, materiaid, usuarioid]);
        return result.rows[0];
    }
    static async atualizarTarefa(tarefaid, nometarefa, descricaotarefa, status, datainicio, datafim, materiaid, usuarioid) {
        const result = await db.query('UPDATE tarefas SET nometarefa = $2, descricaotarefa = $3, status = $4, datainicio = $5, datafim = $6, materiaid = $7 WHERE tarefaid = $1 RETURNING *', [tarefaid, nometarefa, descricaotarefa, status, datainicio, datafim, materiaid]);
        return result.rows[0];
    }
    static async deletarTarefa(tarefaId) {
        const result = await db.query('DELETE FROM tarefas WHERE id = $1 RETURNING *', [tarefaid]);
        return result.rows[0];
    }
}

module.exports = Tarefa;