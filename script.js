const burgerBtn = document.getElementById('burgerBtn');
const navLinks = document.getElementById('navLinks');

burgerBtn.addEventListener('click', () => navLinks.classList.toggle('open'));
navLinks.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});
document.querySelector('.nav-cta').addEventListener('click', () => navLinks.classList.remove('open'));

const form = document.getElementById('orderForm');
const msg = document.getElementById('formMsg');
const productModal = document.getElementById('productModal');
const productClose = document.getElementById('productClose');
const productImage = document.getElementById('productImage');
const productImageCaption = document.getElementById('productImageCaption');
const productTitle = document.getElementById('productTitle');
const productPrice = document.getElementById('productPrice');
const productDescription = document.getElementById('productDescription');
const productOrder = document.getElementById('productOrder');
const productThumbs = document.querySelectorAll('.product-thumb');

const products = {
  brigadeiro: { title: 'Brigadeiro Trufado', price: 'R$4,50', color: '#5a321c', accent: '#e3c07d', description: 'Chocolate belga meio amargo, recheio cremoso e granulado crocante feito na casa. Uma unidade intensa, macia e feita para comer sem pressa.' },
  beijinho: { title: 'Beijinho de Coco', price: 'R$4,50', color: '#d8c598', accent: '#fff7df', description: 'Coco fresco ralado na hora, leite condensado e um toque leve de limao siciliano para equilibrar a doçura.' },
  'doce-leite': { title: 'Doce de Leite Queimado', price: 'R$5,00', color: '#9d5d29', accent: '#f0ca78', description: 'Doce de leite artesanal cozido devagar, com notas caramelizadas e finalizado com uma pequena pitada de flor de sal.' },
  'bem-casado': { title: 'Bem-Casado de Geleia', price: 'R$5,50', color: '#c18c4c', accent: '#f5e2a5', description: 'Massinhas amanteigadas que abraçam uma geleia de frutas vermelhas brilhante e preparada na cozinha da Sammy.' },
  tortinha: { title: 'Tortinha de Morango', price: 'R$9,00', color: '#b53d4b', accent: '#ffd0bf', description: 'Massa amanteigada, creme de baunilha e morangos frescos. Uma sobremesa delicada, fresca e cheia de textura.' },
  trufa: { title: 'Trufa de Framboesa', price: 'R$6,00', color: '#6f1c2a', accent: '#ec8b9a', description: 'Ganache de chocolate meio amargo com um coraçao de framboesa. Equilibrio entre acidez frutada e chocolate intenso.' },
};

let activeProduct;

function selectShot(shot) {
  productImage.dataset.shot = shot;
  productImageCaption.textContent = `Foto ${Number(shot) + 1}`;
  productThumbs.forEach((thumb) => thumb.classList.toggle('is-active', thumb.dataset.shot === shot));
}

function openProduct(productId) {
  activeProduct = products[productId];
  productTitle.textContent = activeProduct.title;
  productPrice.textContent = activeProduct.price;
  productDescription.textContent = activeProduct.description;
  productImage.style.setProperty('--product-color', activeProduct.color);
  productImage.style.setProperty('--product-accent', activeProduct.accent);
  productThumbs.forEach((thumb) => thumb.style.setProperty('--thumb-color', activeProduct.color));
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
}

document.querySelectorAll('[data-product]').forEach((card) => {
  card.addEventListener('click', () => openProduct(card.dataset.product));
  card.addEventListener('keydown', (event) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      openProduct(card.dataset.product);
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
