/* ==========================================================================
   INTERACTIVE LOGIC - REGALO DE AMOR PARA ISELA
   ========================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    
    // ==========================================
    // 1. STATE & ELEMENTS SELECTORS
    // ==========================================
    const waxSeal = document.getElementById("envelope-wax-seal");
    const envelope = document.getElementById("love-letter-envelope");
    const btnOpenLetter = document.getElementById("btn-open-letter");
    const landingSection = document.getElementById("landing-section");
    const albumLayout = document.getElementById("album-content-layout");
    const appFooter = document.getElementById("app-footer");
    
    const navItems = document.querySelectorAll(".nav-item");
    const albumSections = document.querySelectorAll(".album-section");
    
    const musicController = document.getElementById("music-controller");
    const musicIcon = document.getElementById("music-icon");
    const musicTooltip = document.querySelector(".music-tooltip");
    
    let envelopeOpened = false;

    // ==========================================
    // 1.5. LOVE RELATIONSHIP COUNTER
    // ==========================================
    // Define tu fecha de aniversario aquí (Formato: AAAA-MM-DDTHH:MM:SS)
    // Por defecto es el 12 de Octubre de 2024. ¡Puedes cambiarla libremente!
    const startDate = new Date("2024-11-21T00:00:00");

    function updateLoveCounter() {
        const now = new Date();
        const diffMs = now - startDate;

        if (diffMs < 0) return; // Si la fecha es en el futuro

        // Cálculos aproximados de año, mes y día de calendario
        let years = now.getFullYear() - startDate.getFullYear();
        let months = now.getMonth() - startDate.getMonth();
        let days = now.getDate() - startDate.getDate();

        if (days < 0) {
            months -= 1;
            const prevMonth = new Date(now.getFullYear(), now.getMonth(), 0);
            days += prevMonth.getDate();
        }

        if (months < 0) {
            years -= 1;
            months += 12;
        }

        // Cálculo exacto de horas, minutos y segundos transcurridos
        const totalSeconds = Math.floor(diffMs / 1000);
        const seconds = totalSeconds % 60;
        const minutes = Math.floor(totalSeconds / 60) % 60;
        const hours = Math.floor(totalSeconds / 3600) % 24;

        // Inyección en el DOM
        const yearsEl = document.getElementById("counter-years");
        const monthsEl = document.getElementById("counter-months");
        const daysEl = document.getElementById("counter-days");
        const hoursEl = document.getElementById("counter-hours");
        const minutesEl = document.getElementById("counter-minutes");
        const secondsEl = document.getElementById("counter-seconds");

        if (yearsEl) yearsEl.innerText = years;
        if (monthsEl) monthsEl.innerText = months;
        if (daysEl) daysEl.innerText = days;
        if (hoursEl) hoursEl.innerText = hours;
        if (minutesEl) minutesEl.innerText = minutes;
        if (secondsEl) secondsEl.innerText = seconds;
    }

    // Actualizar el contador cada segundo
    setInterval(updateLoveCounter, 1000);
    updateLoveCounter();

    // ==========================================
    // 2. ENVELOPE OPENING MECHANICS
    // ==========================================
    function openEnvelope() {
        if (envelopeOpened) return;
        envelopeOpened = true;
        
        // Add opened class to start the envelope CSS transitions
        envelope.classList.add("open");
        
        // Play click synth cue to reward interaction
        playInteractiveClickCue();
        
        // After animations complete, fade out landing and show content
        setTimeout(() => {
            landingSection.style.transition = "opacity 0.8s ease, transform 0.8s ease";
            landingSection.style.opacity = "0";
            landingSection.style.transform = "scale(0.95) translateY(-30px)";
            
            setTimeout(() => {
                landingSection.classList.add("hidden");
                albumLayout.classList.remove("hidden");
                appFooter.classList.remove("hidden");
                
                // Initialize canvas resize now that layout is visible
                resizeCanvas();
                
                // Auto start romantic music synthesizer after a user action!
                if (!musicPlaying) {
                    toggleRomanticMusic();
                }
            }, 800);
        }, 1200);
    }
    
    if (waxSeal) waxSeal.addEventListener("click", openEnvelope);
    if (btnOpenLetter) btnOpenLetter.addEventListener("click", openEnvelope);

    // ==========================================
    // 3. PAGE SWITCHING / NAVIGATION
    // ==========================================
    navItems.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");
            
            // Play a soft bell navigation chime
            playNavigationChime();
            
            // Remove active class from all buttons
            navItems.forEach(nav => nav.classList.remove("active-nav"));
            // Add to active button
            button.classList.add("active-nav");
            
            // Switch sections with smooth transitions
            albumSections.forEach(section => {
                section.classList.remove("active-album-section");
                if (section.id === targetId) {
                    section.classList.add("active-album-section");
                    // Trigger a custom visual burst of particles on switch
                    triggerBurst(window.innerWidth / 2, window.innerHeight / 2, 40);
                }
            });
        });
    });

    // ==========================================
    // 4. SECRET MESSAGES DISCOVERY
    // ==========================================
    const secrets = [
        { btn: "btn-secret-pareja", msg: "secret-msg-pareja" },
        { btn: "btn-secret-mariposas", msg: "secret-msg-mariposas" },
        { btn: "btn-secret-corazon", msg: "secret-msg-corazon" },
        { btn: "btn-secret-belleza2", msg: "secret-msg-belleza2" },
        { btn: "btn-secret-belleza3", msg: "secret-msg-belleza3" },
        { btn: "btn-secret-princesa", msg: "secret-msg-princesa" },
        { btn: "btn-secret-corazon2", msg: "secret-msg-corazon2" },
        { btn: "btn-secret-gatita", msg: "secret-msg-gatita" },
        { btn: "btn-secret-monita", msg: "secret-msg-monita" }
    ];
    
    secrets.forEach(secret => {
        const button = document.getElementById(secret.btn);
        const message = document.getElementById(secret.msg);
        
        if (button && message) {
            button.addEventListener("click", () => {
                const isHidden = message.classList.contains("hidden-message");
                playSecretRevealChime();
                
                if (isHidden) {
                    message.classList.remove("hidden-message");
                    message.classList.add("visible-message");
                    // Remove overflow:hidden so long messages don't get clipped
                    message.style.overflow = "visible";
                    button.innerHTML = `<i class="fa-solid fa-envelope"></i> Ocultar Mensaje Secreto`;
                    
                    // Tilt the related photo container (safely, with null check)
                    const grid = button.closest(".album-grid");
                    if (grid) {
                        const photoFrame = grid.querySelector(".photo-frame-container");
                        if (photoFrame) {
                            photoFrame.style.transform = "perspective(1000px) rotateX(10deg) scale(1.03)";
                            setTimeout(() => { photoFrame.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"; }, 1200);
                        }
                    }
                } else {
                    message.classList.add("hidden-message");
                    message.classList.remove("visible-message");
                    message.style.overflow = "hidden";
                    button.innerHTML = `<i class="fa-solid fa-envelope-open-text"></i> Revelar Mensaje Secreto`;
                }
            });
        }
    });

    // ==========================================
    // 5. 3D TILT EFFECT FOR PHOTO FRAMES (VANILLA)
    // ==========================================
    const tiltContainers = document.querySelectorAll("[data-tilt]");
    
    tiltContainers.forEach(container => {
        container.addEventListener("mousemove", (e) => {
            const rect = container.getBoundingClientRect();
            const x = e.clientX - rect.left; // x coordinate within element
            const y = e.clientY - rect.top;  // y coordinate within element
            
            // Calculate normalized values (-0.5 to 0.5)
            const xc = (x / rect.width) - 0.5;
            const yc = (y / rect.height) - 0.5;
            
            // Multiply for tilt strength (e.g. 15 degrees max)
            const rotateX = -yc * 20;
            const rotateY = xc * 20;
            
            container.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            
            // Emit rare star sparkles on frame hover
            if (Math.random() < 0.25) {
                spawnSparkle(e.clientX, e.clientY);
            }
        });
        
        container.addEventListener("mouseleave", () => {
            container.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
            container.style.transition = "transform 0.5s ease";
        });
        
        container.addEventListener("mouseenter", () => {
            container.style.transition = "none";
        });
    });

    // ==========================================
    // 6. CANVAS PARTICLE SYSTEM (HEARTS & BUTTERFLIES)
    // ==========================================
    const canvas = document.getElementById("particle-canvas");
    const ctx = canvas.getContext("2d");
    
    let canvasWidth = window.innerWidth;
    let canvasHeight = window.innerHeight;
    let particles = [];
    const maxParticles = 65;
    
    function resizeCanvas() {
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        const dpr = window.devicePixelRatio || 1;
        canvas.width = canvasWidth * dpr;
        canvas.height = canvasHeight * dpr;
        ctx.scale(dpr, dpr);
    }
    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor(x, y, isClickBurst = false) {
            this.x = x || Math.random() * canvasWidth;
            this.y = y || canvasHeight + 20;
            
            // Particle type: 0 = heart, 1 = butterfly, 2 = glowing sparkle dust
            this.type = isClickBurst ? (Math.random() < 0.7 ? 0 : 2) : (Math.random() < 0.6 ? 0 : 1);
            
            this.size = Math.random() * 15 + (isClickBurst ? 6 : 8);
            this.speedX = isClickBurst ? (Math.random() - 0.5) * 6 : (Math.random() - 0.5) * 1.5;
            this.speedY = isClickBurst ? -(Math.random() * 5 + 2) : -(Math.random() * 1.2 + 0.5);
            
            // Beautiful romantic spectrum
            const hue = Math.random() < 0.85 ? (Math.random() * 25 + 340) : (Math.random() * 20 + 35); // Deep pinks/reds vs golds
            this.color = `hsla(${hue}, 100%, 70%, ${Math.random() * 0.4 + 0.3})`;
            this.alpha = 1;
            this.decay = isClickBurst ? Math.random() * 0.015 + 0.01 : Math.random() * 0.003 + 0.002;
            
            // Custom sinusoidal swings to simulate wind or wings fluttering
            this.swingSpeed = Math.random() * 0.03 + 0.01;
            this.swingAmount = Math.random() * 1.5 + 0.5;
            this.swingAngle = Math.random() * Math.PI;
        }

        update() {
            this.swingAngle += this.swingSpeed;
            this.x += this.speedX + Math.sin(this.swingAngle) * this.swingAmount;
            this.y += this.speedY;
            this.alpha -= this.decay;
        }

        draw() {
            ctx.save();
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.shadowBlur = this.size * 0.6;
            ctx.shadowColor = this.color;
            
            if (this.type === 0) {
                // Draw a beautiful romantic Heart
                ctx.beginPath();
                const d = this.size;
                const x = this.x;
                const y = this.y;
                ctx.moveTo(x, y + d / 4);
                ctx.bezierCurveTo(x, y - d / 2, x - d, y - d / 2, x - d, y + d / 4);
                ctx.bezierCurveTo(x - d, y + d * 0.8, x, y + d * 1.25, x, y + d * 1.4);
                ctx.bezierCurveTo(x, y + d * 1.25, x + d, y + d * 0.8, x + d, y + d / 4);
                ctx.bezierCurveTo(x + d, y - d / 2, x, y - d / 2, x, y + d / 4);
                ctx.fill();
            } else if (this.type === 1) {
                // Draw an elegant minimalist Butterfly
                ctx.translate(this.x, this.y);
                const wingS = Math.abs(Math.sin(this.swingAngle * 2.5)) * 0.9 + 0.1; // Flapping effect
                ctx.scale(wingS, 1);
                
                // Left wings
                ctx.beginPath();
                ctx.ellipse(-this.size/2, -this.size/3, this.size * 0.6, this.size * 0.5, -Math.PI/6, 0, Math.PI * 2);
                ctx.ellipse(-this.size/2, this.size/3, this.size * 0.45, this.size * 0.35, Math.PI/6, 0, Math.PI * 2);
                ctx.fill();
                
                // Right wings
                ctx.beginPath();
                ctx.ellipse(this.size/2, -this.size/3, this.size * 0.6, this.size * 0.5, Math.PI/6, 0, Math.PI * 2);
                ctx.ellipse(this.size/2, this.size/3, this.size * 0.45, this.size * 0.35, -Math.PI/6, 0, Math.PI * 2);
                ctx.fill();
                
                // Center body
                ctx.fillStyle = "#fff";
                ctx.beginPath();
                ctx.ellipse(0, 0, this.size * 0.1, this.size * 0.6, 0, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Sparkling gold dust / star particle
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size * 0.25, 0, Math.PI * 2);
                ctx.fillStyle = "#fff";
                ctx.fill();
            }
            ctx.restore();
        }
    }

    // Main particle generator & animator loop
    function animateParticles() {
        ctx.clearRect(0, 0, canvasWidth, canvasHeight);
        
        // Spawn background particles continuously
        if (particles.length < maxParticles && Math.random() < 0.05) {
            particles.push(new Particle());
        }
        
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw();
            
            if (particles[i].alpha <= 0 || particles[i].y < -20 || particles[i].x < -20 || particles[i].x > canvasWidth + 20) {
                particles.splice(i, 1);
            }
        }
        
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // Trigger explosive visual burst of hearts
    function triggerBurst(x, y, count = 20) {
        for (let i = 0; i < count; i++) {
            particles.push(new Particle(x, y, true));
        }
    }
    
    // Spawn subtle single sparkle (star)
    function spawnSparkle(x, y) {
        const star = new Particle(x, y, true);
        star.type = 2; // Star dust
        star.size = Math.random() * 8 + 4;
        star.speedY = -(Math.random() * 2 + 1);
        particles.push(star);
    }

    // ==========================================
    // 9. LOVE CALENDAR WITH PHOTO MEMORIES
    // ==========================================

    /* --- State --- */
    let calCurrentDate = new Date();
    let calSelectedDateKey = null;  // "YYYY-MM-DD"
    let calPhotoDataURL = null;     // base64 of chosen photo

    /* --- DOM refs --- */
    const calGrid        = document.getElementById("cal-grid");
    const calMonthYear   = document.getElementById("cal-month-year");
    const calPrev        = document.getElementById("cal-prev");
    const calNext        = document.getElementById("cal-next");
    const calMemoriesList = document.getElementById("cal-memories-list");
    const calModalOverlay = document.getElementById("cal-modal-overlay");
    const calModalClose   = document.getElementById("cal-modal-close");
    const calModalTitle   = document.getElementById("cal-modal-title");
    const calModalMemories = document.getElementById("cal-modal-memories");
    const calPhotoInput   = document.getElementById("cal-photo-input");
    const calPhotoDrop    = document.getElementById("cal-photo-drop");
    const calPhotoPreview = document.getElementById("cal-photo-preview");
    const calDescription  = document.getElementById("cal-description");
    const calCharNum      = document.getElementById("cal-char-num");
    const calSaveMemory   = document.getElementById("cal-save-memory");

    /* --- Storage helpers --- */
    const CAL_STORAGE_KEY = "amor_isela_calendar_v1";

    function calLoad() {
        try {
            return JSON.parse(localStorage.getItem(CAL_STORAGE_KEY)) || {};
        } catch (e) { return {}; }
    }

    function calSave(data) {
        localStorage.setItem(CAL_STORAGE_KEY, JSON.stringify(data));
    }

    /* --- Month/year label --- */
    const MONTHS_ES = [
        "Enero","Febrero","Marzo","Abril","Mayo","Junio",
        "Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"
    ];

    function calFormatMonth(date) {
        return `${MONTHS_ES[date.getMonth()]} ${date.getFullYear()}`;
    }

    /* --- Render calendar grid --- */
    function calRender() {
        if (!calGrid) return;

        const data = calLoad();
        const year  = calCurrentDate.getFullYear();
        const month = calCurrentDate.getMonth();
        const today = new Date();

        calMonthYear.textContent = calFormatMonth(calCurrentDate);

        // First weekday of this month (0=Sun)
        const firstDay = new Date(year, month, 1).getDay();
        const daysInMonth = new Date(year, month + 1, 0).getDate();

        calGrid.innerHTML = "";

        // Empty cells before day 1
        for (let e = 0; e < firstDay; e++) {
            const empty = document.createElement("div");
            empty.className = "cal-day empty";
            calGrid.appendChild(empty);
        }

        // Day cells
        for (let d = 1; d <= daysInMonth; d++) {
            const dayEl  = document.createElement("div");
            const dateKey = `${year}-${String(month + 1).padStart(2,"0")}-${String(d).padStart(2,"0")}`;

            dayEl.className = "cal-day";
            dayEl.dataset.dateKey = dateKey;

            const isToday = d === today.getDate() && month === today.getMonth() && year === today.getFullYear();
            if (isToday) dayEl.classList.add("today");

            const memories = data[dateKey] || [];
            if (memories.length > 0) {
                dayEl.classList.add("has-memory");
                // Show thumbnail of first photo (if available)
                const firstWithPhoto = memories.find(m => m.photo);
                if (firstWithPhoto) {
                    const thumb = document.createElement("img");
                    thumb.className = "cal-day-thumb";
                    thumb.src = firstWithPhoto.photo;
                    thumb.alt = "Recuerdo";
                    dayEl.appendChild(thumb);
                }
            }

            const numSpan = document.createElement("span");
            numSpan.className = "cal-day-number";
            numSpan.textContent = d;
            dayEl.appendChild(numSpan);

            dayEl.addEventListener("click", () => calOpenModal(dateKey));
            calGrid.appendChild(dayEl);
        }

        // Refresh side panel for this month
        calRenderPanel();
    }

    /* --- Render side panel with all memories of this month --- */
    function calRenderPanel() {
        if (!calMemoriesList) return;
        const data   = calLoad();
        const year   = calCurrentDate.getFullYear();
        const month  = String(calCurrentDate.getMonth() + 1).padStart(2,"0");

        // Collect all memory entries this month
        const entries = [];
        Object.keys(data).forEach(key => {
            if (key.startsWith(`${year}-${month}-`)) {
                (data[key] || []).forEach(m => entries.push({ key, ...m }));
            }
        });

        calMemoriesList.innerHTML = "";

        if (entries.length === 0) {
            calMemoriesList.innerHTML = `<p class="cal-empty-msg">Haz clic en una fecha para agregar recuerdos especiales 💕</p>`;
            return;
        }

        entries.forEach(entry => {
            const card = document.createElement("div");
            card.className = "cal-memory-card-side";
            card.addEventListener("click", () => calOpenModal(entry.key));

            // Format date label
            const parts = entry.key.split("-");
            const dateLabel = `${parts[2]} de ${MONTHS_ES[parseInt(parts[1])-1]} ${parts[0]}`;

            card.innerHTML = `
                ${entry.photo ? `<img src="${entry.photo}" alt="Recuerdo">` : ""}
                <div class="cal-memory-card-side-info">
                    <div class="cal-memory-card-side-date">📅 ${dateLabel}</div>
                    <div class="cal-memory-card-side-desc">${entry.description || ""}</div>
                </div>
            `;
            calMemoriesList.appendChild(card);
        });
    }

    /* --- Open modal for a specific date key --- */
    function calOpenModal(dateKey) {
        if (!calModalOverlay) return;
        calSelectedDateKey = dateKey;
        calPhotoDataURL = null;

        // Reset form
        if (calPhotoPreview) { calPhotoPreview.src = ""; calPhotoPreview.classList.add("hidden"); }
        if (calPhotoDrop)    calPhotoDrop.classList.remove("hidden");
        if (calDescription)  calDescription.value = "";
        if (calCharNum)      calCharNum.textContent = "0";
        if (calPhotoInput)   calPhotoInput.value = "";

        // Set modal date title
        const parts = dateKey.split("-");
        const dateLabel = `📅 ${parts[2]} de ${MONTHS_ES[parseInt(parts[1])-1]} ${parts[0]}`;
        if (calModalTitle) calModalTitle.textContent = dateLabel;

        // Render existing memories for this date
        calRenderModalMemories(dateKey);

        calModalOverlay.classList.remove("hidden");
        document.body.style.overflow = "hidden";
    }

    function calCloseModal() {
        if (calModalOverlay) calModalOverlay.classList.add("hidden");
        document.body.style.overflow = "";
    }

    /* --- Render existing memories inside the modal --- */
    function calRenderModalMemories(dateKey) {
        if (!calModalMemories) return;
        calModalMemories.innerHTML = "";

        const data = calLoad();
        const memories = data[dateKey] || [];

        memories.forEach((mem, idx) => {
            const item = document.createElement("div");
            item.className = "cal-memory-item";

            item.innerHTML = `
                ${mem.photo ? `<img src="${mem.photo}" alt="Recuerdo ${idx+1}">` : ""}
                <div class="cal-memory-item-desc">${mem.description || ""}</div>
                <button class="cal-memory-delete" data-idx="${idx}" title="Eliminar recuerdo">
                    <i class="fa-solid fa-trash"></i>
                </button>
            `;

            // Delete button
            item.querySelector(".cal-memory-delete").addEventListener("click", (e) => {
                e.stopPropagation();
                const i = parseInt(e.currentTarget.dataset.idx);
                const d = calLoad();
                if (d[dateKey]) {
                    d[dateKey].splice(i, 1);
                    if (d[dateKey].length === 0) delete d[dateKey];
                    calSave(d);
                    calRenderModalMemories(dateKey);
                    calRender(); // refresh grid
                }
            });

            calModalMemories.appendChild(item);
        });
    }

    /* --- Photo input handling --- */
    if (calPhotoDrop) {
        calPhotoDrop.addEventListener("click", () => { if (calPhotoInput) calPhotoInput.click(); });
    }

    if (calPhotoInput) {
        calPhotoInput.addEventListener("change", (e) => {
            const file = e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                calPhotoDataURL = ev.target.result;
                if (calPhotoPreview) {
                    calPhotoPreview.src = calPhotoDataURL;
                    calPhotoPreview.classList.remove("hidden");
                }
                if (calPhotoDrop) calPhotoDrop.classList.add("hidden");
            };
            reader.readAsDataURL(file);
        });
    }

    /* --- Character counter --- */
    if (calDescription) {
        calDescription.addEventListener("input", () => {
            if (calCharNum) calCharNum.textContent = calDescription.value.length;
        });
    }

    /* --- Save memory --- */
    if (calSaveMemory) {
        calSaveMemory.addEventListener("click", () => {
            const desc = calDescription ? calDescription.value.trim() : "";
            if (!calPhotoDataURL && !desc) {
                calDescription.style.borderColor = "rgba(255,51,102,0.8)";
                setTimeout(() => { calDescription.style.borderColor = ""; }, 1500);
                return;
            }

            const data = calLoad();
            if (!data[calSelectedDateKey]) data[calSelectedDateKey] = [];
            data[calSelectedDateKey].push({
                photo: calPhotoDataURL || null,
                description: desc
            });
            calSave(data);

            // Play reveal chime
            playSecretRevealChime();

            // Reset form
            calPhotoDataURL = null;
            if (calPhotoPreview) { calPhotoPreview.src = ""; calPhotoPreview.classList.add("hidden"); }
            if (calPhotoDrop)    calPhotoDrop.classList.remove("hidden");
            if (calDescription)  calDescription.value = "";
            if (calCharNum)      calCharNum.textContent = "0";
            if (calPhotoInput)   calPhotoInput.value = "";

            calRenderModalMemories(calSelectedDateKey);
            calRender(); // refresh grid + panel

            // Sparkle burst
            triggerBurst(window.innerWidth / 2, window.innerHeight / 2, 25);
        });
    }

    /* --- Modal close --- */
    if (calModalClose) {
        calModalClose.addEventListener("click", calCloseModal);
    }
    if (calModalOverlay) {
        calModalOverlay.addEventListener("click", (e) => {
            if (e.target === calModalOverlay) calCloseModal();
        });
    }

    /* --- Month navigation --- */
    if (calPrev) {
        calPrev.addEventListener("click", () => {
            calCurrentDate.setMonth(calCurrentDate.getMonth() - 1);
            playNavigationChime();
            calRender();
        });
    }
    if (calNext) {
        calNext.addEventListener("click", () => {
            calCurrentDate.setMonth(calCurrentDate.getMonth() + 1);
            playNavigationChime();
            calRender();
        });
    }

    /* --- Initial render --- */
    calRender();

    // Interactive custom hover / clicks
    window.addEventListener("click", (e) => {
        // Only burst when clicking outside main active buttons for natural interactions
        if (!e.target.closest("button") && !e.target.closest("#music-controller") && !e.target.closest(".wax-seal")) {
            triggerBurst(e.clientX, e.clientY, 15);
            playInteractiveSparkleTone(e.clientY / window.innerHeight);
        }
    });

    window.addEventListener("mousemove", (e) => {
        // Spawn tail trailing cursor occasionally
        if (Math.random() < 0.12) {
            const trailingParticle = new Particle(e.clientX, e.clientY, true);
            trailingParticle.speedX = (Math.random() - 0.5) * 0.5;
            trailingParticle.speedY = -(Math.random() * 0.5 + 0.2);
            trailingParticle.decay = 0.015;
            particles.push(trailingParticle);
        }
    });


    let audioCtx = null;
    let musicPlaying = false;
    let sequencerTimer = null;
    let sequenceIndex = 0;
    
    // YouTube player integration variables
    let ytPlayer = null;
    let ytReady = false;
    let useWebAudioFallback = false;

    // Dynamically load YouTube Iframe Player API safely
    const tag = document.createElement("script");
    tag.src = "https://www.youtube.com/iframe_api";
    const firstScriptTag = document.getElementsByTagName("script")[0];
    if (firstScriptTag && firstScriptTag.parentNode) {
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    } else {
        document.head.appendChild(tag);
    }

    // YouTube global callback
    window.onYouTubeIframeAPIReady = function() {
        ytPlayer = new YT.Player("youtube-player", {
            height: "1",
            width: "1",
            videoId: "J5RyC2nW0Oo",
            playerVars: {
                autoplay: 0,
                controls: 0,
                loop: 1,
                playlist: "J5RyC2nW0Oo"
            },
            events: {
                onReady: () => {
                    ytReady = true;
                    // If the user already activated play, stop the fallback and start YouTube!
                    if (musicPlaying && !useWebAudioFallback) {
                        clearTimeout(sequencerTimer); // Clean transition hand-off
                        try {
                            ytPlayer.playVideo();
                        } catch(e) {
                            useWebAudioFallback = true;
                            sequenceIndex = 0;
                            playMelodyStep();
                        }
                    }
                },
                onError: () => {
                    useWebAudioFallback = true;
                    if (musicPlaying) {
                        sequenceIndex = 0;
                        playMelodyStep();
                    }
                }
            }
        });
    };
    
    // Smooth delay node for spatial echo effect
    let delayNode = null;
    let mainGain = null;

    // Romantic Arpeggio Notes in G major / C major
    // Format: [ frequency, durationMultiplier, volumeScalar ]
    const melody = [
        // Measure 1 (C major)
        [261.63, 1], // C4
        [329.63, 1], // E4
        [392.00, 1], // G4
        [523.25, 2], // C5
        [392.00, 1], // G4
        [329.63, 1], // E4
        
        // Measure 2 (G major / B)
        [246.94, 1], // B3
        [293.66, 1], // D4
        [392.00, 1], // G4
        [493.88, 2], // B4
        [392.00, 1], // G4
        [293.66, 1], // D4
        
        // Measure 3 (A minor)
        [220.00, 1], // A3
        [261.63, 1], // C4
        [329.63, 1], // E4
        [440.00, 2], // A4
        [329.63, 1], // E4
        [261.63, 1], // C4
        
        // Measure 4 (F major)
        [174.61, 1], // F3
        [220.00, 1], // A3
        [261.63, 1], // C4
        [349.23, 2], // F4
        [261.63, 1], // C4
        [220.00, 1], // A3

        // Measure 5 (C major high melody)
        [523.25, 1], // C5
        [587.33, 1], // D5
        [659.25, 2], // E5
        [523.25, 1], // C5
        [587.33, 1], // D5
        [659.25, 2], // E5
        
        // Measure 6 (G major high melody)
        [493.88, 1], // B4
        [523.25, 1], // C5
        [587.33, 2], // D5
        [493.88, 1], // B4
        [523.25, 1], // C5
        [587.33, 2], // D5

        // Measure 7 (F major high)
        [349.23, 1], // F4
        [392.00, 1], // G4
        [440.00, 2], // A4
        [523.25, 1], // C5
        [440.00, 1], // A4
        [392.00, 1], // G4

        // Measure 8 (G major transition)
        [392.00, 2], // G4
        [440.00, 1], // A4
        [493.88, 1], // B4
        [587.33, 2], // D5
        [392.00, 1], // G4
        [493.88, 1]  // B4
    ];

    function initAudio() {
        if (audioCtx) return;
        
        // Cross-browser AudioContext initialization
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        audioCtx = new AudioContextClass();
        
        // Create an elegant echo delay effect
        delayNode = audioCtx.createDelay(1.0);
        delayNode.delayTime.value = 0.38; // Sweet rhythmic spacing
        
        const feedbackGain = audioCtx.createGain();
        feedbackGain.gain.value = 0.32; // Sweet subtle feedback tail
        
        mainGain = audioCtx.createGain();
        mainGain.gain.value = 0.12; // Maintain soft ambient lounge volume level
        
        // Wire up delay nodes feedback loop
        delayNode.connect(feedbackGain);
        feedbackGain.connect(delayNode);
        
        // Connect system
        mainGain.connect(audioCtx.destination);
        delayNode.connect(mainGain);
    }

    function createMusicBoxSynthVoice(freq, duration) {
        if (!audioCtx) return;
        
        // Transpose up one octave for perfect delicate music box chimes
        const baseFreq = freq * 2;
        
        // Oscillator 1 (Warm Triangle core)
        const osc = audioCtx.createOscillator();
        osc.type = "triangle";
        osc.frequency.value = baseFreq;
        
        // Oscillator 2 (Shimmering Sine overtone + 1 octave up + minor detune for chorus)
        const overtoneOsc = audioCtx.createOscillator();
        overtoneOsc.type = "sine";
        overtoneOsc.frequency.value = baseFreq * 2;
        overtoneOsc.detune.value = 8; // 8 cents detune for sweet physical shimmer
        
        // ADSR Envelope Node
        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.35, audioCtx.currentTime + 0.02); // Quick sweet attack
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration * 1.5); // Warm decaying bell tail
        
        const overtoneGain = audioCtx.createGain();
        overtoneGain.gain.setValueAtTime(0, audioCtx.currentTime);
        overtoneGain.gain.linearRampToValueAtTime(0.18, audioCtx.currentTime + 0.015);
        overtoneGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration * 0.8); // Quicker decay on overtone
        
        // Connections
        osc.connect(gainNode);
        overtoneOsc.connect(overtoneGain);
        
        gainNode.connect(mainGain);
        gainNode.connect(delayNode);
        
        overtoneGain.connect(mainGain);
        overtoneGain.connect(delayNode);
        
        // Start and stop play schedules
        osc.start();
        osc.stop(audioCtx.currentTime + duration * 2.0);
        overtoneOsc.start();
        overtoneOsc.stop(audioCtx.currentTime + duration * 2.0);
    }

    // Sequence Step Timer
    function playMelodyStep() {
        const currentNote = melody[sequenceIndex];
        const freq = currentNote[0];
        const lengthMultiplier = currentNote[1];
        
        const baseNoteTime = 0.32; // tempo beat spacing (secs)
        
        // Trigger the note synthetically
        createMusicBoxSynthVoice(freq, baseNoteTime * lengthMultiplier);
        
        // Schedule next beat
        sequenceIndex = (sequenceIndex + 1) % melody.length;
        sequencerTimer = setTimeout(playMelodyStep, baseNoteTime * 1000);
    }

    function toggleRomanticMusic() {
        initAudio();
        if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume();
        }
        
        if (musicPlaying) {
            musicPlaying = false;
            
            // Stop YouTube player if ready and active
            if (ytReady && ytPlayer && !useWebAudioFallback) {
                try {
                    ytPlayer.pauseVideo();
                } catch(e) {
                    clearTimeout(sequencerTimer);
                }
            } else {
                clearTimeout(sequencerTimer);
            }
            
            musicIcon.className = "fa-solid fa-music";
            musicController.classList.remove("playing");
            musicTooltip.innerText = "Tocar melodía";
        } else {
            musicPlaying = true;
            
            // Play YouTube player if ready and active
            if (ytReady && ytPlayer && !useWebAudioFallback) {
                try {
                    ytPlayer.playVideo();
                } catch(e) {
                    useWebAudioFallback = true;
                    sequenceIndex = 0;
                    playMelodyStep();
                }
            } else {
                sequenceIndex = 0;
                playMelodyStep();
            }
            
            musicIcon.className = "fa-solid fa-volume-high";
            musicController.classList.add("playing");
            musicTooltip.innerText = "Silenciar melodía";
            
            // Visual floating feedback burst
            triggerBurst(musicController.offsetLeft + 30, musicController.offsetTop + 30, 10);
        }
    }
    
    if (musicController) {
        musicController.addEventListener("click", toggleRomanticMusic);
    }

    // ==========================================
    // 8. SFX CUES (COMPLEMENTARY SOUND EFFECTS)
    // ==========================================
    
    function playSoftTone(freq, type = "sine", duration = 0.5, volume = 0.08) {
        if (!audioCtx) return;
        
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        
        osc.type = type;
        osc.frequency.value = freq;
        
        gain.gain.setValueAtTime(0, audioCtx.currentTime);
        gain.gain.linearRampToValueAtTime(volume, audioCtx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + duration);
        
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        
        osc.start();
        osc.stop(audioCtx.currentTime + duration * 1.2);
    }

    function playInteractiveClickCue() {
        initAudio();
        if (audioCtx.state === "suspended") audioCtx.resume();
        
        // Beautiful rising dual harp chime
        setTimeout(() => playSoftTone(523.25, "sine", 0.6, 0.12), 0);   // C5
        setTimeout(() => playSoftTone(659.25, "sine", 0.6, 0.10), 100); // E5
        setTimeout(() => playSoftTone(783.99, "sine", 0.7, 0.08), 200); // G5
        setTimeout(() => playSoftTone(1046.5, "sine", 0.9, 0.06), 300); // C6
    }
    
    function playNavigationChime() {
        if (!audioCtx) return;
        // Light golden chime on tab switch
        playSoftTone(783.99, "sine", 0.4, 0.05); // G5
        setTimeout(() => playSoftTone(987.77, "sine", 0.5, 0.04), 80); // B5
    }
    
    function playSecretRevealChime() {
        if (!audioCtx) return;
        // Warm sliding synth chord for discovering secrets
        playSoftTone(440.00, "triangle", 0.6, 0.06); // A4
        setTimeout(() => playSoftTone(554.37, "triangle", 0.6, 0.05), 60); // C#5
        setTimeout(() => playSoftTone(659.25, "triangle", 0.7, 0.04), 120); // E5
        setTimeout(() => playSoftTone(880.00, "sine", 0.9, 0.05), 180); // A5
    }

    function playInteractiveSparkleTone(screenYRatio) {
        initAudio();
        if (audioCtx && audioCtx.state === "suspended") {
            audioCtx.resume();
        }
        if (!audioCtx) return;
        // Pitch mapping based on screen click Y height (higher click = higher sound!)
        const minFreq = 440; // A4
        const maxFreq = 1100; // C6
        const targetFreq = maxFreq - (screenYRatio * (maxFreq - minFreq));
        
        // Soft glockenspiel drop
        playSoftTone(targetFreq, "sine", 0.45, 0.06);
        setTimeout(() => playSoftTone(targetFreq * 1.5, "sine", 0.3, 0.03), 50);
    }

    // ==========================================
    // 10. 1000 RAZONES POR LAS QUE TE AMO - ISELA
    // ==========================================
    const RAZONES = [
        "Porque cuando te veo, el tiempo se detiene y el mundo se vuelve más bonito.",
        "Porque tu sonrisa es la primera cosa que quiero ver cada mañana.",
        "Porque tus ojos tienen una profundidad que me pierdo en ellos felizmente.",
        "Porque eres auténtica, sin fingir ni pretender ser alguien que no eres.",
        "Porque tu voz me calma incluso en los días más difíciles.",
        "Porque me haces querer ser una mejor persona cada día.",
        "Porque tienes una bondad que pocas personas en el mundo tienen.",
        "Porque tu risa me hace sentir que todo está bien en el mundo.",
        "Porque cuando estás conmigo, no necesito nada más.",
        "Porque eres la única persona con quien quiero compartir mis secretos.",
        "Porque me miras de una manera que me hace sentir especial.",
        "Porque cuidas de las personas que amas con todo tu corazón.",
        "Porque tienes una fuerza interior que me inspira profundamente.",
        "Porque eres inteligente y lo sabes sin presumirlo.",
        "Porque tu presencia llena de luz cualquier lugar donde estás.",
        "Porque me escuchas de verdad, no solo oyes lo que digo.",
        "Porque tienes una manera de reír que alegra a todos a tu alrededor.",
        "Porque eres honesta incluso cuando la verdad es difícil de decir.",
        "Porque cuando me abrazas siento que estoy en casa.",
        "Porque tu forma de ver la vida me enseña cosas nuevas todo el tiempo.",
        "Porque eres valiente aunque a veces no lo notas tú misma.",
        "Porque me haces sentir aceptado tal como soy.",
        "Porque tu corazón es tan grande que siempre tiene espacio para dar más amor.",
        "Porque tienes una elegancia natural que no necesita esfuerzo.",
        "Porque me recuerdas que las pequeñas cosas son las que realmente importan.",
        "Porque eres tierna con las personas que más lo necesitan.",
        "Porque cuando sonríes, las estrellas se ponen celosas.",
        "Porque me haces reír de una manera que nadie más puede.",
        "Porque eres paciente incluso cuando el mundo te pone a prueba.",
        "Porque tienes una sensibilidad que te hace percibir lo que otros no ven.",
        "Porque me haces sentir que soy importante en tu mundo.",
        "Porque eres leal con las personas que quieres.",
        "Porque tu manera de hablar tiene una dulzura que no puedo describir.",
        "Porque cuando estás triste, quiero hacer lo imposible por hacerte sonreír.",
        "Porque tienes sueños grandes y la determinación para alcanzarlos.",
        "Porque me inspiras a no rendirme cuando las cosas se ponen difíciles.",
        "Porque eres la persona más interesante que he conocido en mi vida.",
        "Porque tu energía llena de vida cada espacio donde entras.",
        "Porque cuando hablas de lo que amas, tus ojos brillan de una manera mágica.",
        "Porque me enseñaste que el amor verdadero no duele, consuela.",
        "Porque tienes una manera única de ver la belleza en las cosas simples.",
        "Porque nunca has dejado de ser tú misma por nadie.",
        "Porque me haces querer el futuro de una manera que antes no sentía.",
        "Porque eres detallista y recuerdas cosas pequeñas que significan mucho.",
        "Porque tu compañía me hace sentir completo.",
        "Porque tienes una mirada que me dice más que mil palabras.",
        "Porque eres resiliente y te levantas siempre después de caer.",
        "Porque cuando me dices mi nombre, suena diferente a como lo dice cualquier otro.",
        "Porque tus manos son las más bonitas que he visto en mi vida.",
        "Porque me haces pensar en el futuro con emoción en lugar de miedo.",
        "Porque eres apasionada con las cosas que te importan.",
        "Porque tu ternura hace que hasta los días grises parezcan soleados.",
        "Porque me haces creer que el amor romántico de verdad existe.",
        "Porque tienes una manera de consolar que sana el alma.",
        "Porque eres espontánea de una manera que me mantiene en constante asombro.",
        "Porque cuando ríes a carcajadas no puedo evitar reírme también.",
        "Porque tus valores y principios me llaman profundamente la atención.",
        "Porque eres la definición de lo que siempre quise encontrar.",
        "Porque me haces mejor en cada conversación que tenemos.",
        "Porque tienes una calidez humana que pocas personas poseen.",
        "Porque cuando estoy mal, solo pensar en ti me da fuerzas.",
        "Porque eres mi razón favorita para despertar cada mañana.",
        "Porque tienes el corazón más puro que he conocido.",
        "Porque me recuerdas que merece la pena luchar por las cosas buenas.",
        "Porque eres mi calma favorita en medio de cualquier tormenta.",
        "Porque tu alegría es contagiosa de la mejor manera posible.",
        "Porque me tratas con el mismo amor que tú mereces recibir.",
        "Porque tienes una forma de ver el mundo que me parece absolutamente hermosa.",
        "Porque cuando estás a mi lado, el mundo exterior deja de importar.",
        "Porque eres capaz de encontrar lo positivo incluso en lo más difícil.",
        "Porque me das una sensación de paz que nunca había conocido.",
        "Porque siempre eres tú misma sin importar quién te esté viendo.",
        "Porque tienes una determinación que me deja sin palabras.",
        "Porque me haces sentir que puedo lograr cualquier cosa.",
        "Porque eres genuina en cada cosa que sientes y expresas.",
        "Porque me das ganas de ser el hombre que mereces.",
        "Porque tu forma de amar es intensa pero también suave.",
        "Porque tienes el poder de hacer que un día ordinario se sienta especial.",
        "Porque cuando me cuentas tus sueños, quiero ser parte de ellos.",
        "Porque te importan las personas de verdad, no solo de palabra.",
        "Porque tienes una clase natural que no se puede aprender, solo se nace con ella.",
        "Porque eres mi inspiración más grande.",
        "Porque cuando me miras, siento que soy el hombre más afortunado del universo.",
        "Porque tienes una personalidad que se queda grabada en el alma.",
        "Porque me haces sentir vivo de una manera que nada más puede.",
        "Porque eres curiosa y siempre quieres aprender cosas nuevas.",
        "Porque cuando dices que me quieres, lo siento en cada palabra.",
        "Porque tienes el poder de cambiar mi estado de ánimo con solo aparecer.",
        "Porque eres mi lugar favorito en el mundo.",
        "Porque me haces querer quedarme despierto solo para hablar contigo más tiempo.",
        "Porque tienes una manera de hacer que me sienta visto de verdad.",
        "Porque eres la persona con quien quiero celebrar cada logro.",
        "Porque me haces entender para qué sirve el amor.",
        "Porque tienes una capacidad de empatía que me parece extraordinaria.",
        "Porque eres mi mayor fuente de inspiración.",
        "Porque me haces sentir que todo tiene sentido cuando estás cerca.",
        "Porque eres la mejor compañía que podría pedir.",
        "Porque tienes una manera de sonreír que ilumina hasta el lugar más oscuro.",
        "Porque me haces querer el presente, no solo el futuro.",
        "Porque eres valiente de maneras en las que yo aún sigo aprendiendo.",
        "Porque tu forma de amar hace que el amor parezca sencillo y natural.",
        "Porque me haces sentir que el tiempo a tu lado nunca es suficiente.",
        "Porque eres mi persona favorita en este planeta.",
        "Porque tienes una belleza que va mucho más allá de lo físico.",
        "Porque me das razones nuevas para amarte cada día que pasa.",
        "Porque cuando te veo feliz, yo también lo soy.",
        "Porque eres la razón por la que creo en el amor verdadero.",
        "Porque tienes una forma de hablar que me mantiene enganchado siempre.",
        "Porque me haces ver la vida desde perspectivas que jamás había contemplado.",
        "Porque eres honesta conmigo incluso cuando sé que es difícil.",
        "Porque cuando te ríes de mis chistes malos, sé que me amas.",
        "Porque tienes una manera de dar que viene del corazón, sin esperar nada a cambio.",
        "Porque eres mi sueño más bonito convertido en realidad.",
        "Porque me haces querer ser constante, fiel y mejor.",
        "Porque tu amor me hace sentir invencible.",
        "Porque tienes la capacidad de hacer que un abrazo cure todo.",
        "Porque eres especial de una manera que no se puede explicar con palabras.",
        "Porque me haces reír incluso en los días que no tengo ganas.",
        "Porque eres paciente conmigo cuando más lo necesito.",
        "Porque tienes una sensibilidad que me hace querer protegerte siempre.",
        "Porque cuando estás feliz, todo el universo lo nota.",
        "Porque me enseñas sin darte cuenta todos los días.",
        "Porque eres mi paz favorita.",
        "Porque tienes una forma de cuidar que hace que todo se sienta mejor.",
        "Porque me haces sentir que no estoy solo.",
        "Porque eres la persona en quien confío por completo.",
        "Porque tu fe y tu fuerza me inspiran a ser más.",
        "Porque cuando nos reímos juntos, nada más importa.",
        "Porque me recuerdas todos los días por qué vale la pena amar.",
        "Porque eres mi razón, mi motivo y mi propósito.",
        "Porque tienes una profundidad que podría explorar por siempre.",
        "Porque me haces querer lo mejor para ti más que para mí mismo.",
        "Porque eres la mujer más increíble que he conocido.",
        "Porque cuando pienso en el futuro, siempre apareces tú.",
        "Porque me haces sentir que el amor es la fuerza más poderosa que existe.",
        "Porque tienes un alma que brilla desde adentro.",
        "Porque eres mi favorita en todo y para todo.",
        "Porque me haces querer darte el mundo entero.",
        "Porque tienes una dulzura que nunca he visto en nadie más.",
        "Porque cuando me abrazas, todo lo malo desaparece.",
        "Porque eres la razón por la que creo que hay cosas buenas en este mundo.",
        "Porque me das la certeza de que elegí bien al elegirte a ti.",
        "Porque tienes una manera de querer que es completamente tuya.",
        "Porque eres mi historia favorita de todas las que podría contar.",
        "Porque me haces sentir amado de una forma en que nunca antes lo sentí.",
        "Porque eres brillante de maneras que tú misma no alcanzas a ver.",
        "Porque cuando hablas, quiero escucharte sin interrupciones.",
        "Porque tienes una gracia que aparece sin esfuerzo.",
        "Porque me recuerdas que el amor es un verbo, no solo una emoción.",
        "Porque eres la primera persona en quien pienso cuando algo me pasa.",
        "Porque me haces querer hablar contigo en lugar de con nadie más.",
        "Porque tienes una sonrisa que funciona como medicina para el alma.",
        "Porque eres la definición de lo que es una persona hermosa por dentro.",
        "Porque me das ganas de quedarme para siempre.",
        "Porque tienes una fortaleza que admiro profundamente.",
        "Porque cuando estás feliz, yo encuentro mi felicidad ahí.",
        "Porque me haces sentir que pertenecer a alguien es lo más bonito del mundo.",
        "Porque eres mi lugar seguro.",
        "Porque tienes una vitalidad que contagia a todos.",
        "Porque me haces querer vivir plenamente.",
        "Porque eres la persona que quiero a mi lado en cada capítulo de la vida.",
        "Porque tienes la capacidad de hacer que cualquier momento sea memorable.",
        "Porque me haces sentir que soy suficiente.",
        "Porque eres mi razón para sonreír sin motivo aparente.",
        "Porque tienes una madurez que va más allá de tu edad.",
        "Porque cuando estás cerca, siento que el tiempo se detiene de la mejor manera.",
        "Porque me haces querer dar lo mejor de mí siempre.",
        "Porque eres un regalo que no merezco pero que agradezco con todo mi ser.",
        "Porque tienes ojos que hablan más que cualquier discurso.",
        "Porque me haces sentir que el amor no tiene límites.",
        "Porque eres la razón por la que creo en los milagros.",
        "Porque tienes una gracia al caminar que me roba la atención.",
        "Porque me haces querer escribirte cartas de amor todos los días.",
        "Porque eres el tipo de persona que el mundo necesita más.",
        "Porque tienes una manera de ver las cosas que siempre encuentro fascinante.",
        "Porque me haces querer el ahora más que cualquier otra cosa.",
        "Porque eres mi victoria favorita.",
        "Porque tienes una alegría que es imposible no notar.",
        "Porque me haces sentir que el amor es simple cuando está bien dado.",
        "Porque eres la persona con quien quiero envejecer.",
        "Porque tienes una forma de abrazar que dice más que mil palabras.",
        "Porque me haces querer ser recordado como alguien que te amó de verdad.",
        "Porque eres el norte al que apunta mi corazón.",
        "Porque tienes una manera de ver lo bueno en mí que me impulsa a serlo más.",
        "Porque me haces sentir que cada día a tu lado es el mejor día.",
        "Porque eres mi razón constante.",
        "Porque tienes la habilidad de hacer que todo tenga sentido.",
        "Porque me haces querer darte lo mejor de cada momento.",
        "Porque eres mi mundo preferido.",
        "Porque tienes una forma de ser completamente tuya y completamente hermosa.",
        "Porque me haces creer que el amor romántico no es ficción.",
        "Porque eres la razón por la que el amanecer tiene un significado especial.",
        "Porque tienes una manera de amar que me hace querer amar mejor.",
        "Porque me haces sentir que no necesito más cuando estás conmigo.",
        "Porque eres mi felicidad más genuina.",
        "Porque tienes una forma de reír que se convierte en mi canción favorita.",
        "Porque me haces querer decirte lo mucho que te amo todos los días.",
        "Porque eres el tipo de persona con quien quiero compartir el silencio.",
        "Porque tienes una belleza que crece cada vez que te conozco más.",
        "Porque me haces sentir que el amor vale toda la vulnerabilidad que implica.",
        "Porque eres mi razón más sincera.",
        "Porque tienes una manera de existir que embellece todo lo que la rodea.",
        "Porque me haces querer celebrar que eres mía.",
        "Porque eres la mujer más especial que ha cruzado mi camino.",
        "Porque tienes el poder de hacer que un momento ordinario se vuelva eterno.",
        "Porque me haces sentir que el amor que tengo por ti es algo sagrado.",
        "Porque eres mi primera y última razón todos los días.",
        "Porque tienes una manera de cuidar a los demás que me enamora.",
        "Porque me haces querer que todos los días sean como cuando estoy contigo.",
        "Porque eres todo lo que siempre quise y más de lo que esperaba.",
        "Porque tienes una manera de mirarme que me hace sentir único.",
        "Porque me haces querer darte el cielo, las estrellas y todo lo que hay entre ellos.",
        "Porque eres mi razón más hermosa.",
        "Porque tienes una forma de amarme que me hace querer amarte más.",
        "Porque me haces sentir que estar enamorado es lo más bonito del mundo.",
        "Porque eres la persona a quien le daré mi mejor versión siempre.",
        "Porque tienes una personalidad que me atrae desde lo más profundo.",
        "Porque me haces querer que este amor dure para siempre.",
        "Porque eres infinitamente más de lo que las palabras pueden describir.",
        "Porque tienes una calidez que ningún invierno puede apagar.",
        "Porque me haces sentir que el amor es la decisión más inteligente que he tomado.",
        "Porque eres mi sí más grande y más seguro.",
        "Porque tienes un corazón que merece todo el amor del universo.",
        "Porque me haces querer protegerte sin que pierdas tu independencia.",
        "Porque eres la razón por la que el amor tiene sentido para mí.",
        "Porque tienes una forma de brillar que hace que todo a tu alrededor brille también.",
        "Porque me haces sentir que te conocerte ha sido lo mejor que me ha pasado.",
        "Porque eres el gran amor de mi vida, Isela.",
        "Porque te quiero exactamente como eres, sin cambiar nada.",
        "Porque tu amor ha sido el regalo más grande que la vida me ha dado.",
        "Porque eres tú, y eso es más que suficiente razón.",
        "Porque tienes una manera de hacer que me olvide de todo con solo una mirada.",
        "Porque me haces querer ser tuyo para siempre.",
        "Porque eres la respuesta a preguntas que ni sabía que tenía.",
        "Porque tienes algo en ti que no puedo explicar pero que me mueve por dentro.",
        "Porque me haces sentir que el amor puede ser eterno.",
        "Porque eres perfecta en tu imperfección.",
        "Porque tienes una forma de ser que me hace admirarte todos los días.",
        "Porque me haces querer que el tiempo se detenga cuando estamos juntos.",
        "Porque eres mi razón número uno siempre.",
        "Porque tienes una clase de amor que no he encontrado en ningún otro lugar.",
        "Porque me haces querer construir un futuro lleno de ti.",
        "Porque eres la persona que elegiría en cada vida que se me diera.",
        "Porque tienes una manera de hacerme feliz que solo tú posees.",
        "Porque me haces sentir que el amor verdadero existe y lo tengo contigo.",
        "Porque eres mi razón más bonita de todas.",
        "Porque tienes algo especial que no se puede copiar ni imitar.",
        "Porque me haces querer escribir tu nombre en cada cosa que hago.",
        "Porque eres la persona a quien quiero hacerle feliz todos los días.",
        "Porque tienes una manera de amarme que hace que me sienta invencible.",
        "Porque me haces sentir que este amor es el más real que he vivido.",
        "Porque eres mi todo, Isela, mi absolutamente todo.",
        "Porque tienes un magnetismo que me atrae sin importar la distancia.",
        "Porque me haces querer ser lo que necesitas en cada momento.",
        "Porque eres la razón por la que el amor se siente como un superpoder.",
        "Porque tienes una forma de existir que mejora cualquier espacio.",
        "Porque me haces sentir que tenerte cerca es lo más valioso que poseo.",
        "Porque eres irreemplazable e insustituible para mí.",
        "Porque tienes una manera de decir las cosas que las hace más bonitas.",
        "Porque me haces querer que cada promesa que te hago sea realidad.",
        "Porque eres la mujer que merece todo el amor del mundo.",
        "Porque tienes una manera de mirarme que convierte lo ordinario en extraordinario.",
        "Porque me haces sentir que ser amado por ti es un privilegio enorme.",
        "Porque eres mi favorita ayer, hoy y siempre.",
        "Porque tienes una forma de dar amor que no conoce límites.",
        "Porque me haces querer ser el hombre más fiel y más constante del mundo.",
        "Porque eres la razón por la que sé que elegí bien.",
        "Porque tienes una calidez en el alma que no he encontrado en ningún otro lugar.",
        "Porque me haces sentir que el amor que existe entre nosotros es único.",
        "Porque eres mi más grande motivación.",
        "Porque tienes una belleza que me deja sin aliento cada vez que te veo.",
        "Porque me haces querer darte todo lo bueno que existe en el mundo.",
        "Porque eres el motivo por el que creo que lo mejor está por venir.",
        "Porque tienes una forma de amarme que me hace un hombre mejor.",
        "Porque me haces sentir que cada segundo a tu lado es un regalo.",
        "Porque eres mi amor más grande, Isela, te amo con toda mi alma.",
        "Porque tienes una esencia que nunca olvidaré.",
        "Porque me haces querer gritar al mundo que eres mía y que soy tuyo.",
        "Porque eres la razón por la que el presente es tan hermoso.",
        "Porque tienes algo en ti que me hace querer quedarme para siempre.",
        "Porque me haces sentir que contigo, todo vale la pena.",
        "Porque eres mi gran historia de amor.",
        "Porque tienes una forma de ser que me hace amarte más cada día.",
        "Porque me haces querer que este amor nunca termine.",
        "Porque eres única, irrepetible y absolutamente mía.",
        "Porque tienes una manera de hacerme sentir que soy especial para ti.",
        "Porque me haces sentir que el amor más bonito es el que compartimos.",
        "Porque eres mi corazón fuera de mi cuerpo.",
        "Porque tienes una forma de amar que transforma todo lo que toca.",
        "Porque me haces querer ser tu eterno enamorado.",
        "Porque eres la razón por la que el amor tiene el significado más profundo.",
        "Porque tienes una luz que ilumina mi mundo entero.",
        "Porque me haces sentir que cada día es una oportunidad de amarte más.",
        "Porque eres mi mayor razón para todo.",
        "Porque tienes una manera de cuidar que me hace sentir el hombre más amado.",
        "Porque me haces querer que el tiempo nos sea eterno.",
        "Porque eres mi propósito más hermoso.",
        "Porque tienes una manera de existir que llena mi vida de significado.",
        "Porque me haces sentir que el amor es la aventura más grande.",
        "Porque eres mi definición de perfecto.",
        "Porque tienes una forma de ser que hace que mi corazón se acelere.",
        "Porque me haces querer amarte en silencio y a gritos.",
        "Porque eres la razón por la que el futuro me emoiona.",
        "Porque tienes una manera de mirarme que me hace sentir completamente tuyo.",
        "Porque me haces sentir que si te tuviera no querría nada más.",
        "Porque eres mi felicidad más auténtica.",
        "Porque tienes una bondad que me hace querer ser mejor.",
        "Porque me haces querer que nuestra historia no tenga final.",
        "Porque eres la persona con quien quiero compartir cada estación del año.",
        "Porque tienes una manera de hacer que lo difícil parezca más fácil.",
        "Porque me haces sentir que soy el hombre más afortunado de la tierra.",
        "Porque eres mi constante en medio de todo lo que cambia.",
        "Porque tienes una forma de amar que sana y no duele.",
        "Porque me haces querer darte cada pieza de mi corazón.",
        "Porque eres la mujer que me cambió la vida para siempre.",
        "Porque tienes una manera de hacerme sentir completo.",
        "Porque me haces sentir que el amor que siento por ti es el más verdadero.",
        "Porque eres mi todo y mucho más de lo que el todo puede contener.",
        "Porque tienes una manera de hacerme reír que nadie más tiene.",
        "Porque me haces querer escribir libros enteros solo de ti.",
        "Porque eres la razón por la que la vida es tan hermosa.",
        "Porque tienes una esencia única que me enamoró desde el primer momento.",
        "Porque me haces sentir que amarte es el mejor privilegio de mi vida.",
        "Porque eres mi razón más poderosa.",
        "Porque tienes una manera de decirte que te amo que hace que quiera decírtelo más.",
        "Porque me haces querer que este amor sea la historia más bonita jamás contada.",
        "Porque eres la persona por quien vale la pena todo.",
        "Porque tienes una forma de ser que me hace querer que el tiempo se detenga.",
        "Porque me haces sentir que te amar es lo más natural y lo más intenso.",
        "Porque eres mi verdad más bonita.",
        "Porque tienes una manera de existir que embellece absolutamente todo.",
        "Porque me haces querer darte lo mejor de cada día de mi vida.",
        "Porque eres y serás siempre el amor de mi vida, Isela.",
        "Porque tienes algo en ti que no se puede encontrar en ningún otro lugar del mundo.",
        "Porque me haces sentir que el amor es la respuesta a todo.",
        "Porque eres la persona que amo hoy, mañana y siempre sin dudarlo.",
        "Porque tienes una manera de tocarme el corazón sin necesitar tocarlo.",
        "Porque me haces querer que cada abrazo sea infinito.",
        "Porque eres la razón por la que el amor sigue siendo mi canción favorita.",
        "Porque tienes una forma de amarme que me hace estar seguro de todo.",
        "Porque me haces sentir que te elegirte a ti fue la mejor decisión de mi vida.",
        "Porque eres mi amor, mi vida y mi razón de ser, Isela, para siempre.",
        "Porque tu nombre escrito en mi corazón es la frase más bonita que existe.",
        "Porque cuando te imagino a mi lado en el futuro, todo cobra sentido.",
        "Porque tienes el tipo de energía que hace que la gente quiera estar cerca de ti.",
        "Porque me haces querer protegerte de cada dolor del mundo.",
        "Porque eres el tipo de persona que uno agradece conocer.",
        "Porque tienes una gracia al reír que me parece completamente suya.",
        "Porque me haces querer estar presente en cada momento de tu vida.",
        "Porque eres mi razón de creer en las segundas oportunidades.",
        "Porque tienes una manera de mover el mundo sin saberlo.",
        "Porque me haces sentir que el amor no tiene techo.",
        "Porque eres mi persona favorita de entre todas las que existen.",
        "Porque tienes una manera de hacerme sentir que soy suficiente para ti.",
        "Porque me haces querer que el amor que sentimos sea para siempre.",
        "Porque eres la razón por la que sigo creyendo en lo bueno de la vida.",
        "Porque tienes una manera de amarme que hace que todo lo difícil valga la pena.",
        "Porque me haces sentir que tenerte cerca es el hogar más cálido que existe.",
        "Porque eres todo lo que busqué y más de lo que soñé, Isela.",
        "Porque tienes algo en ti que transforma cualquier momento en algo especial.",
        "Porque me haces querer darte el amor que mereces sin escatimar nada.",
        "Porque eres la razón por la que creo que estoy exactamente donde debo estar.",
        "Porque tienes una manera de hacerme sentir que el amor es un regalo eterno.",
        "Porque me haces querer ser digno de lo que sientes por mí.",
        "Porque eres mi razón más poderosa y más sincera.",
        "Porque tienes una forma de llenar el silencio que lo vuelve hermoso.",
        "Porque me haces sentir que amarte es lo más natural del mundo.",
        "Porque eres la razón por la que cada mañana tiene un propósito.",
        "Porque tienes una manera de hacer que me sienta vivo con solo estar cerca.",
        "Porque me haces querer que este amor trascienda el tiempo.",
        "Porque eres y siempre serás el amor más grande de mi vida.",
        "Porque tienes una forma de querer que me hace querer ser mejor.",
        "Porque me haces sentir que el amor más bonito es el que existe entre tú y yo.",
        "Porque eres, simplemente, la mujer más increíble que he conocido.",
        "Porque tienes una manera de ser que me hace querer conocerte más cada día.",
        "Porque me haces querer que todos nuestros días juntos sean los más bonitos.",
        "Porque eres la razón por la que el amor tiene el sabor más dulce.",
        "Porque tienes una esencia que ilumina mi vida completa.",
        "Porque me haces sentir que eres la persona con quien quiero crecer.",
        "Porque eres la razón por la que sigo creyendo en el amor verdadero.",
        "Porque tienes una forma de amar que es completamente única en el universo.",
        "Porque me haces querer que cada amanecer sea contigo.",
        "Porque eres y serás siempre la persona por quien daría todo.",
        "Porque tienes una manera de hacer que el amor se sienta como el lugar más seguro.",
        "Porque me haces querer que nuestra historia sea eterna.",
        "Porque eres mi corazón más afuera de mi cuerpo, Isela.",
        "Porque tienes una bondad que merece ser amada sin condiciones.",
        "Porque me haces sentir que el amor que nos tenemos es el más bonito del mundo.",
        "Porque eres la razón por la que el amor existe en su forma más pura.",
        "Porque tienes una manera de hacerme querer que no hay palabras para describirla.",
        "Porque me haces sentir que estar contigo es estar en el lugar correcto.",
        "Porque eres mi sí más grande, mi amor más sincero, mi Isela para siempre.",
        "Porque cuando pienso en ti, todo lo demás desaparece.",
        "Porque tienes la mirada más bonita que he visto en mi vida.",
        "Porque me haces querer ser constante, fiel y tuyo todos los días.",
        "Porque eres la persona que me hace creer que merezco ser feliz.",
        "Porque tienes una manera de existir que me hace mejor persona.",
        "Porque me haces sentir que el amor que te doy es el mejor regalo que puedo ofrecer.",
        "Porque eres la razón por la que el amor me parece la fuerza más grande del universo.",
        "Porque tienes una forma de ser que me enamora más cada vez que la descubro.",
        "Porque me haces querer que este amor no tenga fin jamás.",
        "Porque eres mi razón, mi fuerza y mi amor eterno.",
        "Porque tienes una manera de hacerme feliz que solo tú tienes.",
        "Porque me haces sentir que amarte es la mejor aventura que he emprendido.",
        "Porque eres la persona con quien quiero vivir todos los capítulos que vienen.",
        "Porque tienes algo especial en ti que no puedo encontrar en ningún otro lugar.",
        "Porque me haces querer que el tiempo nos dé miles de años juntos.",
        "Porque eres la mujer que amo, la que elegiría siempre y la que merece todo.",
        "Porque tienes una forma de amarme que convierte cada día en algo extraordinario.",
        "Porque me haces sentir que el amor más bonito del mundo es el que tenemos.",
        "Porque eres mi todo, Isela, y siempre lo serás.",
        "Porque cuando me dices que me quieres, me lo creo completamente.",
        "Porque tienes una forma de ver la vida que me parece absolutamente mágica.",
        "Porque me haces querer que cada momento contigo dure para siempre.",
        "Porque eres la persona que eligió mi corazón antes de que mi mente lo supiera.",
        "Porque tienes una manera de hacerme sentir protegido también a mí.",
        "Porque me haces sentir que el amor es el lenguaje que mejor entendemos.",
        "Porque eres mi favorita en este y en todos los mundos posibles.",
        "Porque tienes una forma de amar que llena hasta los espacios vacíos.",
        "Porque me haces querer decirte cada día que eres la razón más bonita.",
        "Porque eres la razón por la que sé que el amor vale cada riesgo.",
        "Porque tienes una manera de existir que hace que todo valga más.",
        "Porque me haces sentir que contigo, soy la versión más completa de mí.",
        "Porque eres mi amor más profundo, Isela, hoy y por todos los días que vengan.",
        "Porque tienes una gracia que hace que el tiempo a tu lado vuele y también se detenga.",
        "Porque me haces querer que nuestra historia sea el cuento más bonito jamás escrito.",
        "Porque eres la persona que llevo en el corazón a cada lugar que voy.",
        "Porque tienes una manera de amarme que es la razón por la que existo.",
        "Porque me haces sentir que tenerte es el mayor regalo que he recibido.",
        "Porque eres, en una sola palabra: todo.",
        "Porque tienes una forma de hacerme sentir que el amor es la verdad más bonita.",
        "Porque me haces querer darte mi mejor versión cada día sin excepción.",
        "Porque eres la razón más grande y más sincera de mi corazón.",
        "Porque tienes una manera de ser completamente tuya que adoro profundamente.",
        "Porque me haces sentir que el amor que existe entre nosotros es eterno.",
        "Porque eres mi vida, mi amor, mi todo, mi Isela.",

    "Porque cuando no estás, el silencio me recuerda que te extraño.",
    "Porque tienes la capacidad de hacerme sentir en casa sin importar dónde estemos.",
    "Porque me haces querer apagar el mundo entero y quedarme solo contigo.",
    "Porque eres la persona con quien quiero compartir cada pequeño logro.",
    "Porque tienes una manera de querer que lo hace todo más bello.",
    "Porque me haces sentir que el amor es el idioma que compartimos.",
    "Porque eres la razón por la que cada viernes es especial.",
    "Porque tienes algo en ti que me hace bien sin que yo lo pida.",
    "Porque me haces querer darte cada segundo de atención que mereces.",
    "Porque eres la persona que más admiro en el mundo.",
    "Porque tienes una forma de caminar que me roba la mirada siempre.",
    "Porque me haces sentir que soy mejor cuando estoy contigo.",
    "Porque eres la razón por la que el amor tiene un rostro concreto para mí.",
    "Porque tienes una manera de pronunciar mi nombre que me derrite por dentro.",
    "Porque me haces querer que el mundo entero sepa que te amo.",
    "Porque eres la definición más bonita de lo que significa alguien especial.",
    "Porque tienes una forma de cuidarme que me hace sentir el hombre más querido.",
    "Porque me haces sentir que el amor puede con todo.",
    "Porque eres la razón por la que creer en el amor tiene sentido.",
    "Porque tienes una ternura que me desarmó desde el primer momento.",
    "Porque me haces querer prometerte cosas que sé que cumpliré.",
    "Porque eres el tipo de persona que ilumina cualquier habitación con solo entrar.",
    "Porque tienes una energía que me recarga cuando estoy vacío.",
    "Porque me haces sentir que el amor que siento por ti es una obra de arte.",
    "Porque eres la razón por la que el amor no me asusta sino me emociona.",
    "Porque tienes una forma de ver el mundo que me parece pura poesía.",
    "Porque me haces querer escribirte una canción que no termine nunca.",
    "Porque eres el motivo por el que sonrío cuando estoy pensando en ti.",
    "Porque tienes una paciencia que me hace ser menos impulsivo.",
    "Porque me haces sentir que el amor es la aventura más bonita de la vida.",
    "Porque eres la persona a quien le diría mis miedos más profundos.",
    "Porque tienes una manera de hacerme sentir que todo va a estar bien.",
    "Porque me haces querer que cada noche tenga el final que merece.",
    "Porque eres la razón por la que cada mañana tiene más brillo.",
    "Porque tienes una forma de estar que llena el espacio de calidez.",
    "Porque me haces sentir que el amor es un refugio y no una jaula.",
    "Porque eres la persona con quien quiero ver películas sin decir nada.",
    "Porque tienes una manera de reír que hace que el tiempo se sienta ligero.",
    "Porque me haces querer que el amor sea lo más sencillo del mundo.",
    "Porque eres la razón por la que las canciones románticas tienen sentido.",
    "Porque tienes una manera de hacer sentir a los demás que valen.",
    "Porque me haces sentir que soy tu prioridad y eso es lo más bonito.",
    "Porque eres la persona que me hace sentir menos solo en cualquier situación.",
    "Porque tienes una forma de existir que me hace agradecer el universo.",
    "Porque me haces querer que el amor sea eterno y verdadero como el que siento.",
    "Porque eres la razón más poderosa por la que quiero ser buena persona.",
    "Porque tienes una manera de ayudar a los demás que me llena el corazón.",
    "Porque me haces sentir que soy el hombre más amado del mundo.",
    "Porque eres la persona con quien quiero descubrir lugares nuevos.",
    "Porque tienes una curiosidad que hace que cada conversación sea interesante.",
    "Porque me haces querer que el tiempo nunca se acabe cuando estamos juntos.",
    "Porque eres la razón por la que creo que hay personas especiales en el mundo.",
    "Porque tienes una manera de ver los problemas que me da perspectiva.",
    "Porque me haces sentir que el amor que tenemos merece ser celebrado.",
    "Porque eres la persona que me hace sentir bien con solo estar cerca.",
    "Porque tienes una forma de despedirte que me hace querer verte de nuevo.",
    "Porque me haces querer que cada despedida sea temporal.",
    "Porque eres la razón por la que la distancia se siente tan dolorosa.",
    "Porque tienes una manera de extrañarme que me hace querer estar siempre cerca.",
    "Porque me haces sentir que el amor puede sobrevivir cualquier distancia.",
    "Porque eres la persona con quien quiero planear el futuro.",
    "Porque tienes una forma de soñar que me parece inspiradora.",
    "Porque me haces querer que nuestros sueños se conviertan en uno solo.",
    "Porque eres la razón por la que el futuro me parece emocionante.",
    "Porque tienes una manera de ver el futuro que me llena de esperanza.",
    "Porque me haces sentir que el amor es el plan más bonito que existe.",
    "Porque eres la persona con quien quiero construir algo que dure para siempre.",
    "Porque tienes una forma de comprometerte que me hace confiar en todo.",
    "Porque me haces querer ser el hombre que tú describes cuando hablas de mí.",
    "Porque eres la razón por la que el compromiso me parece un regalo.",
    "Porque tienes una manera de apoyarme que me hace sentir invencible.",
    "Porque me haces sentir que juntos podemos con todo.",
    "Porque eres la persona que me hace sentir que valgo mucho.",
    "Porque tienes una forma de hacerme sentir que cada esfuerzo vale la pena.",
    "Porque me haces querer que el amor sea la base de todo lo que construimos.",
    "Porque eres la razón por la que el amor se siente como el hogar más cálido.",
    "Porque tienes una manera de hacer sentir amada a la gente que la rodea.",
    "Porque me haces sentir que el amor que me das es el más puro que existe.",
    "Porque eres la persona con quien quiero bailar aunque no sepa hacerlo.",
    "Porque tienes una manera de bailar que me parece completamente tuya.",
    "Porque me haces querer que cada momento sea una pequeña celebración.",
    "Porque eres la razón por la que el amor tiene sabor a algo dulce.",
    "Porque tienes una manera de hacer que hasta los lunes sean mejores.",
    "Porque me haces sentir que el amor que sentimos es algo que merece preservarse.",
    "Porque eres la persona que me hace querer cuidar lo que tenemos.",
    "Porque tienes una forma de agradecer las cosas pequeñas que me encanta.",
    "Porque me haces querer darte lo mejor que existe y lo que aún no existe.",
    "Porque eres la razón por la que el amor tiene dimensiones que no conocía.",
    "Porque tienes una manera de hacer que cada detalle cuente.",
    "Porque me haces sentir que el amor puede ser cada día más profundo.",
    "Porque eres la persona con quien quiero envejecer de la mano.",
    "Porque tienes una manera de amar que no desgasta sino que construye.",
    "Porque me haces querer que el amor sea el eje de todo lo que soy.",
    "Porque eres la razón por la que el amor no es solo sentimiento sino decisión.",
    "Porque tienes una manera de hacerme elegirte todos los días.",
    "Porque me haces sentir que elegirte es lo más fácil y lo más seguro.",
    "Porque eres la persona que elegiría en cada amanecer que me regale la vida.",
    "Porque tienes una forma de hacer que cada día sea una razón más para amarte.",
    "Porque me haces querer que el amor sea más grande que el tiempo.",
    "Porque eres la razón por la que el amor tiene el significado más hermoso.",
    "Porque tienes una manera de existir que me hace querer existir también.",
    "Porque me haces sentir que la vida es mucho más bonita contigo en ella.",
    "Porque eres la persona más importante que ha llegado a mi vida.",
    "Porque me haces querer que este amor sea el más bonito de todos los que existen.",
    "Porque eres la razón por la que el amor siempre vale la pena.",
    "Porque tienes una manera de hacerme sentir que te querer es lo más natural.",
    "Porque me haces sentir que el amor que tenemos es suficiente para todo.",
    "Porque eres la persona con quien quiero reírme de las cosas pequeñas.",
    "Porque tienes una forma de ver el humor que me parece refrescante.",
    "Porque me haces querer que la risa sea parte esencial de nosotros.",
    "Porque eres la razón por la que la risa tiene el mejor sonido cuando viene de ti.",
    "Porque tienes una manera de tomar las cosas con calma que me enseña a hacerlo.",
    "Porque me haces sentir que el amor puede ser ligero y profundo al mismo tiempo.",
    "Porque eres la persona con quien quiero compartir el silencio y la conversación.",
    "Porque tienes una manera de escuchar que hace que quiera contarte todo.",
    "Porque me haces querer que nuestra comunicación sea siempre honesta y profunda.",
    "Porque eres la razón por la que la comunicación tiene el poder de conectar almas.",
    "Porque tienes una manera de hablar que hace que cada palabra sea importante.",
    "Porque me haces sentir que lo que digo importa cuando te lo digo a ti.",
    "Porque eres la persona cuya opinión más valoro en el mundo.",
    "Porque tienes una manera de dar consejos que me hace querer seguirlos.",
    "Porque me haces querer que el amor sea también amistad profunda.",
    "Porque eres la razón por la que el amor y la amistad pueden coexistir.",
    "Porque tienes una manera de ser mi mejor amigo mientras eres mi amor.",
    "Porque me haces sentir que el amor puede ser todo lo que necesito.",
    "Porque eres la persona con quien quiero compartir los triunfos y los fracasos.",
    "Porque tienes una manera de estar en las malas que me hace querer tenerte en las buenas.",
    "Porque me haces querer que el amor sea incondicional de verdad.",
    "Porque eres la razón por la que el amor incondicional tiene un nombre: Isela.",
    "Porque tienes una manera de amar sin condiciones que me parece increíble.",
    "Porque me haces sentir que el amor puede existir sin miedos.",
    "Porque eres la persona con quien quiero ser completamente vulnerable.",
    "Porque tienes una manera de hacer que la vulnerabilidad sea algo seguro.",
    "Porque me haces querer que el amor sea el espacio más seguro del mundo.",
    "Porque eres la razón por la que confiar se siente natural.",
    "Porque tienes una manera de ganarte la confianza que me parece hermosa.",
    "Porque me haces sentir que el amor puede convivir con la honestidad total.",
    "Porque eres la persona con quien quiero ser completamente yo mismo.",
    "Porque tienes una manera de aceptarme tal como soy que me libera.",
    "Porque me haces querer que el amor sea aceptación sin reservas.",
    "Porque eres la razón por la que el amor no necesita máscaras.",
    "Porque tienes una manera de hacerme sentir que soy suficiente tal como estoy.",
    "Porque me haces sentir que el amor que sientes por mí es genuino.",
    "Porque eres la persona con quien quiero ser honesto hasta en lo que duele.",
    "Porque tienes una manera de recibir la verdad con madurez que admiro.",
    "Porque me haces querer que el amor sea honesto aunque cueste.",
    "Porque eres la razón por la que la honestidad en el amor tiene sentido.",
    "Porque tienes una manera de decirme las cosas que me hace querer mejorar.",
    "Porque me haces sentir que el amor que compartimos puede crecer siempre.",
    "Porque eres la persona con quien quiero crecer como ser humano.",
    "Porque tienes una manera de crecer que me inspira a hacerlo también.",
    "Porque me haces querer que el amor sea también crecimiento compartido.",
    "Porque eres la razón por la que el amor puede ser transformador.",
    "Porque tienes una manera de transformarme que no duele sino que eleva.",
    "Porque me haces sentir que el amor puede elevarme a mi mejor versión.",
    "Porque eres la persona con quien quiero ser la mejor versión que pueda ser.",
    "Porque tienes una manera de sacar lo mejor de mí sin esforzarte.",
    "Porque me haces querer que el amor sea también inspiración mutua.",
    "Porque eres la razón por la que el amor tiene el poder de cambiar todo.",
    "Porque tienes una manera de cambiar las cosas para bien sin darte cuenta.",
    "Porque me haces sentir que el amor que tienes puede cambiar el mundo.",
    "Porque eres la persona con quien quiero cambiar el mundo aunque sea pequeño.",
    "Porque tienes una manera de hacer que las cosas ordinarias sean extraordinarias.",
    "Porque me haces querer que el amor sea magia en lo cotidiano.",
    "Porque eres la razón por la que lo cotidiano se siente especial.",
    "Porque tienes una manera de vivir el presente que me enseña a estar aquí.",
    "Porque me haces sentir que el amor es también mindfulness y presencia.",
    "Porque eres la persona con quien quiero estar completamente presente.",
    "Porque tienes una manera de estar que hace que quiera estar también.",
    "Porque me haces querer que el amor sea presencia plena.",
    "Porque eres la razón por la que el presente es el mejor lugar para estar.",
    "Porque tienes una manera de hacer que el aquí y el ahora sean suficientes.",
    "Porque me haces sentir que el amor es la experiencia más completa que existe.",
    "Porque eres la persona con quien quiero vivir cada experiencia nueva.",
    "Porque tienes una manera de vivir que me parece completamente apasionante.",
    "Porque me haces querer que el amor sea también aventura compartida.",
    "Porque eres la razón por la que la aventura tiene mejor sabor cuando es contigo.",
    "Porque tienes una manera de enfrentar lo nuevo que me contagia su valentía.",
    "Porque me haces sentir que el amor puede sobrevivir cualquier aventura.",
    "Porque eres la persona con quien quiero explorar el mundo entero.",
    "Porque tienes una manera de explorar que me parece fascinante.",
    "Porque me haces querer que el amor sea también exploración sin límites.",
    "Porque eres la razón por la que explorar contigo es la mejor opción.",
    "Porque tienes una manera de descubrir cosas que me hace querer descubrirlas contigo.",
    "Porque me haces sentir que el amor es también curiosidad compartida.",
    "Porque eres la persona con quien quiero descubrir todo lo que nos falta por ver.",
    "Porque tienes una manera de ver las cosas que hace que todo sea más interesante.",
    "Porque me haces querer que el amor sea también asombro constante.",
    "Porque eres la razón por la que el asombro tiene un nombre hermoso.",
    "Porque tienes una manera de asombrarte que me recuerda que el mundo es bonito.",
    "Porque me haces sentir que el amor puede convivir con la maravilla.",
    "Porque eres la persona con quien quiero maravillarme de las cosas simples.",
    "Porque tienes una manera de apreciar lo simple que me parece profunda.",
    "Porque me haces querer que el amor sea también apreciación de lo pequeño.",
    "Porque eres la razón por la que lo pequeño tiene tanta importancia.",
    "Porque tienes una manera de hacer que cada pequeño gesto cuente mucho.",
    "Porque me haces sentir que el amor vive en los detalles.",
    "Porque eres la persona con quien quiero compartir cada pequeño detalle.",
    "Porque tienes una manera de notar los detalles que me parece mágica.",
    "Porque me haces querer que el amor sea también atención a los detalles.",
    "Porque eres la razón por la que los detalles tienen el mayor valor.",
    "Porque tienes una manera de hacer sentir especial a alguien con un detalle.",
    "Porque me haces sentir que el amor puede comunicarse sin palabras.",
    "Porque eres la persona con quien quiero comunicarme también en silencio.",
    "Porque tienes una manera de estar en silencio que me habla más que cualquier discurso.",
    "Porque me haces querer que el amor sea también comunicación silenciosa.",
    "Porque eres la razón por la que el silencio puede ser el más bonito de los idiomas.",
    "Porque tienes una manera de llenar el silencio de significado.",
    "Porque me haces sentir que el amor puede existir en la quietud.",
    "Porque eres la persona con quien quiero quedarme quieto y estar bien.",
    "Porque tienes una manera de hacer que la quietud sea reconfortante.",
    "Porque me haces querer que el amor sea también descanso del mundo.",
    "Porque eres la razón por la que el descanso tiene mejor sabor a tu lado.",
    "Porque tienes una manera de descansar que me hace querer cuidarte.",
    "Porque me haces sentir que el amor puede ser también protección suave.",
    "Porque eres la persona con quien quiero protegerme del mundo exterior.",
    "Porque tienes una manera de crear un mundo propio que me parece maravillosa.",
    "Porque me haces querer que el amor sea nuestro propio universo.",
    "Porque eres la razón por la que quiero crear un mundo solo para los dos.",
    "Porque tienes una manera de hacer que todo lo externo desaparezca.",
    "Porque me haces sentir que el amor puede ser también evasión del ruido.",
    "Porque eres la persona con quien quiero escaparme de todo lo que agobia.",
    "Porque tienes una manera de hacer que el escape sea también llegada.",
    "Porque me haces querer que el amor sea también mi mejor escape.",
    "Porque eres la razón por la que escaparse contigo es llegar al mejor lugar.",
    "Porque tienes una manera de hacerme llegar a donde quiero estar.",
    "Porque me haces sentir que el amor es el destino más bonito.",
    "Porque eres la persona con quien quiero llegar a cada destino.",
    "Porque tienes una manera de hacer que los viajes sean más bonitos.",
    "Porque me haces querer que el amor sea también viaje eterno.",
    "Porque eres la razón por la que viajar contigo es la mejor ruta.",
    "Porque tienes una manera de disfrutar los viajes que me contagia.",
    "Porque me haces sentir que el amor puede existir en cada kilómetro.",
    "Porque eres la persona con quien quiero recorrer cada camino posible.",
    "Porque tienes una manera de caminar por la vida que me parece hermosa.",
    "Porque me haces querer que el amor sea también compañía en cada camino.",
    "Porque eres la razón por la que el camino tiene mejor nombre cuando es contigo.",
    "Porque tienes una manera de acompañar que hace que el camino sea más ligero.",
    "Porque me haces sentir que el amor es también el mejor compañero de viaje.",
    "Porque eres la persona con quien quiero caminar sin miedo al destino.",
    "Porque tienes una manera de hacerme perder el miedo al futuro.",
    "Porque me haces querer que el amor sea también valentía compartida.",
    "Porque eres la razón por la que el futuro ya no me asusta.",
    "Porque tienes una manera de hacerme sentir que el futuro es nuestro.",
    "Porque me haces sentir que el amor puede conquistar cada mañana.",
    "Porque eres la persona con quien quiero conquistar cada nuevo día.",
    "Porque tienes una manera de enfrentar cada día que me parece admirable.",
    "Porque me haces querer que el amor sea también motivación diaria.",
    "Porque eres la razón por la que cada día nuevo es una oportunidad.",
    "Porque tienes una manera de ver cada día como un regalo.",
    "Porque me haces sentir que el amor puede hacer que cada día valga.",
    "Porque eres la persona con quien quiero que cada día valga la pena.",
    "Porque tienes una manera de hacer que el día a día sea especial.",
    "Porque me haces querer que el amor sea el sabor del día a día.",
    "Porque eres la razón por la que el día a día tiene el mejor sabor.",
    "Porque tienes una manera de hacer que lo rutinario sea agradable.",
    "Porque me haces sentir que el amor puede sobrevivir la rutina y fortalecerse.",
    "Porque eres la persona con quien quiero que la rutina sea también conexión.",
    "Porque tienes una manera de convertir la rutina en ritual bonito.",
    "Porque me haces querer que el amor sea también el mejor de los rituales.",
    "Porque eres la razón por la que los rituales tienen más significado.",
    "Porque tienes una manera de crear tradiciones que me parecen entrañables.",
    "Porque me haces sentir que el amor puede tener sus propias tradiciones.",
    "Porque eres la persona con quien quiero crear nuestras propias tradiciones.",
    "Porque tienes una manera de hacer que las tradiciones unan más.",
    "Porque me haces querer que el amor sea también historia compartida.",
    "Porque eres la razón por la que la historia que estamos escribiendo es la más bonita.",
    "Porque tienes una manera de hacer historia sin darte cuenta.",
    "Porque me haces sentir que el amor puede escribirse en cada momento.",
    "Porque eres la persona con quien quiero escribir la historia más bonita.",
    "Porque tienes una manera de darle sentido a cada capítulo de la historia.",
    "Porque me haces querer que el amor sea también nuestra historia de vida.",
    "Porque eres la razón por la que cada capítulo de mi vida tiene más sentido.",
    "Porque tienes una manera de darle significado a cada etapa.",
    "Porque me haces sentir que el amor puede hacer que cada etapa valga.",
    "Porque eres la persona con quien quiero vivir cada etapa sin miedo.",
    "Porque tienes una manera de transitar las etapas con gracia.",
    "Porque me haces querer que el amor sea también la guía en cada etapa.",
    "Porque eres la razón por la que las etapas tienen mejor color contigo.",
    "Porque tienes una manera de darle color a todo lo que tocas.",
    "Porque me haces sentir que el amor puede colorear el mundo entero.",
    "Porque eres la persona con quien quiero que el mundo tenga más color.",
    "Porque tienes una manera de ver los colores que me parece artística.",
    "Porque me haces querer que el amor sea también arte que se puede ver.",
    "Porque eres la razón por la que el arte tiene el más bonito de los sentidos.",
    "Porque tienes una manera de apreciar la belleza que me conmueve.",
    "Porque me haces sentir que el amor puede ser también contemplación de lo bello.",
    "Porque eres la persona con quien quiero contemplar lo bello del mundo.",
    "Porque tienes una manera de encontrar belleza donde otros no la ven.",
    "Porque me haces querer que el amor sea también búsqueda de la belleza.",
    "Porque eres la razón por la que la belleza tiene el mejor nombre cuando es el tuyo.",
    "Porque tienes una manera de ser bella que trasciende lo físico.",
    "Porque me haces sentir que el amor puede apreciar la belleza del alma.",
    "Porque eres la persona con quien quiero apreciar cada forma de belleza.",
    "Porque tienes una manera de hacer que la belleza interna brille.",
    "Porque me haces querer que el amor sea también valoración del interior.",
    "Porque eres la razón por la que el interior tiene más valor que cualquier exterior.",
    "Porque tienes una manera de hacer que lo interior se sienta en el exterior.",
    "Porque me haces sentir que el amor puede ver más allá de lo que se muestra.",
    "Porque eres la persona con quien quiero ir más allá de las apariencias.",
    "Porque tienes una manera de profundizar que me parece valiente.",
    "Porque me haces querer que el amor sea también profundidad sin miedo.",
    "Porque eres la razón por la que la profundidad tiene el mejor de los sabores.",
    "Porque tienes una manera de hacer que las conversaciones profundas sean seguras.",
    "Porque me haces sentir que el amor puede existir en las conversaciones profundas.",
    "Porque eres la persona con quien quiero tener las conversaciones más importantes.",
    "Porque tienes una manera de hacer que hablar contigo sea indispensable.",
    "Porque me haces querer que el amor sea también diálogo profundo y constante.",
    "Porque eres la razón por la que el diálogo tiene el poder más transformador.",
    "Porque tienes una manera de transformar cada conversación en algo significativo.",
    "Porque me haces sentir que el amor puede vivir en cada conversación.",
    "Porque eres la persona con quien quiero tener mil conversaciones más.",
    "Porque tienes una manera de hacer que cada conversación sea la más importante.",
    "Porque me haces querer que el amor sea también conexión intelectual.",
    "Porque eres la razón por la que la conexión intelectual es también romántica.",
    "Porque tienes una inteligencia que me resulta absolutamente atractiva.",
    "Porque me haces sentir que el amor puede ser también encuentro de mentes.",
    "Porque eres la persona con quien quiero discutir ideas y soñar juntos.",
    "Porque tienes una manera de pensar que me mantiene en constante admiración.",
    "Porque me haces querer que el amor sea también admiración mutua.",
    "Porque eres la razón por la que la admiración puede ser también enamoramiento.",
    "Porque tienes una manera de hacer que admirarte sea también quererte más.",
    "Porque me haces sentir que el amor puede crecer con la admiración.",
    "Porque eres la persona con quien quiero que la admiración sea parte del amor.",
    "Porque tienes una manera de hacerse admirable sin buscarlo.",
    "Porque me haces querer que el amor sea también respeto profundo.",
    "Porque eres la razón por la que el respeto tiene el mejor sabor en el amor.",
    "Porque tienes una manera de ganarse el respeto de todos sin imponerlo.",
    "Porque me haces sentir que el amor puede convivir con el respeto absoluto.",
    "Porque eres la persona con quien quiero que el respeto sea la base.",
    "Porque tienes una manera de tratar a los demás que habla de tu grandeza.",
    "Porque me haces querer que el amor sea también ejemplo de cómo tratar a otros.",
    "Porque eres la razón por la que el amor tiene una dimensión ética.",
    "Porque tienes una manera de vivir con valores que me parece admirable.",
    "Porque me haces sentir que el amor puede tener principios sin perder su magia.",
    "Porque eres la persona con quien quiero que los valores sean compartidos.",
    "Porque tienes una manera de vivir que está en coherencia con lo que piensas.",
    "Porque me haces querer que el amor sea también coherencia entre lo que digo y hago.",
    "Porque eres la razón por la que la coherencia es también una forma de amor.",
    "Porque tienes una manera de ser coherente que me parece hermosa.",
    "Porque me haces sentir que el amor puede ser también autenticidad plena.",
    "Porque eres la persona con quien quiero ser completamente auténtico.",
    "Porque tienes una manera de hacer que la autenticidad sea cómoda.",
    "Porque me haces querer que el amor sea también espacio para ser real.",
    "Porque eres la razón por la que ser real contigo es lo más cómodo del mundo.",
    "Porque tienes una manera de hacer que ser yo mismo sea lo más natural.",
    "Porque me haces sentir que el amor puede hacer que uno se sienta libre.",
    "Porque eres la persona con quien quiero sentirme libre de ser quien soy.",
    "Porque tienes una manera de hacer que la libertad y el amor coexistan.",
    "Porque me haces querer que el amor sea también libertad y no posesión.",
    "Porque eres la razón por la que el amor puede ser libre y profundo a la vez.",
    "Porque tienes una manera de amar que no encadena sino que libera.",
    "Porque me haces sentir que el amor puede hacer que uno sea más libre.",
    "Porque eres la persona con quien quiero ser libre y también elegirte.",
    "Porque tienes una manera de hacer que elegirte sea la mejor de las libertades.",
    "Porque me haces querer que el amor sea también elección consciente.",
    "Porque eres la razón por la que elegir amar tiene el mejor significado.",
    "Porque tienes una manera de hacer que elegirte sea lo más sabio.",
    "Porque me haces sentir que el amor puede ser una decisión y también una emoción.",
    "Porque eres la persona con quien quiero que tanto la razón como el corazón digan que sí.",
    "Porque tienes una manera de hacer que corazón y mente estén de acuerdo.",
    "Porque me haces querer que el amor sea también racionalidad y sentimiento.",
    "Porque eres la razón por la que el amor puede tener tanto cabeza como corazón.",
    "Porque tienes una manera de hacer que lo emocional y lo racional convivan.",
    "Porque me haces sentir que el amor puede ser completo en todos sus aspectos.",
    "Porque eres la persona con quien quiero que el amor sea pleno.",
    "Porque tienes una manera de hacer que el amor sea pleno sin necesitar ser perfecto.",
    "Porque me haces querer que el amor sea también aceptación de la imperfección.",
    "Porque eres la razón por la que la imperfección tiene belleza en el amor.",
    "Porque tienes una manera de hacer que las imperfecciones sean parte del encanto.",
    "Porque me haces sentir que el amor puede querer incluso lo que no es perfecto.",
    "Porque eres la persona con quien quiero que las imperfecciones nos unan.",
    "Porque tienes una manera de hacer que lo imperfecto se sienta correcto.",
    "Porque me haces querer que el amor sea también abrazar lo que no está terminado.",
    "Porque eres la razón por la que lo inacabado puede tener también mucho valor.",
    "Porque tienes una manera de ver el potencial donde otros ven lo incompleto.",
    "Porque me haces sentir que el amor puede ver el potencial en todo.",
    "Porque eres la persona con quien quiero que el potencial sea también compartido.",
    "Porque tienes una manera de hacer que el potencial de los dos sea mayor.",
    "Porque me haces querer que el amor sea también multiplicador de lo bueno.",
    "Porque eres la razón por la que junto a ti, todo se multiplica.",
    "Porque tienes una manera de hacer que el uno más uno sea más que dos.",
    "Porque me haces sentir que el amor puede crear algo mayor que las partes.",
    "Porque eres la persona con quien quiero crear algo que ninguno podría solo.",
    "Porque tienes una manera de hacer que la creación compartida sea mejor.",
    "Porque me haces querer que el amor sea también creatividad compartida.",
    "Porque eres la razón por la que la creatividad tiene mejor resultado cuando es contigo.",
    "Porque tienes una creatividad que me inspira y me llena.",
    "Porque me haces sentir que el amor puede ser también fuente de creatividad.",
    "Porque eres la persona con quien quiero crear las cosas más bonitas.",
    "Porque tienes una manera de crear que me parece completamente única.",
    "Porque me haces querer que el amor sea también la mayor de las creaciones.",
    "Porque eres la razón por la que el amor en sí mismo es ya una obra de arte.",
    "Porque tienes una manera de hacer que el amor sea también arte de vivir.",
    "Porque me haces sentir que el amor puede ser también una filosofía de vida.",
    "Porque eres la persona con quien quiero que el amor sea el centro de todo.",
    "Porque tienes una manera de hacer que el amor sea lo más importante.",
    "Porque me haces querer que el amor sea la prioridad más grande.",
    "Porque eres la razón por la que el amor tiene la más alta de las prioridades.",
    "Porque tienes una manera de priorizar lo que realmente importa.",
    "Porque me haces sentir que el amor puede convivir con todas las prioridades.",
    "Porque eres la persona con quien quiero que el amor sea compatible con todo.",
    "Porque tienes una manera de hacer que el amor y la vida encajen.",
    "Porque me haces querer que el amor sea también orden en el caos.",
    "Porque eres la razón por la que el caos tiene sentido cuando estás tú.",
    "Porque tienes una manera de encontrar orden en el caos que me asombra.",
    "Porque me haces sentir que el amor puede sobrevivir cualquier caos.",
    "Porque eres la persona con quien quiero enfrentar cada caos.",
    "Porque tienes una manera de hacer que el caos se sienta menos aterrador.",
    "Porque me haces querer que el amor sea también ecuanimidad.",
    "Porque eres la razón por la que la ecuanimidad tiene el mejor de los valores.",
    "Porque tienes una manera de mantener la calma que me inspira.",
    "Porque me haces sentir que el amor puede existir en la calma y en la tormenta.",
    "Porque eres la persona con quien quiero que el amor sea también calma profunda.",
    "Porque tienes una manera de ser calma en el medio de cualquier tormenta.",
    "Porque me haces querer que el amor sea también mi ancla en cualquier tormenta.",
    "Porque eres la razón por la que el ancla más firme tiene tu nombre.",
    "Porque tienes una manera de anclarte que hace que todo se sienta más estable.",
    "Porque me haces sentir que el amor puede ser también estabilidad.",
    "Porque eres la persona con quien quiero que el amor sea también cimiento firme.",
    "Porque tienes una manera de ser el cimiento sin perder tu ligereza.",
    "Porque me haces querer que el amor sea sólido y también liviano.",
    "Porque eres la razón por la que el amor puede ser todo lo que necesito.",
    "Porque tienes una manera de completar lo que me falta sin quitarme nada.",
    "Porque me haces sentir que el amor puede complementar sin absorber.",
    "Porque eres la persona con quien quiero que el amor sea complemento perfecto.",
    "Porque tienes una manera de complementarme que se siente natural.",
    "Porque me haces querer que el amor sea también la pieza que completa.",
    "Porque eres la razón por la que siento que estaba incompleto antes de conocerte.",
    "Porque tienes una manera de completar que no es invasiva sino liberadora.",
    "Porque me haces sentir que el amor puede completarme y también liberarme.",
    "Porque eres la persona con quien quiero sentirme completo y libre al mismo tiempo.",
    "Porque tienes una manera de hacer coexistir la completitud y la libertad.",
    "Porque me haces querer que el amor sea el estado más completo de la existencia.",
    "Porque eres la razón por la que existir tiene el más bonito de los propósitos.",
    "Porque tienes una manera de darle propósito a la existencia.",
    "Porque me haces sentir que el amor puede ser el propósito más grande.",
    "Porque eres la persona con quien quiero que el propósito sea compartido.",
    "Porque tienes una manera de hacer que el propósito compartido sea más poderoso.",
    "Porque me haces querer que el amor sea también misión compartida.",
    "Porque eres la razón por la que la misión tiene mejor nombre cuando es juntos.",
    "Porque tienes una manera de hacer que juntos sea la palabra más poderosa.",
    "Porque me haces sentir que el amor puede ser también el poder más grande.",
    "Porque eres la persona con quien quiero ejercer el poder del amor.",
    "Porque tienes una manera de hacer que el amor sea la fuerza motriz.",
    "Porque me haces querer que el amor sea también el motor de cada acción.",
    "Porque eres la razón por la que el amor tiene el mejor de los motores.",
    "Porque tienes una manera de motivar que nace del amor genuino.",
    "Porque me haces sentir que el amor puede motivar más que cualquier otra cosa.",
    "Porque eres la persona con quien quiero que el amor sea la mayor motivación.",
    "Porque tienes una manera de hacer que la motivación sea también amor.",
    "Porque me haces querer que el amor sea también el combustible de mis sueños.",
    "Porque eres la razón por la que mis sueños tienen más sentido.",
    "Porque tienes una manera de hacer que los sueños ajenos también importen.",
    "Porque me haces sentir que el amor puede hacer que los sueños del otro sean míos.",
    "Porque eres la persona con quien quiero que los sueños sean también compartidos.",
    "Porque tienes una manera de hacer que los sueños compartidos sean más alcanzables.",
    "Porque me haces querer que el amor sea también sueños que se hacen realidad.",
    "Porque eres la razón por la que los sueños tienen el más bonito de los horizontes.",
    "Porque tienes una manera de ver el horizonte que hace que quiera llegarlo.",
    "Porque me haces sentir que el amor puede alcanzar cualquier horizonte.",
    "Porque eres la persona con quien quiero alcanzar cada horizonte nuevo.",
    "Porque tienes una manera de hacer que el horizonte siempre valga la pena.",
    "Porque me haces querer que el amor sea también conquista de horizontes.",
    "Porque eres la razón por la que el horizonte tiene el mejor de los colores.",
    "Porque tienes una manera de colorear el horizonte que me deja sin palabras.",
    "Porque me haces sentir que el amor puede pintar el horizonte de los colores más bonitos.",
    "Porque eres la persona con quien quiero que el horizonte sea siempre prometedor.",
    "Porque tienes una manera de hacer que cada horizonte sea también esperanza.",
    "Porque me haces querer que el amor sea también esperanza que no se agota.",
    "Porque eres la razón por la que la esperanza tiene el nombre más bonito.",
    "Porque tienes una manera de hacer que la esperanza sea también realidad.",
    "Porque me haces sentir que el amor puede convertir la esperanza en certeza.",
    "Porque eres la persona con quien quiero que la esperanza se convierta en todo.",
    "Porque tienes una manera de hacer que lo que se espera llegue.",
    "Porque me haces querer que el amor sea también la certeza más profunda.",
    "Porque eres la razón por la que la certeza tiene el nombre más seguro.",
    "Porque tienes una manera de dar certeza que me hace sentir en tierra firme.",
    "Porque me haces sentir que el amor puede ser también tierra firme.",
    "Porque eres la persona con quien quiero estar siempre en tierra firme.",
    "Porque tienes una manera de hacer que el terreno sea siempre seguro.",
    "Porque me haces querer que el amor sea también seguridad sin jaulas.",
    "Porque eres la razón por la que la seguridad tiene el mejor de los sabores.",
    "Porque tienes una manera de hacer que la seguridad y la aventura convivan.",
    "Porque me haces sentir que el amor puede ser seguro y emocionante a la vez.",
    "Porque eres la persona con quien quiero que el amor sea siempre las dos cosas.",
    "Porque tienes una manera de hacer que el amor tenga muchas dimensiones.",
    "Porque me haces querer que el amor sea rico en cada una de sus dimensiones.",
    "Porque eres la razón por la que el amor tiene la dimensión más hermosa.",
    "Porque tienes una manera de darle dimensión al amor que lo hace infinito.",
    "Porque me haces sentir que el amor puede ser también infinito.",
    "Porque eres la persona con quien quiero que el amor no tenga límites.",
    "Porque tienes una manera de amar que no conoce fronteras.",
    "Porque me haces querer que el amor sea más grande que cualquier frontera.",
    "Porque eres la razón por la que el amor puede traspasar cualquier límite.",
    "Porque tienes una manera de trascender los límites sin esfuerzo.",
    "Porque me haces sentir que el amor puede ir más allá de lo que se puede imaginar.",
    "Porque eres la persona con quien quiero ir más allá de lo imaginado.",
    "Porque tienes una manera de imaginar que va más allá de la realidad.",
    "Porque me haces querer que el amor sea también imaginación sin techo.",
    "Porque eres la razón por la que la imaginación tiene el mejor de los vuelos.",
    "Porque tienes una manera de volar que me hace querer seguirte.",
    "Porque me haces sentir que el amor puede volar sin miedo a las alturas.",
    "Porque eres la persona con quien quiero volar sin miedo.",
    "Porque tienes una manera de hacer que las alturas no den vértigo.",
    "Porque me haces querer que el amor sea también valentía para las alturas.",
    "Porque eres la razón por la que las alturas tienen el mejor de los paisajes.",
    "Porque tienes una manera de ver los paisajes que me parece poética.",
    "Porque me haces sentir que el amor puede ser también poesía vivida.",
    "Porque eres la persona con quien quiero vivir la poesía más bonita.",
    "Porque tienes una manera de hacer que la vida sea también poesía.",
    "Porque me haces querer que el amor sea también el poema más bonito.",
    "Porque eres la razón por la que el poema tiene el mejor de los temas.",
    "Porque tienes una manera de inspirar que hace que los poemas nazcan solos.",
    "Porque me haces sentir que el amor puede inspirar la creación más bonita.",
    "Porque eres la persona con quien quiero que cada creación esté inspirada en ti.",
    "Porque tienes una manera de ser musa sin siquiera intentarlo.",
    "Porque me haces querer que el amor sea también mi mayor inspiración.",
    "Porque eres la razón por la que la inspiración tiene el nombre más bonito.",
    "Porque tienes una manera de hacer que la inspiración llegue solo con estar.",
    "Porque me haces sentir que el amor puede ser también el estado creativo más puro.",
    "Porque eres la persona con quien quiero crear desde el amor.",
    "Porque tienes una manera de hacer que crear sea también amar.",
    "Porque me haces querer que el amor sea también el acto más creativo.",
    "Porque eres la razón por la que el acto de amar tiene el mayor de los poderes.",
    "Porque tienes una manera de hacer que el amor sea poderoso y suave al mismo tiempo.",
    "Porque me haces sentir que el amor puede ser suave y también poderoso.",
    "Porque eres la persona con quien quiero que el amor sea mi mayor fortaleza.",
    "Porque tienes una manera de hacerme sentir fuerte desde el amor.",
    "Porque me haces querer que el amor sea también mi mayor escudo.",
    "Porque eres la razón por la que el escudo más fuerte tiene tu nombre.",
    "Porque tienes una manera de proteger que nace del amor más puro.",
    "Porque me haces sentir que el amor puede ser también protección recíproca.",
    "Porque eres la persona con quien quiero que el amor sea también cuidado mutuo.",
    "Porque tienes una manera de cuidar que hace que todo florezca.",
    "Porque me haces querer que el amor sea también cuidado que hace florecer.",
    "Porque eres la razón por la que el florecimiento tiene el mejor de los nutrientes.",
    "Porque tienes una manera de nutrir el amor que lo hace crecer siempre.",
    "Porque me haces sentir que el amor puede crecer sin límite cuando se nutre bien.",
    "Porque eres la persona con quien quiero nutrir el amor cada día.",
    "Porque tienes una manera de hacer que el amor sea siempre fresco y nuevo.",
    "Porque me haces querer que el amor sea también renovación constante.",
    "Porque eres la razón por la que el amor se renueva cada vez que te veo.",
    "Porque tienes una manera de renovar el amor sin perder lo que ya construimos.",
    "Porque me haces sentir que el amor puede ser antiguo y nuevo al mismo tiempo.",
    "Porque eres la persona con quien quiero que el amor sea siempre antiguo y nuevo.",
    "Porque tienes una manera de hacer que lo antiguo no envejezca.",
    "Porque me haces querer que el amor sea también eterno en su frescura.",
    "Porque eres la razón por la que lo eterno tiene el mejor de los sabores.",
    "Porque tienes una manera de hacer que la eternidad se sienta en el presente.",
    "Porque me haces sentir que el amor puede traer la eternidad al ahora.",
    "Porque eres la persona con quien quiero vivir la eternidad en cada momento.",
    "Porque tienes una manera de hacer que cada momento sea eterno.",
    "Porque me haces querer que el amor sea también eternidad que se vive ahora.",
    "Porque eres la razón por la que el ahora tiene la dimensión de lo eterno.",
    "Porque tienes una manera de hacer que el presente contenga el futuro.",
    "Porque me haces sentir que el amor puede ser también presencia de lo eterno.",
    "Porque eres la persona con quien quiero que el amor sea lo más cercano a lo eterno.",
    "Porque tienes una manera de ser cercana a lo más profundo de todo.",
    "Porque me haces querer que el amor sea también lo más cercano a lo sagrado.",
    "Porque eres la razón por la que lo sagrado tiene el nombre más bonito.",
    "Porque tienes algo en ti que siento que va más allá de lo ordinario.",
    "Porque me haces sentir que el amor puede ser también lo más sublime.",
    "Porque eres la persona con quien quiero que el amor sea la experiencia más sublime.",
    "Porque tienes una manera de hacer que lo sublime sea también cotidiano.",
    "Porque me haces querer que el amor sea la experiencia más completa del alma.",
    "Porque eres la razón por la que el alma tiene el mejor de los motivos para amar.",
    "Porque tienes una manera de hablarle al alma sin usar palabras.",
    "Porque me haces sentir que el amor puede ser también encuentro de almas.",
    "Porque eres la persona con quien quiero que el amor sea también alma con alma.",
    "Porque tienes una manera de conectar almas que me parece única.",
    "Porque me haces querer que el amor sea también la conexión más profunda del ser.",
    "Porque eres la razón por la que el ser tiene el mejor de los propósitos.",
    "Porque tienes una manera de darle propósito al ser sin esfuerzo.",
    "Porque me haces sentir que el amor puede ser también la razón más profunda de ser.",
    "Porque eres la persona con quien quiero que el amor sea la razón de todo lo que soy.",
    "Porque tienes una manera de hacer que todo lo que soy tenga sentido en ti.",
    "Porque me haces querer que el amor sea también la respuesta a todas mis preguntas.",
    "Porque eres la razón por la que todas las preguntas tienen la misma respuesta: tú.",
    "Porque tienes una manera de responder que hace que todo quede claro.",
    "Porque me haces sentir que el amor puede ser también la claridad que necesito.",
    "Porque eres la persona con quien quiero que el amor sea también claridad y luz.",
    "Porque tienes una manera de iluminar que hace que todo sea más claro.",
    "Porque me haces querer que el amor sea también la luz más brillante.",
    "Porque eres la razón por la que la luz tiene el nombre más bonito.",
    "Porque tienes una manera de ser luz que ilumina sin cegar.",
    "Porque me haces sentir que el amor puede ser también iluminación.",
    "Porque eres la persona con quien quiero que el amor sea también mi mayor luz.",
    "Porque tienes una manera de hacer que la oscuridad no asuste cuando estás tú.",
    "Porque me haces querer que el amor sea también el faro en la oscuridad.",
    "Porque eres la razón por la que el faro tiene el nombre más bonito.",
    "Porque tienes una manera de ser faro que nunca se apaga.",
    "Porque me haces sentir que el amor puede ser también la guía más segura.",
    "Porque eres la persona con quien quiero que el amor sea también guía y norte.",
    "Porque tienes una manera de guiar que da libertad y no control.",
    "Porque me haces querer que el amor sea también la guía más libre.",
    "Porque eres la razón por la que la libertad guiada tiene el mejor de los nombres.",
    "Porque tienes una manera de hacer que la guía y la libertad coexistan.",
    "Porque me haces sentir que el amor puede ser también la brújula más confiable.",
    "Porque eres la persona con quien quiero que el amor sea mi brújula.",
    "Porque tienes una manera de ser brújula que señala siempre hacia lo bueno.",
    "Porque me haces querer que el amor sea también orientación en lo incierto.",
    "Porque eres la razón por la que lo incierto tiene menos miedo cuando estás tú.",
    "Porque tienes una manera de hacer que lo incierto se sienta navegable.",
    "Porque me haces sentir que el amor puede navegar cualquier incertidumbre.",
    "Porque eres la persona con quien quiero navegar cada incertidumbre.",
    "Porque tienes una manera de navegar que hace que el mar sea menos imponente.",
    "Porque me haces querer que el amor sea también la mejor de las navegaciones.",
    "Porque eres la razón por la que la navegación tiene el mejor de los destinos.",
    "Porque tienes una manera de llegar siempre al mejor puerto.",
    "Porque me haces sentir que el amor puede ser también el mejor de los puertos.",
    "Porque eres la persona con quien quiero que el amor sea también puerto seguro.",
    "Porque tienes una manera de ser puerto que da la bienvenida siempre.",
    "Porque me haces querer que el amor sea también la bienvenida más cálida.",
    "Porque eres la razón por la que la bienvenida tiene el mejor de los nombres.",
    "Porque tienes una manera de dar bienvenida que hace que llegue siempre.",
    "Porque me haces sentir que el amor puede ser también siempre una bienvenida.",
    "Porque eres la persona con quien quiero que el amor sea siempre una llegada.",
    "Porque tienes una manera de hacer que llegar sea también quedarse.",
    "Porque me haces querer que el amor sea también la razón para quedarse.",
    "Porque eres la razón por la que quedarse tiene el mejor de los significados.",
    "Porque tienes una manera de hacer que quedarse sea la mejor de las opciones.",
    "Porque me haces sentir que el amor puede ser también la decisión de quedarse.",
    "Porque eres la persona con quien quiero que quedarme sea la decisión más fácil.",
    "Porque tienes una manera de hacer que el quedarse sea también la libertad.",
    "Porque me haces querer que el amor sea también la más libre de las decisiones.",
    "Porque eres la razón por la que la decisión más libre es también la más amorosa.",
    "Porque tienes una manera de hacer que amar sea también liberarse.",
    "Porque me haces sentir que el amor puede liberarme mientras me une a ti.",
    "Porque eres la persona con quien quiero que el amor sea siempre libertad.",
    "Porque tienes una manera de hacer que el amor sea la experiencia más liberadora.",
    "Porque me haces querer que el amor sea también el acto más libre.",
    "Porque eres la razón por la que el amor libre tiene el mejor de los nombres.",
    "Porque tienes una manera de amar libremente que me hace amarte más.",
    "Porque me haces sentir que el amor puede ser libre, profundo, eterno y siempre nuevo.",
    "Porque eres la persona con quien quiero que el amor sea todas esas cosas.",
    "Porque tienes algo en ti que siempre quiero descubrir y que nunca se acaba.",
    "Porque me haces sentir que el amor puede ser también exploración eterna.",
    "Porque eres la persona con quien quiero explorar eternamente.",
    "Porque tienes una manera de revelarte que hace que siempre haya más por descubrir.",
    "Porque me haces querer que el amor sea también descubrimiento sin fin.",
    "Porque eres la razón por la que el descubrimiento tiene el mejor de los horizontes.",
    "Porque tienes una manera de abrirte que hace que el descubrimiento sea un privilegio.",
    "Porque me haces sentir que el amor puede ser también privilegio de conocerte.",
    "Porque eres la persona con quien quiero que el amor sea también conocimiento profundo.",
    "Porque tienes una manera de dejarte conocer que es un acto de confianza.",
    "Porque me haces querer que el amor sea también la mayor de las confianzas.",
    "Porque eres la razón por la que la confianza tiene el mejor de los nombres.",
    "Porque tienes una manera de confiar que me hace querer ser digno de ella.",
    "Porque me haces sentir que el amor puede ser también responsabilidad de cuidar.",
    "Porque eres la persona con quien quiero ser responsable del amor.",
    "Porque tienes una manera de hacer que la responsabilidad sea también un honor.",
    "Porque me haces querer que el amor sea también el mayor de los honores.",
    "Porque eres la razón por la que el honor tiene el mejor de los rostros.",
    "Porque tienes una manera de honrar el amor que me inspira a hacerlo también.",
    "Porque me haces sentir que el amor puede ser también el acto más honroso.",
    "Porque eres la persona con quien quiero honrar el amor cada día.",
    "Porque tienes una manera de hacer que honrar sea también celebrar.",
    "Porque me haces querer que el amor sea también una celebración continua.",
    "Porque eres la razón por la que la celebración tiene el mejor de los motivos.",
    "Porque tienes una manera de celebrar que hace que todo valga más.",
    "Porque me haces sentir que el amor puede ser también el mayor de los festejos.",
    "Porque eres la persona con quien quiero festejar cada momento.",
    "Porque tienes una manera de festejar que hace que hasta lo pequeño sea grande.",
    "Porque me haces querer que el amor sea también la grandeza de lo pequeño.",
    "Porque eres la razón por la que lo pequeño tiene la mayor de las grandezas.",
    "Porque tienes una manera de hacer que lo grande y lo pequeño sean igualmente bonitos.",
    "Porque me haces sentir que el amor puede existir en cada escala.",
    "Porque eres y siempre serás mi razón más grande, mi amor más verdadero, mi Isela.",

    ];

    const razEmojiList = ["💕","🌹","✨","💫","❤️","🦋","💖","🌸","💗","⭐","💝","🌟","💞","🌺","💓"];

    // ── RAZONES: render all cards immediately on page load ──
    function renderTodasLasRazones(filter) {
        const grid = document.getElementById("razones-grid");
        const showingEl = document.getElementById("razones-showing");
        if (!grid) return;

        const term = (filter || "").toLowerCase();
        const filtered = term ? RAZONES.filter(r => r.toLowerCase().includes(term)) : RAZONES;

        if (showingEl) showingEl.textContent = filtered.length.toLocaleString('es-MX');

        // Build all cards at once with a document fragment for performance
        const frag = document.createDocumentFragment();
        if (filtered.length === 0) {
            const empty = document.createElement("div");
            empty.style.cssText = "grid-column:1/-1;text-align:center;color:var(--text-muted);padding:60px 20px;font-style:italic;";
            empty.textContent = "No se encontraron razones... pero hay más de 1000 que te esperan 💕";
            frag.appendChild(empty);
        } else {
            filtered.forEach((razon, i) => {
                const idx = RAZONES.indexOf(razon);
                const card = document.createElement("div");
                card.className = "razon-card razon-visible";
                const emoji = razEmojiList[idx % razEmojiList.length];
                card.innerHTML =
                    `<div class="razon-numero">Razón #${idx + 1}</div>` +
                    `<div class="razon-texto">${razon}</div>` +
                    `<div class="razon-emoji">${emoji}</div>`;
                frag.appendChild(card);
            });
        }
        grid.innerHTML = "";
        grid.appendChild(frag);
    }

    // Render immediately at page load so cards are always visible
    renderTodasLasRazones();

    // Live search filter
    const razSearchInput = document.getElementById("razones-search");
    if (razSearchInput) {
        razSearchInput.addEventListener("input", function() {
            renderTodasLasRazones(this.value);
        });
    }

}); // End DOMContentLoaded


