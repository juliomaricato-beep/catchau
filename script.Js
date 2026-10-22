// Base de dados simulada para centralizar o conteúdo do estudante
const cronogramaEstudos = {
    segunda: {
        titulo: "Segunda-feira",
        sugestao: "Hoje o foco é Matemática Estrutural. Estude Geometria Plana e faça os exercícios conceituais.",
        explicacao: "Lembre-se: A área do triângulo é sempre (Base × Altura) / 2. Não confunda com a fórmula do retângulo!",
        metas: ["Ler teoria de Geometria", "Resolver 5 exercícios técnicos", "Revisar erros cometidos"]
    },
    terca: {
        titulo: "Terça-feira",
        sugestao: "Dia de Redação e Linguagens. Escreva uma introdução focada no tema proposto.",
        explicacao: "Uma boa introdução precisa de: Contextualização histórica/cultural + Tese clara + Apresentação dos dois argumentos.",
        metas: ["Analisar 1 redação nota 1000", "Escrever rascunho da introdução", "Listar 3 alusões coringas"]
    },
    quarta: {
        titulo: "Quarta-feira",
        sugestao: "Foco total em Física: Mecânica e Cinemática MUV.",
        explicacao: "No MUV a aceleração é constante. Use a fórmula do 'Sorvetão' (S = S0 + V0t + at²/2) quando o tempo estiver envolvido.",
        metas: ["Assistir ao vídeo resumo integrado", "Resolver 3 problemas de queda livre"]
    },
    quarta: {
        titulo: "Quarta-feira",
        sugestao: "Foco total em Física: Mecânica e Cinemática MUV.",
        explicacao: "No MUV a aceleração é constante. Use a fórmula do 'Sorvetão' (S = S0 + V0t + at²/2) quando o tempo estiver envolvido.",
        metas: ["Assistir ao vídeo resumo", "Resolver 3 problemas de queda livre"]
    },
    quinta: {
        titulo: "Quinta-feira",
        sugestao: "Estudos de História Geral: A Revolução Industrial e seus impactos sociais.",
        explicacao: "Foque na transição do trabalho artesanal para o manufatureiro e o consequente êxodo rural da população.",
        metas: ["Fazer mapa mental de História", "Ler resumo do capítulo 4"]
    },
    sexta: {
        titulo: "Sexta-feira",
        sugestao: "Revisão Geral Semanal e fechamento de pendências.",
        explicacao: "A revisão espaçada impede que você caia na curva do esquecimento. Olhe seus mapas mentais da semana.",
        metas: ["Refazer exercícios errados", "Organizar metas da próxima semana"]
    }
};

// Seleção de Elementos da Tela
const dayItems = document.querySelectorAll('.day-item');
const dayTitle = document.getElementById('current-day-title');
const studySuggestion = document.getElementById('study-suggestion');
const explanationBox = document.getElementById('explanation-box');
const explanationText = document.getElementById('explanation-text');
const taskList = document.getElementById('task-list');
const progressFill = document.getElementById('progress-fill');

// Função para renderizar o dia selecionado
function carregarDia(diaKey) {
    const dados = cronogramaEstudos[diaKey];
    
    // Atualiza Textos
    dayTitle.textContent = dados.titulo;
    studySuggestion.textContent = dados.sugestao;
    
    if(dados.explicacao) {
        explanationBox.classList.remove('hidden');
        explanationText.textContent = dados.explicacao;
    } else {
        explanationBox.classList.add('hidden');
    }

    // Atualiza Lista de Metas (Checklist)
    taskList.innerHTML = '';
    dados.metas.forEach((meta, index) => {
        const li = document.createElement('li');
        li.className = 'task-item';
        li.innerHTML = `
            <input type="checkbox" id="task-${index}">
            <label for="task-${index}">${meta}</label>
        `;
        
        // Evento para atualizar progresso ao clicar
        li.querySelector('input').addEventListener('change', atualizarProgresso);
        taskList.appendChild(li);
    });

    atualizarProgresso();
}

// Função para calcular e exibir a barra de progresso
function atualizarProgresso() {
    const checkboxes = document.querySelectorAll('.task-list input[type="checkbox"]');
    if(checkboxes.length === 0) {
        progressFill.style.width = '0%';
        return;
    }

    const marcados = Array.from(checkboxes).filter(i => i.checked).length;
    const porcentagem = (marcados / checkboxes.length) * 100;
    
    progressFill.style.width = `${porcentagem}%`;

    // Aplica estilo visual de riscado no texto concluído
    checkboxes.forEach(box => {
        if(box.checked) {
            box.parentElement.classList.add('completed');
        } else {
            box.parentElement.classList.remove('completed');
        }
    });
}

// Evento de clique para alternar entre os dias da semana
dayItems.forEach(item => {
    item.addEventListener('click', () => {
        document.querySelector('.day-item.active').classList.remove('active');
        item.classList.add('active');
        carregarDia(item.getAttribute('data-day'));
    });
});

// Inicializar o App com o primeiro dia (Segunda)
carregarDia('segunda');
