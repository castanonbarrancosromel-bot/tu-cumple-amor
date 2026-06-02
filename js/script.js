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
        { btn: "btn-secret-corazon", msg: "secret-msg-corazon" }
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
                    button.innerHTML = `<i class="fa-solid fa-envelope"></i> Ocultar Mensaje Secreto`;
                    
                    // Tilt the related photo container momentarily to draw attention
                    const photoFrame = button.closest(".album-grid").querySelector(".photo-frame-container");
                    if (photoFrame) {
                        photoFrame.style.transform = "perspective(1000px) rotateX(10deg) scale(1.03)";
                        setTimeout(() => { photoFrame.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)"; }, 1200);
                    }
                } else {
                    message.classList.add("hidden-message");
                    message.classList.remove("visible-message");
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
            videoId: "M81lyIXsqpw",
            playerVars: {
                autoplay: 0,
                controls: 0,
                loop: 1,
                playlist: "M81lyIXsqpw"
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
});
