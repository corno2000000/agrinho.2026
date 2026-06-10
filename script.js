// ===== DADOS DOS ALIMENTOS (BANCO DE DADOS SIMPLES) =====
// Cada alimento tem: nome, ícone, nível de agrotóxico, calorias e efeito na saúde

const alimentos = [
    {
        nome: "Maçã",
        icone: "🍎",
        agrotoxico: "🔴 Alto",
        calorias: "95 kcal (1 unidade)",
        efeito: "👍 Antioxidante, previne doenças cardíacas. Prefira orgânica!"
    },
    {
        nome: "Alface",
        icone: "🥬",
        agrotoxico: "🟢 Baixo",
        calorias: "15 kcal (5 folhas)",
        efeito: "👍 Rica em fibras, ajuda na digestão. Ótima opção!"
    },
    {
        nome: "Arroz",
        icone: "🍚",
        agrotoxico: "🟡 Médio",
        calorias: "200 kcal (1 concha)",
        efeito: "👍 Fonte de energia. Prefira o integral!"
    },
    {
        nome: "Feijão",
        icone: "🫘",
        agrotoxico: "🟡 Médio",
        calorias: "230 kcal (1 concha)",
        efeito: "👍 Rico em ferro e proteínas. Combate anemia!"
    },
    {
        nome: "Carne",
        icone: "🥩",
        agrotoxico: "🟢 Baixo",
        calorias: "250 kcal (100g)",
        efeito: "⚠️ Rica em proteínas, mas coma com moderação"
    },
    {
        nome: "Leite",
        icone: "🥛",
        agrotoxico: "🟢 Baixo",
        calorias: "120 kcal (1 copo)",
        efeito: "👍 Fonte de cálcio para os ossos. Versão sem lactose disponível"
    }
];

// ===== FUNÇÃO PARA CRIAR OS CARDS DOS ALIMENTOS =====
function criarCardsAlimentos() {
    const grid = document.getElementById('alimentos-grid');
    grid.innerHTML = ''; // Limpa o grid antes de criar
    
    for (let i = 0; i < alimentos.length; i++) {
        const alimento = alimentos[i];
        
        // Cria o card do alimento
        const card = document.createElement('div');
        card.className = 'alimento-card';
        card.setAttribute('data-indice', i);
        
        // Conteúdo do card
        card.innerHTML = `
            <div class="alimento-icone">${alimento.icone}</div>
            <h3>${alimento.nome}</h3>
        `;
        
        // Adiciona evento de clique
        card.addEventListener('click', function() {
            mostrarInformacaoAlimento(i);
        });
        
        grid.appendChild(card);
    }
}

// ===== FUNÇÃO PARA MOSTRAR INFORMAÇÕES DO ALIMENTO CLICADO =====
function mostrarInformacaoAlimento(indice) {
    const alimento = alimentos[indice];
    const infoDiv = document.getElementById('info-alimento');
    
    infoDiv.innerHTML = `
        <div style="font-size: 3rem; margin-bottom: 10px;">${alimento.icone}</div>
        <h3 style="margin-bottom: 15px;">${alimento.nome}</h3>
        <p><strong>🧪 Agrotóxicos:</strong> ${alimento.agrotoxico}</p>
        <p><strong>🔥 Calorias:</strong> ${alimento.calorias}</p>
        <p><strong>❤️ Efeito na saúde:</strong> ${alimento.efeito}</p>
    `;
}

// ===== FUNÇÃO PARA CRIAR A TABELA COMPARATIVA =====
function criarTabela() {
    const corpoTabela = document.getElementById('corpo-tabela');
    corpoTabela.innerHTML = '';
    
    for (let i = 0; i < alimentos.length; i++) {
        const a = alimentos[i];
        const linha = document.createElement('tr');
        
        linha.innerHTML = `
            <td>${a.icone} ${a.nome}</td>
            <td>${a.agrotoxico}</td>
            <td>${a.calorias}</td>
            <td>${a.efeito.substring(0, 50)}...</td>
        `;
        
        corpoTabela.appendChild(linha);
    }
}

// ===== FUNÇÃO PARA ROLAGEM SUAVE AO CLICAR NO MENU =====
function configurarRolagemSuave() {
    const links = document.querySelectorAll('nav a');
    
    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(evento) {
            evento.preventDefault();
            
            const destinoId = this.getAttribute('href');
            const destino = document.querySelector(destinoId);
            
            if (destino) {
                destino.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
}

// ===== FUNÇÃO PARA BOTÃO VOLTAR AO TOPO =====
function configurarBotaoTopo() {
    const btnTopo = document.getElementById('btn-topo');
    
    btnTopo.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Mostra/esconde botão conforme rolagem
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            btnTopo.style.display = 'flex';
        } else {
            btnTopo.style.display = 'none';
        }
    });
    
    btnTopo.style.display = 'none';
}

// ===== FUNÇÕES DE ACESSIBILIDADE =====

// Controle do menu de acessibilidade
let tamanhoFonte = 16;

function configurarAcessibilidade() {
    const btnAcessibilidade = document.getElementById('btn-acessibilidade');
    const menuAcessibilidade = document.getElementById('menu-acessibilidade');
    const aumentarFonte = document.getElementById('aumentar-fonte');
    const diminuirFonte = document.getElementById('diminuir-fonte');
    const altoContraste = document.getElementById('alto-contraste');
    
    // Abrir/fechar menu
    btnAcessibilidade.addEventListener('click', function() {
        menuAcessibilidade.classList.toggle('ativo');
    });
    
    // Fechar menu ao clicar fora
    document.addEventListener('click', function(evento) {
        if (!btnAcessibilidade.contains(evento.target) && !menuAcessibilidade.contains(evento.target)) {
            menuAcessibilidade.classList.remove('ativo');
        }
    });
    
    // Aumentar fonte
    aumentarFonte.addEventListener('click', function() {
        if (tamanhoFonte < 24) {
            tamanhoFonte += 2;
            document.body.style.fontSize = tamanhoFonte + 'px';
        }
    });
    
    // Diminuir fonte
    diminuirFonte.addEventListener('click', function() {
        if (tamanhoFonte > 12) {
            tamanhoFonte -= 2;
            document.body.style.fontSize = tamanhoFonte + 'px';
        }
    });
    
    // Alto contraste
    let contrasteAtivo = false;
    altoContraste.addEventListener('click', function() {
        if (!contrasteAtivo) {
            document.body.classList.add('alto-contraste');
            contrasteAtivo = true;
            altoContraste.textContent = '🌕 Desativar contraste';
        } else {
            document.body.classList.remove('alto-contraste');
            contrasteAtivo = false;
            altoContraste.textContent = '🌓 Alto contraste';
        }
    });
}

// ===== INICIALIZAÇÃO DO SITE =====
// Quando a página carregar, executa todas as funções
document.addEventListener('DOMContentLoaded', function() {
    criarCardsAlimentos();      // Cria os cards do guia
    criarTabela();              // Cria a tabela comparativa
    configurarRolagemSuave();   // Ativa rolagem suave do menu
    configurarBotaoTopo();      // Ativa botão voltar ao topo
    configurarAcessibilidade(); // Ativa recursos de acessibilidade
});
