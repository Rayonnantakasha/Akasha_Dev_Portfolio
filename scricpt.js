
const header = document.getElementById('header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 10) {
    header.classList.add('shadow-xs');
  } else {
    header.classList.remove('shadow-xs');
  }
});

// Scroll to top OR to custom target
// Afficher/Masquer le bouton scroll-top
window.addEventListener('scroll', () => {
  const scrollTopBtn = document.querySelector('.scroll-top');

  if (window.scrollY > 300) {
    scrollTopBtn.classList.remove('hidden');
  } else {
    scrollTopBtn.classList.add('hidden');
  }
});

// Scroll en haut avec animation
document.querySelector('.scroll-top')?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

const fadeElements = document.querySelectorAll('.fade-in');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target); // optionnel : pour ne pas répéter
      }
    });
  }, { threshold: 0.1 });

  fadeElements.forEach(el => observer.observe(el));

  //Menu

  const toggleButton = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const closeButton = document.getElementById('mobile-menu-close');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  function closeMenu() {
    mobileMenu.classList.add('-translate-y-full');
    mobileMenu.classList.remove('translate-y-0');
  }

  toggleButton.addEventListener('click', () => {
    mobileMenu.classList.remove('-translate-y-full');
    mobileMenu.classList.add('translate-y-0');
  });

  closeButton.addEventListener('click', closeMenu);

  // Fermer le menu quand on clique sur un lien
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  //Gestion du formulaire
  const form = document.getElementById('contact-form');
  const notification = document.getElementById('notification');
  const notificationText = document.getElementById('notification-text');
  const notificationIcon = document.getElementById('notification-icon');

  function showNotification(type, message) {
    const isSuccess = type === 'success';

    // Texte et icône
    notificationText.textContent = message;
    notificationIcon.textContent = isSuccess ? '✅' : '❌';

    // Couleur selon le type
    notification.classList.remove('bg-red-600', 'bg-green-600');
    notification.classList.add(isSuccess ? 'bg-green-600' : 'bg-red-600');

    // Affichage
    notification.classList.remove('hidden');

    // Disparition automatique après 3 secondes
    setTimeout(() => {
      notification.classList.add('hidden');
    }, 3000);
  }
  form.addEventListener('submit', async (e) => {
    e.preventDefault()

    const formData = new FormData(form) // Récupère les données du formulaire
    // Convertit FormData en objet JSON
    const data = Object.fromEntries(formData.entries())

    // Envoie les données à Formspree
    const response = await fetch('https://formspree.io/f/xyzjrzdr', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    })
    
    // Vérifie si la réponse est OK
    if (response.ok) {
      showNotification('success', 'Message envoyé avec succès !')
      form.reset()
    } else {
     showNotification('error', "Erreur lors de l'envoi du message.")
    }
  })