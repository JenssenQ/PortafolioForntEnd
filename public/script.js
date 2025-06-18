document.addEventListener('DOMContentLoaded', function(){
    const themeToggle = document.getElementById('themeToggle');
    const hmtl = document.documentElement;
    const icon = themeToggle.querySelector('i');

    const savedTheme = localStorage.getItem('theme');
    const preferDark = window.matchMedia('(prefers-color-scheme: dark').matches;

    //Por si el sistema del usuario tiene tema oscuro predeterminado

    if (savedTheme === 'dark' || (!savedTheme && preferDark)){
        hmtl.classList.add('dark');
        icon.classList.replace('fa-moon', 'fa-sun');
        document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000');
    }

    //Cambio de tema al darle click al incono
    themeToggle.addEventListener('click', function(){
        hmtl.classList.toggle('dark');

        if (hmtl.classList.contains('dark')){
            icon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme' , 'dark');
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#000000');
        }else{
            icon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme' , 'light');
            document.querySelector('meta[name="theme-color"]').setAttribute('content', '#0070f3');
        }
    });

    // Navegacion Celular
    const menuToggle = document.getElementById('menuToggle');
    const closeMenu = document.getElementById('closeMenu');
    const mobileMenu = document.getElementById('mobileMenu');

    if(menuToggle && closeMenu && mobileMenu) {
        menuToggle.addEventListener('click', function() {
            mobileMenu.classList.remove('translate-x-full');
            document.body.classList.add('overflow-hidden');
        });

        closeMenu.addEventListener('click', function() {
            mobileMenu.classList.add('translate-x-full');
            document.body.classList.remove('overflow-hidden');
        });

        //Cerrar el menu del celular cuando le de a un link/seccion
        const mobileLinks = mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', function(){
                mobileMenu.classList.add('translate-x-full');
                document.body.classList.remove('overflow-hidden');
            });
        });
    }

    // smooth scroll
    document.querySelectorAll('a[href^="#"').forEach(anchor => {anchor.addEventListener('click', function(e){

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if(targetElement){
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    //Eventos al scrollear para el header shadow y animaciones
    const header = document.querySelector('header');
    const sections = document.querySelectorAll('section');

    function checkScroll(){
        //Header shadow
        if (window.scrollY > 0) {
            header.classList.add('shadow-md');
        }else{
            header.classList.remove('shadow-md');
        }

        //Animaciones para las secciones al scrolear
        sections.forEach(section => {
            const sectionTop = section.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;

            if(sectionTop < windowHeight * 0.85){
                section.classList.add('opacity-100', 'translate-y-0');
                section.classList.remove('opacity-0', 'translate-y-4');
            }
        });
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();

    //intersction observer para las animaciones
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const obverser = new IntersectionObserver((entries, obverser) => {
        entries.forEach(entry => {
            if(entry.isIntersecting){
                entry.target.classList.add('opacity-100', 'translate-y-0');
                entry.target.classList.remove('opacity-0', 'translate-y-4');
                //parar las animaciones cuando el obverser este triggered
                observer.unobserve(entry.target);
            }
        })
    }, observerOptions);

    //Animacion terminal
    const terminalContainer = document.getElementById('terminal-container');
    const terminalContent = document.querySelector('.terminal-content');
    const commandSpan = document.querySelector('.command-text');

    if(terminalContainer && terminalContent && commandSpan) {
        const  commandText = "La mamá de Kevin que rico, y doña Andrea tambien.";
        let i = 0;
        const typeCommand = () => {
            if(i < commandText.length){
                commandSpan.textContent += commandText.charAt(i);
                i++;
                setTimeout(typeCommand, 50);
            }else{
                //Anadir cursor parpadeante cuando termine de escribir
                const cursor = document.createElement('span');
                cursor.className = 'inline-block w-2 h-5 bg-gray-900 dark:bg-white ml-1 animate-blink align-middle';
                terminalContent.appendChild(cursor);
            }
        };

        //Empezar a escribir despues de un tiempo
        setTimeout(typeCommand, 1000);
    }else{
        //Fallback a la estructura original de la terminal
        const terminal = document.querySelector('.terminal-body');
        if(terminal) {
            const commandText = terminal.querySelector('.command').textContent;
            terminal.querySelector('.command').textContent = '';

            let i = 0;
            const typeCommand = () => {
                if(i < commandText.length){
                    terminal.querySelector('.command').textContent += commandText.charAt(i);
                    i++;
                    setTimeout(typeCommand, 50);
                }else{
                    //Anadir cursor parpadeante cuando termine de escribir
                    terminal.querySelector('.command').insertAdjacentHTML('afterend', '<span class="animate-blink">_</span>');
                }
            };

            //Empezar a escribir despues de un tiempo
            setTimeout(typeCommand, 1000);
        }
    }
});