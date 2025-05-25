const db = require('../config/database.js');

class Curso {
    static async consultarCursos() {
        const result = await db.query('SELECT * FROM cursos');
        return result.rows;
    }

    static async criarCurso(cursoid, nomecurso) {
        const result = await db.query('INSERT INTO cursos (cursoid, nomecurso) VALUES ($1, $2) RETURNING *', [cursoid, nomecurso]);
        return result.rows[0];
    }

    static async atualizarCurso(cursoid, nomecurso) {
        const result = await db.query('UPDATE cursos SET nomecurso = $2 WHERE cursoid = $1 RETURNING *', [cursoid, nomecurso]);
        return result.rows[0];
    }

    static async deletarCurso(cursoid) {
        const result = await db.query('DELETE FROM cursos WHERE cursoid = $1 RETURNING *', [cursoid]);
        return result.rows[0];
    }
}

module.exports = Curso;