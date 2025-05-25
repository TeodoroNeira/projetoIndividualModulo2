const express = require("express");
const router = express.Router();
const path = require('path');

const {login} = require("../controllers/loginController");
const {criarTarefa, consultarTarefas, atualizarTarefa, deletarTarefa} = require('../controllers/tarefaController');
const {criarMateria, consultarMaterias, atualizarMateria, deletarMateria} = require('../controllers/materiaController');
const {criarCurso, consultarCursos, atualizarCurso, deletarCurso} = require('../controllers/cursoController');
const {criarUsuario, consultarUsuarios, atualizarUsuario, deletarUsuario} = require('../controllers/usuarioController');

router.get("/", (req, res) => {
  res.send("Teste da página inicial - Ponderada de computação 1");
});

router.get('/api/login', (req, res) => {
  res.send("Teste login");
});
router.post('/api/login', login); 

router.post('/api/tarefas', criarTarefa);
router.get('/api/tarefas', consultarTarefas);
router.put('/api/tarefas/:id', atualizarTarefa);
router.delete('/api/tarefas/:id', deletarTarefa);

router.get('/api/materias', consultarMaterias);
router.post('/api/materias', criarMateria);
router.put('/api/materias/:id', atualizarMateria);
router.delete('/api/materias/:id', deletarMateria);

router.get('/api/cursos', consultarCursos);
router.post('/api/cursos', criarCurso);
router.put('/api/cursos/:id', atualizarCurso);
router.delete('/api/cursos/:id', deletarCurso);

router.get('/api/usuarios', consultarUsuarios);
router.post('/api/usuarios', criarUsuario);
router.put('/api/usuarios/:id', atualizarUsuario);
router.delete('/api/usuarios/:id', deletarUsuario);


module.exports = router;
