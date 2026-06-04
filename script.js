const menuToggle = document.querySelector('.menu-toggle');
const body = document.body;
const navLinks = document.querySelectorAll('.main-nav a');

menuToggle?.addEventListener('click', () => {
  body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    body.classList.remove('nav-open');
  });
});

const testimonials = [
  {
    text: 'Zythera built an amazing website for our business. They understood our needs and delivered more than we expected.',
    author: 'John Wick',
    role: 'Founder, HillUp'
  },
  {
    text: 'The design, speed and professionalism exceeded our expectations. Working with Zythera was a great decision.',
    author: 'Olivia Carter',
    role: 'CEO, Momentum'
  }
];

let currentTestimonial = 0;
const testimonialText = document.querySelector('.testimonial-content p');
const testimonialName = document.querySelector('.testimonial-author strong');
const testimonialRole = document.querySelector('.testimonial-author span');
const testimonialImage = document.querySelector('.testimonial-author img');

function updateTestimonial(index) {
  const testimonial = testimonials[index];
  if (!testimonial) return;
  testimonialText.textContent = testimonial.text;
  testimonialName.textContent = testimonial.author;
  testimonialRole.textContent = testimonial.role;

  if (testimonialImage) {
    if (testimonial.author === 'Olivia Carter') {
      testimonialImage.src = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?q=80&w=761&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';
      testimonialImage.alt = 'Olivia Carter';
    } else {
      testimonialImage.src = 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D?auto=format&fit=crop&w=100&q=80';
      testimonialImage.alt = testimonial.author;
    }
  }
}

if (testimonialText && testimonialName && testimonialRole) {
  setInterval(() => {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    updateTestimonial(currentTestimonial);
  }, 6500);
}

const appModal = document.getElementById('appModal');
const webModal = document.getElementById('webModal');
const softwareModal = document.getElementById('softwareModal');
const appModalTriggers = document.querySelectorAll('.open-app-modal');
const webModalTriggers = document.querySelectorAll('.open-web-modal');
const softwareModalTriggers = document.querySelectorAll('.open-software-modal');
const serviceCards = document.querySelectorAll('.container.cards-grid.three-column .service-card');
const modalOverlays = document.querySelectorAll('.modal-overlay');
const modalCloseButtons = document.querySelectorAll('.modal-close');

function openModal(modal) {
  if (!modal) return;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeModal(modal) {
  if (!modal) return;
  modal.classList.remove('open');
  modal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

appModalTriggers.forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    openModal(appModal);
  });
});

webModalTriggers.forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    openModal(webModal);
  });
});

softwareModalTriggers.forEach(trigger => {
  trigger.addEventListener('click', event => {
    event.preventDefault();
    openModal(softwareModal);
  });
});

serviceCards.forEach(card => {
  card.addEventListener('click', event => {
    if (event.target.closest('.card-link')) return;

    if (card.querySelector('.open-web-modal')) {
      openModal(webModal);
    } else if (card.querySelector('.open-app-modal')) {
      openModal(appModal);
    } else if (card.querySelector('.open-software-modal')) {
      openModal(softwareModal);
    }
  });
});

modalCloseButtons.forEach(button => {
  button.addEventListener('click', event => {
    const modal = event.target.closest('.modal-overlay');
    closeModal(modal);
  });
});

modalOverlays.forEach(overlay => {
  overlay.addEventListener('click', event => {
    if (event.target === overlay) {
      closeModal(overlay);
    }
  });
});

const modalContactLinks = document.querySelectorAll('.modal-overlay a[href="#contact"]');
modalContactLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault();
    const modal = event.target.closest('.modal-overlay');
    closeModal(modal);
    const contactSection = document.querySelector('#contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = '#contact';
    }
  });
});

const contactForm = document.querySelector('.contact-form');

function showTemporaryMessage(text, duration = 10000) {
  const existing = document.getElementById('submit-thanks-message');
  if (existing) existing.remove();

  const messageDiv = document.createElement('div');
  messageDiv.id = 'submit-thanks-message';
  messageDiv.textContent = text;
  Object.assign(messageDiv.style, {
    position: 'fixed',
    bottom: '20px',
    left: '50%',
    transform: 'translateX(-50%)',
    background: 'rgba(0, 0, 0, 0.85)',
    color: '#fff',
    padding: '16px 24px',
    borderRadius: '999px',
    boxShadow: '0 16px 40px rgba(0, 0, 0, 0.25)',
    zIndex: '9999',
    maxWidth: 'calc(100% - 40px)',
    textAlign: 'center',
    fontSize: '0.95rem',
    lineHeight: '1.4'
  });

  document.body.appendChild(messageDiv);

  setTimeout(() => {
    messageDiv.remove();
    window.location.reload();
  }, duration);
}

if (contactForm) {
  contactForm.addEventListener('submit', event => {
    event.preventDefault();

    const formData = new FormData(contactForm);
    const name = (formData.get('name') || '').toString().trim();
    const email = (formData.get('email') || '').toString().trim();
    const phone = (formData.get('phone') || '').toString().trim();
    const message = (formData.get('message') || '').toString().trim();

    const text = `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`;
    const whatsappNumber = '7400338939';
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;

    window.open(whatsappUrl, '_blank');
    showTemporaryMessage('Thanks for contacting us, We will get back to you soon!', 10000);
  });
}

document.addEventListener('keydown', event => {
  if (event.key !== 'Escape') return;
  modalOverlays.forEach(overlay => {
    if (overlay.classList.contains('open')) {
      closeModal(overlay);
    }
  });
});
