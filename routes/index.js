const express = require("express");
const router = express.Router();

const { login } = require("../controllers/loginController");
const { criarTarefa, consultarTarefas, atualizarTarefa, deletarTarefa, consultarTarefasPorUsuario, consultarTarefaPorId } = require('../controllers/tarefaController');
const { criarMateria, consultarMaterias, atualizarMateria, deletarMateria, consultarMateriasPorCurso } = require('../controllers/materiaController');
const { criarCurso, consultarCursos, atualizarCurso, deletarCurso } = require('../controllers/cursoController');
const { criarUsuario, consultarUsuarios, atualizarUsuario, deletarUsuario, consultarUsuarioPorId } = require('../controllers/usuarioController');

function requireAuth(req, res, next) {
  if (req.session && req.session.authenticated) {
    return next();
  }
  // Se for uma requisição de API, retorna JSON
  if (req.path.startsWith('/api/')) {
    return res.status(401).json({ error: 'Não autenticado' });
  }
  // Senão, redireciona para login normalmente
  res.redirect('/login'); 
}
// Rotas públicas
router.get("/", (req, res) => {
  res.redirect('/login');
});

router.get('/login', (req, res) => {
  res.render('login.ejs');
});
router.get('/api/login', (req, res) => {
  res.send("Teste login");
});
router.post('/api/login', login);

// Rotas protegidas (middleware em cada rota)
router.get('/home', requireAuth, async (req, res) => {
  const usuarioid = req.query.usuarioid || (req.session && req.session.usuarioid);
  if (!usuarioid) return res.redirect('/login');
  res.render('home.ejs', { usuarioid });
});

router.get('/criarTask', requireAuth, (req, res) => {
  res.render('criarTask.ejs' , { usuarioid: req.session.usuarioid });
});

router.get('/criarUsuario', (req, res) => {
  res.render('criarUsuario.ejs');
});

router.get('/calendario', requireAuth, async (req, res) => {
  const usuarioid = req.query.usuarioid || (req.session && req.session.usuarioid);
  if (!usuarioid) {
    return res.redirect('/login', { usuarioid: req.session.usuarioid });
  }
  res.render('calendar.ejs', { usuarioid});
});

router.get('/editarTarefa', requireAuth, async (req, res) => {
  const tarefaid = req.query.id;
  if (!tarefaid) return res.redirect('/home');
  res.render('editarTarefa.ejs', { tarefaid, usuarioid: req.session.usuarioid });
});

router.post('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/login');
  });
});

// Rotas de API 
router.post('/api/tarefas',  criarTarefa);
router.get('/api/tarefas',  consultarTarefas);
router.put('/api/tarefas/:id',  atualizarTarefa);
router.delete('/api/tarefas/:id', deletarTarefa);
router.get('/api/tarefas/consultarPorUsuario', consultarTarefasPorUsuario);
router.get('/api/tarefas/consultarPorId', consultarTarefaPorId);

router.get('/api/materias',  consultarMaterias);
router.post('/api/materias',  criarMateria);
router.put('/api/materias/:id', atualizarMateria);
router.delete('/api/materias/:id',  deletarMateria);
router.get('/api/materias/consultarPorCurso', consultarMateriasPorCurso);

router.get('/api/cursos', consultarCursos);
router.post('/api/cursos', criarCurso);
router.put('/api/cursos/:id', atualizarCurso);
router.delete('/api/cursos/:id',  deletarCurso);

router.get('/api/usuarios', consultarUsuarios);
router.post('/api/usuarios', criarUsuario);
router.put('/api/usuarios/:id', atualizarUsuario);
router.delete('/api/usuarios/:id', deletarUsuario);
router.get('/api/usuarios/consultarPorId', consultarUsuarioPorId); 

module.exports = router;
