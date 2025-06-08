const loginService = require('../services/loginService');

// Exemplo de controller para login
async function login(req, res) {
  const { email, senha } = req.body;
  try {
    if (!email || !senha) {
      return res.status(400).json({ message: 'Entrada inválida!' });
    }
    const loginTentativa = await loginService.login(email, senha);
    if (!loginTentativa.success) {
      return res.status(401).json({ error: 'Usuário ou senha inválidos' });
    }
    req.session.authenticated = true;
    req.session.usuarioid = loginTentativa.user.usuarioid; // Salva na sessão
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = {
  login,
};