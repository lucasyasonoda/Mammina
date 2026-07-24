const WHATSAPP_NUMBER = '5515991193238';

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

const cestinhaToggle = document.getElementById('cestinhaToggle');
const cestinhaCount = document.getElementById('cestinhaCount');
const cestinhaOverlay = document.getElementById('cestinhaOverlay');
const cestinhaPanel = document.getElementById('cestinhaPanel');
const cestinhaClose = document.getElementById('cestinhaClose');
const cestinhaItemsEl = document.getElementById('cestinhaItems');
const cestinhaEmpty = document.getElementById('cestinhaEmpty');
const cestinhaFooter = document.getElementById('cestinhaFooter');
const cestinhaTotalEl = document.getElementById('cestinhaTotal');
const cestinhaNote = document.getElementById('cestinhaNote');
const cestinhaFinish = document.getElementById('cestinhaFinish');
const orderSummary = document.getElementById('orderSummary');

const products = {
  brigadeiro: {
    title: 'Brigadeiro Trufado',
    price: 'R$ 4,50',
    priceValue: 4.5,
    color: '#5a321c',
    accent: '#e3c07d',
    description: 'Chocolate belga meio amargo, recheio cremoso e granulado crocante feito na casa. Uma unidade intensa, macia e feita para comer sem pressa.',
  },
  beijinho: {
    title: 'Beijinho de Coco',
    price: 'R$ 4,50',
    priceValue: 4.5,
    color: '#d8c598',
    accent: '#fff7df',
    description: 'Coco fresco ralado na hora, leite condensado e um toque leve de limão-siciliano para equilibrar a doçura.',
  },
  'doce-leite': {
    title: 'Doce de Leite Queimado',
    price: 'R$ 5,00',
    priceValue: 5.0,
    color: '#9d5d29',
    accent: '#f0ca78',
    description: 'Doce de leite artesanal cozido devagar, com notas caramelizadas e finalizado com uma pequena pitada de flor de sal.',
  },
  'bem-casado': {
    title: 'Bem-casado de Geleia',
    price: 'R$ 5,50',
    priceValue: 5.5,
    color: '#c18c4c',
    accent: '#f5e2a5',
    description: 'Massas amanteigadas abraçam uma geleia de frutas vermelhas brilhante, preparada na cozinha da Sammy.',
  },
  tortinha: {
    title: 'Tortinha de Morango',
    price: 'R$ 9,00',
    priceValue: 9.0,
    color: '#b53d4b',
    accent: '#ffd0bf',
    description: 'Massa amanteigada, creme de baunilha e morangos frescos. Uma sobremesa delicada, fresca e cheia de textura.',
  },
  'torta-morango': {
    title: 'Torta de Morango',
    price: 'Sob encomenda',
    priceValue: null,
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
    priceValue: 6.0,
    color: '#6f1c2a',
    accent: '#ec8b9a',
    description: 'Ganache de chocolate meio amargo com recheio de framboesa. Equilíbrio entre acidez frutada e chocolate intenso.',
  },
};

let activeProduct;
let activeProductId;
let triggerElement;

/* ---------- Cestinha (carrinho) ---------- */
const CART_KEY = 'sammy-cestinha';

function loadCart() {
  try {
    const raw = localStorage.getItem(CART_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

let cart = loadCart();

function saveCart() {
  try {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  } catch {
    /* localStorage indisponível — a cestinha some ao recarregar, sem quebrar o site */
  }
}

function formatBRL(value) {
  return `R$ ${value.toFixed(2).replace('.', ',')}`;
}

function addToCart(id, qty = 1) {
  cart[id] = (cart[id] || 0) + qty;
  saveCart();
  renderCestinha();
}

function setQty(id, qty) {
  if (qty <= 0) {
    delete cart[id];
  } else {
    cart[id] = qty;
  }
  saveCart();
  renderCestinha();
}

function removeFromCart(id) {
  delete cart[id];
  saveCart();
  renderCestinha();
}

function cartEntries() {
  return Object.entries(cart)
    .filter(([id]) => products[id])
    .map(([id, qty]) => ({ id, qty, product: products[id] }));
}

function cartTotal() {
  return cartEntries().reduce((sum, { qty, product }) => {
    return product.priceValue == null ? sum : sum + product.priceValue * qty;
  }, 0);
}

function hasCombinarItem() {
  return cartEntries().some(({ product }) => product.priceValue == null);
}

function openCestinha() {
  cestinhaPanel.classList.add('is-open');
  cestinhaOverlay.classList.add('is-open');
  cestinhaPanel.setAttribute('aria-hidden', 'false');
  cestinhaToggle.setAttribute('aria-expanded', 'true');
}

function closeCestinha() {
  cestinhaPanel.classList.remove('is-open');
  cestinhaOverlay.classList.remove('is-open');
  cestinhaPanel.setAttribute('aria-hidden', 'true');
  cestinhaToggle.setAttribute('aria-expanded', 'false');
}

function renderCestinha() {
  const entries = cartEntries();
  const totalQty = entries.reduce((sum, { qty }) => sum + qty, 0);

  cestinhaCount.textContent = String(totalQty);
  cestinhaCount.hidden = totalQty === 0;

  cestinhaItemsEl.innerHTML = '';
  cestinhaEmpty.hidden = entries.length > 0;
  cestinhaFooter.hidden = entries.length === 0;

  entries.forEach(({ id, qty, product }) => {
    const row = document.createElement('div');
    row.className = 'cestinha-item';
    row.dataset.id = id;
    const lineTotal = product.priceValue == null ? 'A combinar' : formatBRL(product.priceValue * qty);
    const unitLabel = product.priceValue == null ? 'Sob encomenda' : `${formatBRL(product.priceValue)} / un.`;
    row.innerHTML = `
      <div class="cestinha-item-info">
        <strong>${product.title}</strong>
        <span>${unitLabel}</span>
      </div>
      <div class="cestinha-item-qty">
        <button type="button" class="qty-btn" data-action="dec" aria-label="Diminuir quantidade de ${product.title}">−</button>
        <span class="qty-value">${qty}</span>
        <button type="button" class="qty-btn" data-action="inc" aria-label="Aumentar quantidade de ${product.title}">+</button>
      </div>
      <div class="cestinha-item-total">${lineTotal}</div>
      <button type="button" class="cestinha-item-remove" data-action="remove" aria-label="Remover ${product.title} da cestinha">&times;</button>
    `;
    cestinhaItemsEl.appendChild(row);
  });

  cestinhaTotalEl.textContent = formatBRL(cartTotal());
  cestinhaNote.hidden = !hasCombinarItem();

  renderOrderSummary();
}

function renderOrderSummary() {
  const entries = cartEntries();
  if (entries.length === 0) {
    orderSummary.innerHTML = '<p class="order-summary-empty" id="orderSummaryEmpty">Sua cestinha está vazia — volte ao cardápio e adicione um docinho antes de enviar. 🧺</p>';
    return;
  }

  const rows = entries.map(({ qty, product }) => {
    const lineTotal = product.priceValue == null ? 'A combinar' : formatBRL(product.priceValue * qty);
    return `<div class="order-summary-row"><span>${qty}x ${product.title}</span><span>${lineTotal}</span></div>`;
  }).join('');

  const totalRow = `<div class="order-summary-total"><span>Total${hasCombinarItem() ? ' (+ itens a combinar)' : ''}</span><strong>${formatBRL(cartTotal())}</strong></div>`;

  orderSummary.innerHTML = rows + totalRow;
}

cestinhaToggle.addEventListener('click', openCestinha);
cestinhaClose.addEventListener('click', closeCestinha);
cestinhaOverlay.addEventListener('click', closeCestinha);
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && cestinhaPanel.classList.contains('is-open')) closeCestinha();
});

