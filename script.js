/* ── DARK / LIGHT MODE ── */
    function toggleTheme() {
        const html = document.documentElement;
        html.dataset.theme = html.dataset.theme === 'dark' ? 'light' : 'dark';
    }

    /* ── TYPING EFFECT ── */
    const text = "Mariama Faye";
    let i = 0;
    const el = document.querySelector(".typing");
    function typeWriter() {
        if (i < text.length) {
            el.textContent += text.charAt(i++);
            setTimeout(typeWriter, 100);
        }
    }
    el.textContent = "";
    typeWriter();

    /* ── STATS COUNTER ── */
    const counters = document.querySelectorAll('.stat-number');
    counters.forEach(counter => {
        const target = +counter.dataset.target;
        let current = 0;
        const step = Math.ceil(target / 30);
        const timer = setInterval(() => {
            current += step;
            if (current >= target) { counter.textContent = target + '+'; clearInterval(timer); }
            else counter.textContent = current;
        }, 60);
    });

    /* ── RÉSEAU ANIMÉ ── */
    const canvas = document.getElementById('network-canvas');
    const ctx = canvas.getContext('2d');
    let W, H, pts;

    function resize() {
        W = canvas.width = window.innerWidth;
        H = canvas.height = window.innerHeight;
        init();
    }

    function init() {
        pts = Array.from({ length: 55 }, () => ({
            x: Math.random() * W,
            y: Math.random() * H,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            r: Math.random() * 2.5 + 1
        }));
    }

    function getAccent() {
        return document.documentElement.dataset.theme === 'dark'
            ? '0,229,255' : '0,122,173';
    }

    function draw() {
        ctx.clearRect(0, 0, W, H);
        const ac = getAccent();

        pts.forEach(p => {
            p.x += p.vx; p.y += p.vy;
            if (p.x < 0 || p.x > W) p.vx *= -1;
            if (p.y < 0 || p.y > H) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${ac},0.8)`;
            ctx.fill();
        });

        for (let a = 0; a < pts.length; a++) {
            for (let b = a + 1; b < pts.length; b++) {
                const dx = pts[a].x - pts[b].x;
                const dy = pts[a].y - pts[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(pts[a].x, pts[a].y);
                    ctx.lineTo(pts[b].x, pts[b].y);
                    ctx.strokeStyle = `rgba(${ac},${1 - dist / 130})`;
                    ctx.lineWidth = 0.6;
                    ctx.stroke();
                }
            }
        }
        requestAnimationFrame(draw);
    }

    window.addEventListener('resize', resize);
    resize();
    draw();