const db = require('../config/db');

class Login {
  static async login(email, senha) {
    const result = await db.query('SELECT * FROM usuarios WHERE email = $1 AND senha = $2', [email, senha]);  
    return result.rows[0];
  }
}

module.exports = Login;
