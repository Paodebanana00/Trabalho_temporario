/**
 * SCRIPT ANTI-DEVTOOLS EXTENDED (VERSÃO AGRESSIVA)
 * Apenas para fins de estudo ou zoeira controlada.
 */

// 1. Bloqueia o clique com o botão direito do mouse
document.addEventListener("contextmenu", e => e.preventDefault());

// 2. Lista de atalhos de inspeção e salvamento totalmente bloqueados
const blockedCombos = [
    { ctrl: true, shift: true, key: "I" }, // Inspecionar (Chrome/Edge)
    { ctrl: true, shift: true, key: "J" }, // Console
    { ctrl: true, shift: true, key: "C" }, // Selecionar elemento
    { ctrl: true, key: "U" },             // Código-fonte da página
    { ctrl: true, key: "S" },             // Salvar a página no PC
    { ctrl: true, key: "P" }              // Imprimir a página (gerar PDF do layout)
];

function isBlocked(e) {
    return (
        e.key === "F12" ||
        blockedCombos.some(c =>
            (!!c.ctrl === e.ctrlKey) &&
            (!!c.shift === e.shiftKey) &&
            (c.key.toLowerCase() === e.key.toLowerCase())
        )
    );
}

// Bloqueia os eventos de teclado instantaneamente
["keydown", "keypress", "keyup"].forEach(evt => {
    document.addEventListener(evt, function(e) {
        if (isBlocked(e)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
});

// 3. Destruição total da sessão (O Ataque)
function quebrarNavegador() {
    // Tenta fechar a aba
    window.close(); 
    // Redireciona para o nada
    window.location.href = "about:blank"; 
    // Limpa a tela se o redirecionamento demorar
    document.body.innerHTML = "<h1 style='color:white; text-align:center; margin-top:20vh;'>Acesso Bloqueado.</h1>"; 
    
    // Força o congelamento da aba criando um loop infinito de processamento
    setTimeout(() => {
        while (true) {
            console.log("Crash!");
        }
    }, 50);
}

// 4. O Coração da Maldade: Loop de Debugger e Verificação de tamanho
// Se o DevTools abrir, o 'debugger' congela a aba de inspeção na hora
const antiDevTools = () => {
    const limite = 160;
    
    // Testa se o console foi aberto medindo o tamanho útil da tela
    if (
        window.outerWidth - window.innerWidth > limite ||
        window.outerHeight - window.innerHeight > limite
    ) {
        quebrarNavegador();
    }
    
    // Executa o debugger. Se o console estiver aberto, ele para a execução aqui
    (function () {
        (function a() {
            try {
                (function b(i) {
                    if (("" + i / i).length !== 1 || i % 20 === 0) {
                        (function () { }).constructor("debugger")();
                    } else {
                        (function () { }).constructor("debugger")();
                    }
                    b(++i);
                })(0);
            } catch (e) {
                // Se o cara tentar desativar o debugger na marra, o script detecta e mata a página
                setTimeout(antiDevTools, 50);
            }
        })();
    })();
};

// Inicializa a marcação cerrada
setInterval(antiDevTools, 100);