cestinhaItemsEl.addEventListener('click', (event) => {
  const button = event.target.closest('button[data-action]');
  if (!button) return;
  const row = button.closest('.cestinha-item');
  const id = row.dataset.id;
  const currentQty = cart[id] || 0;

  if (button.dataset.action === 'inc') setQty(id, currentQty + 1);
  if (button.dataset.action === 'dec') setQty(id, currentQty - 1);
  if (button.dataset.action === 'remove') removeFromCart(id);
});

document.querySelectorAll('[data-add]').forEach((button) => {
  button.addEventListener('click', (event) => {
    event.stopPropagation();
    addToCart(button.dataset.add);
    button.classList.add('is-added');
    const original = button.textContent;
    button.textContent = 'Adicionado! ✓';
    setTimeout(() => {
      button.classList.remove('is-added');
      button.textContent = original;
    }, 1400);
  });
});

cestinhaFinish.addEventListener('click', () => {
  closeCestinha();
  document.getElementById('encomendas').scrollIntoView({ behavior: 'smooth' });
});

renderCestinha();

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
  activeProductId = productId;
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
  addToCart(activeProductId);
  closeProduct();
  openCestinha();
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && productModal.classList.contains('is-open')) closeProduct();
});

function formatDataEvento(value) {
  if (!value) return 'Não informada';
  const [ano, mes, dia] = value.split('-');
  return `${dia}/${mes}/${ano}`;
}

function buildWhatsAppMessage() {
  const nome = document.getElementById('nome').value.trim();
  const whatsapp = document.getElementById('whatsapp').value.trim();
  const data = formatDataEvento(document.getElementById('data').value);
  const detalhes = document.getElementById('mensagem').value.trim() || 'Nenhum detalhe adicional informado.';

  const entries = cartEntries();
  const itensTexto = entries
    .map(({ qty, product }) => {
      const linha = product.priceValue == null ? 'a combinar' : formatBRL(product.priceValue * qty);
      return `• ${qty}x ${product.title} — ${linha}`;
    })
    .join('\n');
  const totalTexto = `${formatBRL(cartTotal())}${hasCombinarItem() ? ' + itens a combinar' : ''}`;

  return [
    'Olá, Sammy! Gostaria de fazer uma encomenda 🧁',
    '',
    '*Itens da cestinha:*',
    itensTexto,
    '',
    `*Total:* ${totalTexto}`,
    '',
    `*Nome:* ${nome}`,
    `*WhatsApp para contato:* ${whatsapp}`,
    `*Data do evento:* ${data}`,
    `*Detalhes do pedido:* ${detalhes}`,
    '',
    'Enviado pelo site da Sammy\'s Bakery & Co.',
  ].join('\n');
}

form.addEventListener('submit', (event) => {
  event.preventDefault();

  if (cartEntries().length === 0) {
    msg.textContent = 'Sua cestinha está vazia — adicione um docinho no cardápio antes de enviar. 🧺';
    msg.classList.add('show');
    document.getElementById('doces').scrollIntoView({ behavior: 'smooth' });
    setTimeout(() => msg.classList.remove('show'), 4000);
    return;
  }

  const message = buildWhatsAppMessage();
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank', 'noopener');
  msg.textContent = 'Abrindo o WhatsApp com os detalhes do seu pedido...';
  msg.classList.add('show');
  form.reset();
  cart = {};
  saveCart();
  renderCestinha();
  setTimeout(() => msg.classList.remove('show'), 5000);
});