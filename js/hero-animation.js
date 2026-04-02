document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('lemniscate-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width, height, dpr;

    const curve = {
        particleCount: 36,
        trailSpan: 0.64,
        durationMs: 9000,
        pulseDurationMs: 5000,
        strokeWidth: 3.2,
    };

    function point(progress, detailScale) {
        const t = progress * Math.PI * 2;
        const scale = 20 + detailScale * 7;
        const denom = 1 + Math.sin(t) ** 2;
        return {
            x: 50 + (scale * Math.cos(t)) / denom,
            y: 50 + (scale * Math.sin(t) * Math.cos(t)) / denom,
        };
    }

    function resize() {
        dpr = window.devicePixelRatio || 1;
        width = canvas.offsetWidth;
        height = canvas.offsetHeight;
        canvas.width = width * dpr;
        canvas.height = height * dpr;
        ctx.scale(dpr, dpr);
    }

    function init() {
        resize();
        window.addEventListener('resize', resize);
        requestAnimationFrame(animate);
    }

    function animate(time) {
        if (!time) {
            requestAnimationFrame(animate);
            return;
        }

        ctx.clearRect(0, 0, canvas.width, canvas.height);

        const globalProgress = (time % curve.durationMs) / curve.durationMs;
        const pulseProgress = (time % curve.pulseDurationMs) / curve.pulseDurationMs;
        const pulseAngle = pulseProgress * Math.PI * 2;
        const detailScale = 0.52 + ((Math.sin(pulseAngle + 0.55) + 1) / 2) * 0.48;

        const viewBoxSize = 100;
        const scaleFactor = Math.min(width, height) / viewBoxSize;
        
        ctx.save();
        ctx.translate(width / 2, height / 2);
        ctx.scale(scaleFactor, scaleFactor);
        ctx.translate(-viewBoxSize / 2, -viewBoxSize / 2);
        
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        const baseColor = isDark ? '255, 255, 255' : '0, 0, 0';
        
        // 1. Gambar Base Path (Jalur Latar Belakang Transparan)
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.lineWidth = curve.strokeWidth;
        ctx.strokeStyle = `rgba(${baseColor}, 0.0)`;
        
        ctx.beginPath();
        for (let i = 0; i <= 200; i++) {
            const pt = point(i / 200, detailScale);
            if (i === 0) ctx.moveTo(pt.x, pt.y);
            else ctx.lineTo(pt.x, pt.y);
        }
        ctx.stroke();

        // 2. Gambar Partikel yang bertumpuk (dari ekor ke kepala agar kepala di atas)
        for (let i = curve.particleCount - 1; i >= 0; i--) {
            const tailOffset = i / (curve.particleCount - 1);
            // Perhitungan progress yang normalize
            const pProgress = (((globalProgress - tailOffset * curve.trailSpan) % 1) + 1) % 1;
            const pt = point(pProgress, detailScale);

            // Perhitungan rasio pengecilan persis seperti referensi
            const fade = Math.pow(1 - tailOffset, 0.56);
            const radius = (0.9 + fade * 2.7) * 1.35; // Dikali 1.35 sesuai dengan mode "viewer" di referensi
            const opacity = Math.min(1, (0.04 + fade * 0.96) + 0.04);

            ctx.globalAlpha = opacity;
            ctx.fillStyle = `rgb(${baseColor})`;
            
            // Hanya tambahkan efek glow pada beberapa partikel terdepan (kepala)
            if (i < 5) {
                ctx.shadowBlur = isDark ? 8 : 4;
            } else {
                ctx.shadowBlur = 0;
            }
            ctx.shadowColor = `rgb(${baseColor})`;
            
            ctx.beginPath();
            ctx.arc(pt.x, pt.y, radius, 0, Math.PI * 2);
            ctx.fill();
        }

        // Reset shadow dan alpha
        ctx.shadowBlur = 0;
        ctx.globalAlpha = 1;

        ctx.restore();

        requestAnimationFrame(animate);
    }

    init();
});