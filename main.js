document.addEventListener("DOMContentLoaded", () => {
    
    /* ==========================================================================
       1. ANIMATION DES CARTES (Intersection Observer)
       ========================================================================== */
    const cards = document.querySelectorAll('.card-profil');
    
    const observerOptions = {
        root: null,
        rootMargin: "0px",
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => {
        card.style.opacity = "0";
        card.style.transform = "translateY(20px)";
        card.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";
        observer.observe(card);
    });


    /* ==========================================================================
       2. GESTION DU MENU HAMBURGER MOBILE
       ========================================================================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', (e) => {
            e.stopPropagation(); 
            navMenu.classList.toggle('active');
            
            // Changement visuel du bouton (bars / xmark)
            const icon = menuToggle.querySelector('i');
            if (icon) {
                icon.classList.toggle('fa-bars');
                icon.classList.toggle('fa-times');
            }
        });

        // Fermeture propre au clic extérieur
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            }
        });

        // Ferme automatiquement le menu lors du clic sur un lien interne
        const navLinks = document.querySelectorAll('nav ul li a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = menuToggle.querySelector('i');
                if (icon) {
                    icon.classList.add('fa-bars');
                    icon.classList.remove('fa-times');
                }
            });
        });
    }


    /* ==========================================================================
       3. DÉFILEMENT ANCRÉ FLUIDE
       ========================================================================== */
    const scrollLinks = document.querySelectorAll('a[href^="#"]');
    scrollLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            
            const targetId = link.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerOffset = 80; 
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.scrollY - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });


    /* ==========================================================================
       4. SYSTÈME LIGHTBOX POUR LES AVATARS (EMPLACEMENT EXACT)
       ========================================================================== */
    const lightbox = document.getElementById("lightbox");
    
    // On vérifie que la lightbox existe bien dans le HTML pour éviter les erreurs de script
    if (lightbox) {
        const lightboxImg = lightbox.querySelector(".lightbox-img");
        const closeBtn = lightbox.querySelector(".lightbox-close");
        const zoomableAvatars = document.querySelectorAll(".zoomable-avatar");

        // Ouverture de la lightbox au clic sur un avatar cliquable
        zoomableAvatars.forEach(avatar => {
            avatar.addEventListener("click", () => {
                const fullImageUrl = avatar.getAttribute("data-full");
                if (lightboxImg && fullImageUrl) {
                    lightboxImg.src = fullImageUrl;
                    lightbox.showModal(); // API native pour ouvrir en modale avec arrière-plan
                }
            });
        });

        // Fermeture au clic sur la croix (X)
        if (closeBtn) {
            closeBtn.addEventListener("click", () => {
                lightbox.close();
                if (lightboxImg) lightboxImg.src = ""; // Libère la mémoire
            });
        }

        // Fermeture au clic sur le fond sombre (en dehors du conteneur de l'image)
        lightbox.addEventListener("click", (e) => {
            if (e.target === lightbox) {
                lightbox.close();
                if (lightboxImg) lightboxImg.src = "";
            }
        });
    }

}); // Fin de DOMContentLoaded (Ne surtout pas supprimer cette ligne !)
