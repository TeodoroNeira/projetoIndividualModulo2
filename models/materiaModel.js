const db = require('../config/database');

class Materia {
    static async consultarMaterias() {
        const result = await db.query('SELECT * FROM materias');
        return result.rows;
    }

    static async criarMateria(materiaid, nomemateria, cursoid) {
        const result = await db.query('INSERT INTO materias (materiaid, nomemateria, cursoid) VALUES ($1, $2, $3) RETURNING *', [materiaid, nomemateria, cursoid]);
        return result.rows[0];
    }

    static async atualizarMateria(materiaid, nomemateria, cursoid) {
        const result = await db.query('UPDATE materias SET nomemateria = $2, cursoid = $3 WHERE materiaid = $1 RETURNING *', [materiaid, nomemateria, cursoid]);
        return result.rows[0];
    }

    static async deletarMateria(materiaid) {
        const result = await db.query('DELETE FROM materias WHERE materiaid = $1 RETURNING *', [materiaid]);
        return result.rows[0];
    }
}

module.exports = Materia;