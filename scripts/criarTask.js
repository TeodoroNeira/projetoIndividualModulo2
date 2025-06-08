const userId = document.getElementById('userId').value;

document.addEventListener('DOMContentLoaded', async () => {
  const errorDiv = document.getElementById('errorDiv');
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

  // Cancelar volta para home
  document.getElementById('cancelarBtn').onclick = () => {
    window.location.href = '/home';
  };

  // Submissão do formulário
  document.getElementById('criarTaskForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    errorDiv.style.display = 'none';

    const nometarefa = document.getElementById('nometarefa').value;
    const descricaotarefa = document.getElementById('descricaotarefa').value;
    const materiaid = Number(document.getElementById('materiaid').value);
    const datainicio = document.getElementById('datainicio').value;
    const datafim = document.getElementById('datafim').value;
    const usuarioid = userId; 

    // Validação simples
    if (!nometarefa || !descricaotarefa || !materiaid || !datainicio || !datafim) {
      errorDiv.textContent = 'Preencha todos os campos!';
      errorDiv.style.display = 'block';
      return;
    }


    try {
      const resp = await fetch('/api/tarefas', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nometarefa,
          descricaotarefa,
          status: 'pendente',
          datainicio,
          datafim,
          materiaid,
          usuarioid
        })
      });
      const data = await resp.json();
      if (resp.ok) {
        window.location.href = '/home';
      } else {
        console.error('Erro do backend:', data);
        errorDiv.textContent = data.message || JSON.stringify(data) || 'Erro ao criar tarefa.';
        errorDiv.style.display = 'block';
      }
    } catch (err) {
      errorDiv.textContent = 'Erro ao conectar ao servidor.';
      errorDiv.style.display = 'block';
    }
  });

  document.getElementById('datainicio').addEventListener('change', updateCalendarMock);
  document.getElementById('datafim').addEventListener('change', updateCalendarMock);

  function updateCalendarMock() {
    const inicio = document.getElementById('datainicio').value;
    const fim = document.getElementById('datafim').value;
    const calendarDiv = document.querySelector('.calendar-mock');
    if (inicio && fim) {
      calendarDiv.textContent = `De ${inicio.split('-').reverse().join('/')} até ${fim.split('-').reverse().join('/')}`;
    } else {
      calendarDiv.textContent = '(Selecione as datas acima)';
    }
  }

  // Inicializa o calendário flatpickr
  flatpickr("#calendario", {
    mode: "range",
    dateFormat: "Y-m-d",
    static: true, // faz o calendário aparecer dentro do container do input
    onChange: function(selectedDates, dateStr, instance) {
      if (selectedDates.length === 2) {
        document.getElementById('datainicio').value = selectedDates[0].toISOString().slice(0,10);
        document.getElementById('datafim').value = selectedDates[1].toISOString().slice(0,10);
      }
    }
  });
});
