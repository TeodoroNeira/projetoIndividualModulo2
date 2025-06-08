document.addEventListener('DOMContentLoaded', async () => {
  const errorDiv = document.getElementById('errorDiv');
  const tarefaid = document.getElementById('tarefaid').value;
  const usuarioid = document.getElementById('userId').value; 
  const selectMateria = document.getElementById('materiaid');

  let cursoid;
  try {
    const resUsuario = await fetch(`/api/usuarios/consultarPorId?usuarioid=${usuarioid}`);
    const usuario = await resUsuario.json();
    cursoid = usuario.cursoid;
  } catch {
    errorDiv.textContent = 'Erro ao carregar dados do usuário.';
    errorDiv.style.display = 'block';
    return;
  }

  let materias = [];
  try {
    const resMaterias = await fetch(`/api/materias/consultarPorCurso?cursoid=${cursoid}`);
    materias = await resMaterias.json();
    materias.forEach(materia => {
      const opt = document.createElement('option');
      opt.value = materia.materiaid;
      opt.textContent = materia.nomemateria;
      selectMateria.appendChild(opt);
    });
  } catch (err) {
    errorDiv.textContent = 'Erro ao carregar matérias.';
    errorDiv.style.display = 'block';
    return;
  }


  try {
    const res = await fetch(`/api/tarefas/consultarPorId?tarefaid=${tarefaid}`);
    if (!res.ok) throw new Error();
    const tarefa = await res.json();

    document.getElementById('nometarefa').value = tarefa.nometarefa;
    document.getElementById('descricaotarefa').value = tarefa.descricaotarefa;
    document.getElementById('materiaid').value = tarefa.materiaid;
    document.getElementById('datainicio').value = tarefa.datainicio.split('T')[0];
    document.getElementById('datafim').value = tarefa.datafim.split('T')[0];
  } catch (err) {
    errorDiv.textContent = 'Erro ao carregar os dados da tarefa.';
    errorDiv.style.display = 'block';
    return;
  }

  document.getElementById('editarTaskForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    errorDiv.style.display = 'none';

    const nometarefa = document.getElementById('nometarefa').value;
    const descricaotarefa = document.getElementById('descricaotarefa').value;
    const materiaid = Number(document.getElementById('materiaid').value);
    const datainicio = document.getElementById('datainicio').value;
    const datafim = document.getElementById('datafim').value;

    if (!nometarefa || !descricaotarefa || !materiaid || !datainicio || !datafim) {
      errorDiv.textContent = 'Preencha todos os campos!';
      errorDiv.style.display = 'block';
      return;
    }

    try {
      const resp = await fetch(`/api/tarefas/${tarefaid}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tarefaid,
          nometarefa,
          descricaotarefa,
          status: 'pendente',
          datainicio,
          datafim,
          materiaid
        })
      });
      const data = await resp.json();
      if (resp.ok) {
        window.location.href = '/home';
      } else {
        errorDiv.textContent = data.message || JSON.stringify(data) || 'Erro ao atualizar tarefa.';
        errorDiv.style.display = 'block';
      }
    } catch (err) {
      errorDiv.textContent = 'Erro ao conectar ao servidor.';
      errorDiv.style.display = 'block';
    }
  });

  document.getElementById('cancelarBtn').onclick = () => {
    window.location.href = '/home';
  };
});