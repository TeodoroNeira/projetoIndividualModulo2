document.addEventListener('DOMContentLoaded', async () => {
  const cursoSelect = document.getElementById('cursoid');
  const errorDiv = document.getElementById('errorDiv');

  // Carregar cursos do backend
  try {
    const resp = await fetch('/api/cursos');
    const cursos = await resp.json();
    cursos.forEach(curso => {
      const opt = document.createElement('option');
      opt.value = curso.cursoid;
      opt.textContent = curso.nomecurso;
      cursoSelect.appendChild(opt);
    });
  } catch (err) {
    errorDiv.textContent = 'Erro ao carregar cursos.';
    errorDiv.style.display = 'block';
  }

  // Cancelar volta para login
  document.getElementById('cancelarBtn').onclick = () => {
    window.location.href = '/login';
  };

  // Submissão do formulário
  document.getElementById('criarUsuarioForm').addEventListener('submit', async function(e) {
    e.preventDefault();
    errorDiv.style.display = 'none';

    const nomeusuario = document.getElementById('nomeusuario').value;
    const email = document.getElementById('email').value;
    const senha = document.getElementById('senha').value;
    const nascimentousuario = document.getElementById('nascimentousuario').value;
    const cursoid = Number(document.getElementById('cursoid').value);

    if (!nomeusuario || !email || !senha || !nascimentousuario || !cursoid) {
      errorDiv.textContent = 'Preencha todos os campos!';
      errorDiv.style.display = 'block';
      return;
    }

    try {
      const resp = await fetch('/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nomeusuario,
          nascimentousuario,
          cursoid,
          senha,
          email
        })
      });
      const data = await resp.json();
      if (resp.ok) {
        window.location.href = '/login';
      } else {
        errorDiv.textContent = data.message || JSON.stringify(data) || 'Erro ao criar usuário.';
        errorDiv.style.display = 'block';
      }
    } catch (err) {
      errorDiv.textContent = 'Erro ao conectar ao servidor.';
      errorDiv.style.display = 'block';
    }
  });
});