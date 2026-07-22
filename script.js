const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupScrollReveal() {
  if (prefersReducedMotion) return;

  const stampTargets = document.querySelectorAll('.section-head h2, .story h2');
  const riseTargets = [
    ...document.querySelectorAll('.section-head, .story p, .story .sign, .foot-inner > div'),
    ...document.querySelectorAll('.menu-grid .doce'),
  ];

  stampTargets.forEach((el) => el.classList.add('reveal-stamp'));
  riseTargets.forEach((el) => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  [...stampTargets, ...riseTargets].forEach((el) => observer.observe(el));
}

setupScrollReveal();

const burgerBtn = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');
const form = document.getElementById('orderForm');
const msg = document.getElementById('formMsg');
const productModal = document.getElementById('productModal');
const productClose = document.getElementById('productClose');
const productImage = document.getElementById('productImage');
const productPhoto = document.getElementById('productPhoto');
const productImageCaption = document.getElementById('productImageCaption');
const productTitle = document.getElementById('productTitle');
const productPrice = document.getElementById('productPrice');
const productDescription = document.getElementById('productDescription');
const productOrder = document.getElementById('productOrder');
const productThumbs = document.querySelectorAll('.product-thumb');

const products = {
  brigadeiro: {
    title: 'Brigadeiro Trufado',
    price: 'R$ 4,50',
    color: '#5a321c',
    accent: '#e3c07d',
    description: 'Chocolate belga meio amargo, recheio cremoso e granulado crocante feito na casa. Uma unidade intensa, macia e feita para comer sem pressa.',
  },
  beijinho: {
    title: 'Beijinho de Coco',
    price: 'R$ 4,50',
    color: '#d8c598',
    accent: '#fff7df',
    description: 'Coco fresco ralado na hora, leite condensado e um toque leve de limão-siciliano para equilibrar a doçura.',
  },
  'doce-leite': {
    title: 'Doce de Leite Queimado',
    price: 'R$ 5,00',
    color: '#9d5d29',
    accent: '#f0ca78',
    description: 'Doce de leite artesanal cozido devagar, com notas caramelizadas e finalizado com uma pequena pitada de flor de sal.',
  },
  'bem-casado': {
    title: 'Bem-casado de Geleia',
    price: 'R$ 5,50',
    color: '#c18c4c',
    accent: '#f5e2a5',
    description: 'Massas amanteigadas abraçam uma geleia de frutas vermelhas brilhante, preparada na cozinha da Sammy.',
  },
  tortinha: {
    title: 'Tortinha de Morango',
    price: 'R$ 9,00',
    color: '#b53d4b',
    accent: '#ffd0bf',
    description: 'Massa amanteigada, creme de baunilha e morangos frescos. Uma sobremesa delicada, fresca e cheia de textura.',
  },
  'torta-morango': {
    title: 'Torta de Morango',
    price: 'Sob encomenda',
    color: '#b32b3d',
    accent: '#f4d5b6',
    description: 'A base crocante de biscoito recebe um creme de confeiteiro aveludado e uma camada generosa de geleia de morango caseira. Tudo é finalizado com muito chantilly fresquinho e decorado com os melhores morangos.',
    images: [
      { src: 'images/tortamorango_logo.jpeg', label: 'Torta de Morango decorada' },
      { src: 'images/tortamorango_sabores.jpeg', label: 'Camadas da Torta de Morango' },
    ],
  },
  trufa: {
    title: 'Trufa de Framboesa',
    price: 'R$ 6,00',
    color: '#6f1c2a',
    accent: '#ec8b9a',
    description: 'Ganache de chocolate meio amargo com recheio de framboesa. Equilíbrio entre acidez frutada e chocolate intenso.',
  },
};

let activeProduct;
let triggerElement;

burgerBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
document.querySelector('.nav-cta').addEventListener('click', () => navLinks.classList.remove('open'));

function configureGallery() {
  const photos = activeProduct.images ?? [];
  const hasPhotos = photos.length > 0;

  productImage.classList.toggle('has-photo', hasPhotos);
  productThumbs.forEach((thumb, index) => {
    const photo = photos[index];
    thumb.hidden = hasPhotos && !photo;
    thumb.style.backgroundImage = photo ? `url("${photo.src}")` : '';
    thumb.style.removeProperty('background-color');
    if (photo) thumb.setAttribute('aria-label', `Ver ${photo.label.toLowerCase()}`);
  });
}

function selectShot(shot) {
  const photo = activeProduct.images?.[Number(shot)];

  productImage.dataset.shot = shot;
  productThumbs.forEach((thumb) => thumb.classList.toggle('is-active', thumb.dataset.shot === shot));

  if (photo) {
    productPhoto.src = photo.src;
    productPhoto.alt = photo.label;
    productPhoto.hidden = false;
    productImage.setAttribute('aria-label', photo.label);
    productImageCaption.textContent = photo.label;
    return;
  }

  productPhoto.hidden = true;
  productPhoto.removeAttribute('src');
  productPhoto.alt = '';
  productImage.setAttribute('aria-label', 'Imagem ilustrativa do doce selecionado');
  productImageCaption.textContent = `Imagem ${Number(shot) + 1}`;
}

function openProduct(productId, trigger) {
  activeProduct = products[productId];
  triggerElement = trigger;
  productTitle.textContent = activeProduct.title;
  productPrice.textContent = activeProduct.price;
  productDescription.textContent = activeProduct.description;
  productImage.style.setProperty('--product-color', activeProduct.color);
  productImage.style.setProperty('--product-accent', activeProduct.accent);
  productThumbs.forEach((thumb) => thumb.style.setProperty('--thumb-color', activeProduct.color));
  configureGallery();
  selectShot('0');
  productModal.classList.add('is-open');
  productModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
  productClose.focus();
}

function closeProduct() {
  productModal.classList.remove('is-open');
  productModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  triggerElement?.focus();
}

document.querySelectorAll('[data-product]').forEach((card) => {
  card.addEventListener('click', () => openProduct(card.dataset.product, card));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProduct(card.dataset.product, card);
    }
  });
});

productClose.addEventListener('click', closeProduct);
productModal.addEventListener('click', (event) => {
  if (event.target === productModal) closeProduct();
});
productThumbs.forEach((thumb) => thumb.addEventListener('click', () => selectShot(thumb.dataset.shot)));
productOrder.addEventListener('click', () => {
  document.getElementById('doce').value = activeProduct.title;
  closeProduct();
  document.getElementById('encomendas').scrollIntoView({ behavior: 'smooth' });
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && productModal.classList.contains('is-open')) closeProduct();
});

form.addEventListener('submit', (event) => {
  event.preventDefault();
  msg.classList.add('show');
  form.reset();
  setTimeout(() => msg.classList.remove('show'), 5000);
});
