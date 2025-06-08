document.querySelector('form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.querySelector('[name="email"]').value;
    const senha = document.querySelector('[name="senha"]').value;
    const errorDiv = document.getElementById('login-error');
    errorDiv.textContent = ""; // Limpa erro anterior

    fetch('/api/login', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, senha})
    })
    .then(async response => {
        if (!response.ok) {
            try {
                const data = await response.json();
                throw new Error(data.error || data.message || 'Erro desconhecido');
            } catch {
                throw new Error('Erro de autenticação');
            }
        }
        return response.json();
    })
    .then(data => {
        window.location.href = '/home';
    })
    .catch(err => {
        errorDiv.textContent = err.message || 'Erro ao fazer login';
    });
});