const usuarioid = document.getElementById('userId').value;

document.addEventListener('DOMContentLoaded', async () => {
    const calendarDiv = document.getElementById('calendar');
    let hoje = new Date();
    let ano = hoje.getFullYear();
    let mes = hoje.getMonth();
    let tarefas = [];

    // Busca as tarefas apenas uma vez
    async function carregarTarefas() {
        const res = await fetch(`/api/tarefas/consultarPorUsuario?usuarioid=${usuarioid}`);
        tarefas = await res.json();
    }

    function renderCalendar() {
        const primeiroDia = new Date(ano, mes, 1);
        const ultimoDia = new Date(ano, mes + 1, 0);

        let html = `
  <div class="calendar-header">
    <button id="prev-month">&lt;</button>
    <span>${primeiroDia.toLocaleString('pt-BR', { month: 'long' })} de ${ano}</span>
    <button id="next-month">&gt;</button>
  </div>`;
        html += `<div class="calendar-grid">`;

        // Cabeçalho dos dias da semana
        const diasSemana = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
        diasSemana.forEach(dia => {
            html += `<div class="calendar-weekday">${dia}</div>`;
        });

        // Espaços vazios antes do primeiro dia
        for (let i = 0; i < primeiroDia.getDay(); i++) {
            html += `<div class="calendar-day empty"></div>`;
        }

        // Dias do mês
        for (let d = 1; d <= ultimoDia.getDate(); d++) {
            const dataAtual = new Date(ano, mes, d);

            // Filtra tarefas do dia (considerando o período da tarefa)
            const tarefasDoDia = tarefas.filter(t => {
                const inicio = new Date(t.datainicio);
                const fim = new Date(t.datafim);
                return dataAtual >= inicio && dataAtual <= fim;
            });

            html += `<div class="calendar-day${tarefasDoDia.length ? ' has-task' : ''}">
                <span class="day-number">${d}</span>
                <div class="tasks-list">
                    ${tarefasDoDia.map(t => `<div class="task-item">${t.nometarefa}</div>`).join('')}
                </div>
            </div>`;
        }

        html += `</div>`;
        calendarDiv.innerHTML = html;

        // Adiciona eventos aos botões
        document.getElementById('prev-month').onclick = () => {
            mes--;
            if (mes < 0) {
                mes = 11;
                ano--;
            }
            renderCalendar();
        };
        document.getElementById('next-month').onclick = () => {
            mes++;
            if (mes > 11) {
                mes = 0;
                ano++;
            }
            renderCalendar();
        };
    }

    await carregarTarefas();
    renderCalendar();
});