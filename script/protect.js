// Bloquear botão direito
document.addEventListener("contextmenu", e => e.preventDefault());

// Lista de combinações proibidas
const blockedCombos = [
    { ctrl: true, shift: true, key: "I" },
    { ctrl: true, shift: true, key: "J" },
    { ctrl: true, shift: true, key: "C" },
    { ctrl: true, key: "U" },
    { ctrl: true, key: "S" },
    { ctrl: true, key: "P" }
];

// Função para checar combinações
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

// Bloquear eventos-chave
["keydown", "keypress", "keyup"].forEach(evt => {
    document.addEventListener(evt, function(e) {
        if (isBlocked(e)) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    });
});

// Função para fechar / neutralizar a página
function matarPagina() {
    window.close(); // tentativa 1
    window.location.href = "about:blank"; // tentativa 2
    document.body.innerHTML = ""; // fallback
}

// Detecta DevTools pela diferença de tamanho da janela
function detectarDevToolsLayout() {
    const limite = 150;
    if (
        window.outerWidth - window.innerWidth > limite ||
        window.outerHeight - window.innerHeight > limite
    ) {
        matarPagina();
    }
}

// Método **imediato** — detecta DevTools aberto ANTES do carregamento
(function detectarDevToolsInit() {
    const limite = 150;

    if (
        window.outerWidth - window.innerWidth > limite ||
        window.outerHeight - window.innerHeight > limite
    ) {
        matarPagina();
    }
})();

// Verifica continuamente (caso abra depois)
setInterval(detectarDevToolsLayout, 200);
