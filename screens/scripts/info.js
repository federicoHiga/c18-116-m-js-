document.querySelectorAll('.accordion-header').forEach(header => {
    header.addEventListener('click', () => {
        const accordionItem = header.parentElement;
        accordionItem.classList.toggle('active');
    });
});

    // Mostrar botón de "Volver arriba" después de cierto desplazamiento
    window.onscroll = function() {
        const backToTopButton = document.getElementById('back-to-top');
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    };

    // Funcionalidad del botón de "Volver arriba"
    document.getElementById('back-to-top').addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });