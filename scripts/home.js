document.addEventListener('DOMContentLoaded', async () => {
    const usuarioid = document.getElementById('userId').value;
    try {
        const res = await fetch(`/api/usuarios/consultarPorId?usuarioid=${usuarioid}`);
        const usuario = await res.json();
        document.getElementById('welcomeMsg').textContent = `Bem vindo, ${usuario.nomeusuario}!`;
    } catch {
    }

    const tarefasGrid = document.querySelector('.tarefas-grid');
    let tarefas = [];
    try {
        const res = await fetch(`/api/tarefas/consultarPorUsuario?usuarioid=${usuarioid}`);
        tarefas = await res.json();
    } catch (err) {
        tarefasGrid.innerHTML = '<div>Erro ao carregar tarefas.</div>';
        return;
    }

    document.querySelectorAll('.mini-calendar').forEach(div => {
        const inicio = new Date(div.dataset.inicio);
        const fim = new Date(div.dataset.fim);
        if (isNaN(inicio) || isNaN(fim)) {
            div.innerHTML = '<small>Período inválido</small>';
            return;
        }
        const ano = inicio.getFullYear();
        const mes = inicio.getMonth();
        const primeiroDia = new Date(ano, mes, 1);
        const ultimoDia = new Date(ano, mes + 1, 0);
        let html = `<div class="calendar-month">${inicio.toLocaleString('pt-BR', { month: 'long' })} ${ano}</div>`;
        html += `<div class="calendar-row">`;
        for (let d = 1; d <= ultimoDia.getDate(); d++) {
            const dataAtual = new Date(ano, mes, d);
            const isActive = dataAtual >= inicio && dataAtual <= fim;
            html += `<span class="calendar-day${isActive ? ' active' : ''}">${d}</span>`;
        }
        html += `</div>`;
        div.innerHTML = html;
    });

    let modal = document.createElement('div');
    modal.id = 'task-modal';
    modal.style.display = 'none';
    modal.style.position = 'fixed';
    modal.style.left = '0';
    modal.style.top = '0';
    modal.style.width = '100vw';
    modal.style.height = '100vh';
    modal.style.background = 'rgba(0,0,0,0.3)';
    modal.style.zIndex = '1000';
    modal.innerHTML = `
        <div id="task-modal-content" style="
            background: #fff;
            border-radius: 12px;
            max-width: 350px;
            margin: 10vh auto;
            padding: 2rem;
            box-shadow: 0 2px 16px #0002;
            position: relative;
        ">
            <h3 style="margin-top:0;">Opções da Tarefa</h3>
            <button id="btn-atualizar" style="margin-bottom: 1rem; width: 100%;">Atualizar informações</button>
            <button id="btn-concluir" style="background: #FFF537; color: #292A2E; width: 100%;">Concluir tarefa</button>
            <button id="btn-cancelar" style="margin-top: 1.5rem; width: 100%;">Cancelar</button>
        </div>
    `;
    document.body.appendChild(modal);

    function abrirModal(tarefaid) {
        modal.style.display = 'block';
        // Atualizar
        document.getElementById('btn-atualizar').onclick = () => {
            window.location.href = `/editarTarefa?id=${tarefaid}`;
        };
        // Concluir
        document.getElementById('btn-concluir').onclick = async () => {
            if (confirm('Deseja marcar esta tarefa como concluída?')) {
                const res = await fetch(`/api/tarefas/${tarefaid}`, {
                    method: 'DELETE'
                });
                if (res.ok) {
                    window.location.reload();
                } else {
                    alert('Erro ao concluir tarefa.');
                }
            }
            modal.style.display = 'none';
        };
        // Cancelar
        document.getElementById('btn-cancelar').onclick = () => {
            modal.style.display = 'none';
        };
    }


    modal.onclick = (e) => {
        if (e.target === modal) modal.style.display = 'none';
    };


    tarefasGrid.innerHTML = ''; 

    if (tarefas.length === 0) {
        tarefasGrid.innerHTML = `
            <div class="no-tasks-msg">
                Nenhuma tarefa cadastrada ainda. Que tal criar sua primeira tarefa?
            </div>
        `;
    } else {
        tarefas.forEach(tarefa => {
            const card = document.createElement('div');
            card.className = 'card-tarefa';
            card.setAttribute('data-tarefaid', tarefa.tarefaid);
            card.innerHTML = `
                <h3>${tarefa.nometarefa}</h3>
                <p>${tarefa.descricaotarefa}</p>
                <div class="mini-calendar" data-inicio="${tarefa.datainicio}" data-fim="${tarefa.datafim}"></div>
            `;
            card.addEventListener('click', (e) => {
                e.stopPropagation();
                const tarefaid = card.getAttribute('data-tarefaid');
                abrirModal(tarefaid);
            });
            tarefasGrid.appendChild(card);
        });

        // Depois de renderizar todos os cards:
        document.querySelectorAll('.mini-calendar').forEach(div => {
            const inicio = new Date(div.dataset.inicio);
            const fim = new Date(div.dataset.fim);
            if (isNaN(inicio) || isNaN(fim)) {
                div.innerHTML = '<small>Período inválido</small>';
                return;
            }
            const ano = inicio.getFullYear();
            const mes = inicio.getMonth();
            const primeiroDia = new Date(ano, mes, 1);
            const ultimoDia = new Date(ano, mes + 1, 0);
            let html = `<div class="calendar-month">${inicio.toLocaleString('pt-BR', { month: 'long' })} ${ano}</div>`;
            html += `<div class="calendar-row">`;
            for (let d = 1; d <= ultimoDia.getDate(); d++) {
                const dataAtual = new Date(ano, mes, d);
                const isActive = dataAtual >= inicio && dataAtual <= fim;
                html += `<span class="calendar-day${isActive ? ' active' : ''}">${d}</span>`;
            }
            html += `</div>`;
            div.innerHTML = html;
        });
    }
});

function verificarTarefasRestantes() {
    const tarefasGrid = document.querySelector('.tarefas-grid');
    const cards = tarefasGrid.querySelectorAll('.card-tarefa');
    let msg = tarefasGrid.querySelector('.no-tasks-msg');
    if (cards.length === 0) {
        if (!msg) {
            msg = document.createElement('div');
            msg.className = 'no-tasks-msg';
            msg.textContent = 'Nenhuma tarefa cadastrada ainda. Que tal criar sua primeira tarefa?';
            tarefasGrid.appendChild(msg);
        }
    } else if (msg) {
        msg.remove();
    }
}

