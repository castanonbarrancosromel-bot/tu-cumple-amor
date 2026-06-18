// ==========================================
// POZO DE LOS DESEOS - Wishing Well Logic
// Connected to Formspree: https://formspree.io/f/xnjyyygg
// ==========================================
document.addEventListener("DOMContentLoaded", () => {

    let deseosSentCount = 0;

    const deseoForm       = document.getElementById("deseos-form");
    const deseoSuccess    = document.getElementById("deseos-success");
    const deseoCharNum    = document.getElementById("deseo-char-num");
    const deseoTexto      = document.getElementById("deseo-texto");
    const deseoCounterNum = document.getElementById("deseos-counter-num");
    const btnOtroDeseo    = document.getElementById("btn-otro-deseo");
    const btnEnviarDeseo  = document.getElementById("btn-enviar-deseo");
    const pozoCoinsCont   = document.getElementById("pozo-coins-container");

    // ---- Character counter for wish textarea ----
    if (deseoTexto && deseoCharNum) {
        deseoTexto.addEventListener("input", () => {
            const len = deseoTexto.value.length;
            deseoCharNum.textContent = len;
            // Color shift when near limit
            deseoCharNum.style.color = len > 440 ? "#f5c842" : "";
        });
    }

    // ---- Drop a coin into the well ----
    function dropCoin() {
        if (!pozoCoinsCont) return;
        const coin = document.createElement("div");
        coin.className = "pozo-coin";
        coin.textContent = "\uD83E\uDE99"; // coin emoji
        // Random horizontal position within the well
        coin.style.left = (18 + Math.random() * 64) + "%";
        pozoCoinsCont.appendChild(coin);
        // Remove element after animation
        setTimeout(() => {
            if (coin.parentNode) coin.parentNode.removeChild(coin);
        }, 950);
    }

    // ---- Formspree AJAX submission ----
    if (deseoForm) {
        deseoForm.addEventListener("submit", async (e) => {
            e.preventDefault();

            // Button loading state
            if (btnEnviarDeseo) {
                btnEnviarDeseo.classList.add("loading");
                const btnSpan = btnEnviarDeseo.querySelector("span");
                if (btnSpan) btnSpan.textContent = "Enviando al universo... \u2728";
            }

            // Animate coins while sending
            const coinInterval = setInterval(dropCoin, 200);

            try {
                const response = await fetch(deseoForm.action, {
                    method: "POST",
                    body: new FormData(deseoForm),
                    headers: { "Accept": "application/json" }
                });

                clearInterval(coinInterval);

                if (response.ok) {
                    // ---- SUCCESS ----
                    deseoForm.classList.add("hidden");
                    if (deseoSuccess) {
                        deseoSuccess.classList.remove("hidden");
                    }

                    // Increment session counter
                    deseosSentCount++;
                    if (deseoCounterNum) {
                        deseoCounterNum.textContent = deseosSentCount;
                    }

                    // Burst of coins into the well
                    for (let i = 0; i < 10; i++) {
                        setTimeout(dropCoin, i * 90);
                    }

                } else {
                    // ---- SERVER ERROR ----
                    clearInterval(coinInterval);
                    resetButtonText("Error al enviar. Intenta de nuevo.");
                }

            } catch (err) {
                clearInterval(coinInterval);
                resetButtonText("Sin conexion. Intenta de nuevo.");
            }
        });
    }

    // Helper to reset button text after error
    function resetButtonText(errorMsg) {
        if (!btnEnviarDeseo) return;
        btnEnviarDeseo.classList.remove("loading");
        const btnSpan = btnEnviarDeseo.querySelector("span");
        if (btnSpan) {
            btnSpan.textContent = errorMsg;
            setTimeout(() => {
                btnSpan.textContent = "Lanzar mi Deseo al Pozo";
            }, 3200);
        }
    }

    // ---- "Send another wish" reset ----
    if (btnOtroDeseo) {
        btnOtroDeseo.addEventListener("click", () => {
            if (deseoSuccess) deseoSuccess.classList.add("hidden");
            if (deseoForm) {
                deseoForm.classList.remove("hidden");
                deseoForm.reset();
                if (deseoCharNum) deseoCharNum.textContent = "0";
            }
            if (btnEnviarDeseo) {
                btnEnviarDeseo.classList.remove("loading");
                const btnSpan = btnEnviarDeseo.querySelector("span");
                if (btnSpan) btnSpan.textContent = "Lanzar mi Deseo al Pozo";
            }
        });
    }

    // ---- Coin drop on tab click (preview animation) ----
    const navBtnDeseos = document.getElementById("nav-btn-deseos");
    if (navBtnDeseos) {
        navBtnDeseos.addEventListener("click", () => {
            // Drop a few coins after a short delay when the tab opens
            setTimeout(() => {
                for (let i = 0; i < 3; i++) {
                    setTimeout(dropCoin, i * 220);
                }
            }, 400);
        });
    }

});
