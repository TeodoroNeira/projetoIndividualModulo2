const tarefaService = require('../services/tarefaService');

const criarTarefa = async (req, res) => {
    try {
      const { nometarefa, descricaotarefa, status, datainicio, datafim, materiaid, usuarioid } = req.body;
      if (!nometarefa || !descricaotarefa || !status || !datainicio || !datafim || !materiaid || !usuarioid) {
          return res.status(400).json({message: 'Entrada inválida!'});
      }
      const tarefaCriada = await tarefaService.criarTarefa(
        nometarefa, descricaotarefa, status, datainicio, datafim, materiaid, usuarioid
      );
      res.status(201).json(tarefaCriada);
    } catch (error) {
      res.status(500).json({error: error.message});
    }
}
const consultarTarefas = async (req, res) => {
    try {
        const tarefas = await tarefaService.consultarTarefas();
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
const atualizarTarefa = async (req, res) => {
    try {
        const {tarefaid, nometarefa, descricaotarefa, status, datainicio, datafim, materiaid} = req.body;
        if (!tarefaid || !nometarefa || !descricaotarefa || !status || !datainicio || !datafim || !materiaid) {
            return res.status(400).json({message: 'Entrada inválida!'});
        }
        const tarefaAtualizada = await tarefaService.atualizarTarefa(tarefaid, nometarefa, descricaotarefa, status, datainicio, datafim, materiaid);
        res.status(200).json(tarefaAtualizada);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}
const deletarTarefa = async (req, res) => {
    try {
        const tarefaid = req.params.id || req.body.tarefaid;
        if (!tarefaid) {
            return res.status(400).json({message: 'Entrada inválida!'});
        }
        const tarefaDeletada = await tarefaService.deletarTarefa(tarefaid);
        res.status(200).json(tarefaDeletada);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const consultarTarefasPorUsuario = async (req, res) => {
    try {
        const usuariod = req.query.usuarioid;
        if (!usuariod) {
            return res.status(400).json({message: 'Usuário não informado!'});
        }
        const tarefas = await tarefaService.consultarTarefasPorUsuario(usuariod);
        res.status(200).json(tarefas);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

const consultarTarefaPorId = async (req, res) => {
    try {
        const tarefaid = req.query.tarefaid;
        if (!tarefaid) {
            return res.status(400).json({message: 'Tarefa não informada!'});
        }
        const tarefa = await tarefaService.consultarTarefaPorId(tarefaid);
        if (!tarefa) {
            return res.status(404).json({message: 'Tarefa não encontrada!'});
        }
        res.status(200).json(tarefa);
    } catch (error) {
        res.status(500).json({error: error.message});
    }
}

module.exports = {
    criarTarefa,
    consultarTarefas,
    atualizarTarefa,
    deletarTarefa,
    consultarTarefasPorUsuario,
    consultarTarefaPorId
}
