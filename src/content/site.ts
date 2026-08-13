export const WHATSAPP_NUMBER = "5515991193238";

export const brand = {
  name: "Mammina",
  tagline: "Brigadeiros gourmet artesanais",
  city: "Sorocaba, SP",
  hours: "Terça a sábado — das 9h às 18h",
  leadTime: "Encomendas com 48 horas de antecedência",
  email: "contato@mammina.co",
  instagram: "@mammina.doces",
  whatsappDisplay: "(15) 99119-3238",
};

export type Flavor = {
  id: string;
  title: string;
  price: string;
  priceValue: number;
  color: string;
  accent: string;
  description: string;
};

export const flavors: Flavor[] = [
  {
    id: "brigadeiro",
    title: "Brigadeiro",
    price: "R$ 4,90",
    priceValue: 4.9,
    color: "#3B2A20",
    accent: "#C2858C",
    description:
      "O clássico dos clássicos: chocolate meio amargo, cremoso por dentro e granulado crocante por fora.",
  },
  {
    id: "beijinho",
    title: "Beijinho",
    price: "R$ 4,90",
    priceValue: 4.9,
    color: "#8A5A22",
    accent: "#F3E3B5",
    description:
      "Coco fresco ralado na hora e leite condensado, finalizado com cravo — doce, macio e cheiroso.",
  },
  {
    id: "bicho-de-pe",
    title: "Bicho de Pé",
    price: "R$ 4,90",
    priceValue: 4.9,
    color: "#8E2A28",
    accent: "#D9A15C",
    description:
      "Amendoim torrado moído na medida certa, com aquele toque de cereja por cima que não pode faltar.",
  },
  {
    id: "casadinho",
    title: "Casadinho (Floral)",
    price: "R$ 5,20",
    priceValue: 5.2,
    color: "#7A1F1D",
    accent: "#E7B9C1",
    description:
      "Dupla de chocolate ao leite e branco floral, com um toque delicado de flores comestíveis.",
  },
  {
    id: "romeu-e-julieta",
    title: "Romeu e Julieta (Flor de Goiaba)",
    price: "R$ 5,20",
    priceValue: 5.2,
    color: "#9B3A3F",
    accent: "#C24B4E",
    description:
      "Goiabada cremosa encontra um recheio macio de queijo, perfumado com flor de goiabeira.",
  },
  {
    id: "maracuja",
    title: "Maracujá",
    price: "R$ 5,20",
    priceValue: 5.2,
    color: "#B5661A",
    accent: "#F0B23D",
    description: "Azedinho na medida, com polpa de maracujá de verdade equilibrando a doçura.",
  },
  {
    id: "limao",
    title: "Limão",
    price: "R$ 4,90",
    priceValue: 4.9,
    color: "#4F6B2C",
    accent: "#D3DE9A",
    description: "Casquinha crocante de limão-siciliano sobre um recheio fresco e cítrico.",
  },
  {
    id: "surpresa-de-uva",
    title: "Surpresa de Uva",
    price: "R$ 5,50",
    priceValue: 5.5,
    color: "#4A2749",
    accent: "#8C5A87",
    description: "Uma uva inteirinha escondida no centro, envolta em chocolate cremoso.",
  },
  {
    id: "prestigio",
    title: "Prestígio",
    price: "R$ 5,20",
    priceValue: 5.2,
    color: "#3B2A20",
    accent: "#EDE6D6",
    description: "Chocolate meio amargo com coco ralado por dentro — a dupla perfeita, sem enjoar.",
  },
  {
    id: "ninho-nutella",
    title: "Ninho com Nutella",
    price: "R$ 5,50",
    priceValue: 5.5,
    color: "#5A3A22",
    accent: "#E8D9BE",
    description: "Leite em pó cremoso com um coração de Nutella que escorre no primeiro morder.",
  },
  {
    id: "churros",
    title: "Churros",
    price: "R$ 5,20",
    priceValue: 5.2,
    color: "#7A4A1E",
    accent: "#C98A4B",
    description:
      "Canela e doce de leite por dentro, com uma casquinha crocante que lembra o churros de rua.",
  },
  {
    id: "pacoca",
    title: "Paçoca",
    price: "R$ 4,90",
    priceValue: 4.9,
    color: "#8E2A28",
    accent: "#D8B78C",
    description: "Amendoim, um fiapo de doce de leite e aquele sabor de infância em cada mordida.",
  },
];
