document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Scroll Reveal Animation
    const reveals = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger inicial

    // 2. Animação de Números (Counters)
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    const startCounting = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText.replace(/,/g, '');
                const speed = 200; // Velocidade da animação
                const inc = target / speed;

                if (count < target) {
                    counter.innerText = Math.ceil(count + inc).toLocaleString('pt-BR');
                    setTimeout(updateCount, 15);
                } else {
                    counter.innerText = target.toLocaleString('pt-BR');
                }
            };
            updateCount();
        });
    };

    // Usando Intersection Observer para acionar a contagem apenas quando a seção aparecer na tela
    const statsSection = document.querySelector('.stats');
    const observer = new IntersectionObserver((entries) => {
        if(entries[0].isIntersecting && !hasCounted) {
            startCounting();
            hasCounted = true;
        }
    }, { threshold: 0.5 });

    if(statsSection) {
        observer.observe(statsSection);
    }
});