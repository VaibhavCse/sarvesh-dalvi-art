// ── PRINT TYPES & SIZES (Sarvesh's exact pricing) ────────────────────────────
export const PRINT_TYPES = [
  {
    id:    "stretched",
    label: "Stretched Canvas",
    desc:  "Ready to hang — canvas stretched over a wooden frame",
    sizes: [
      { id: "s",  label: '8″ × 14″',  price: 3000  },
      { id: "m",  label: '11″ × 18″', price: 4600  },
      { id: "l",  label: '16″ × 24″', price: 8000  },
      { id: "xl", label: '18″ × 24″', price: 12000 },
    ],
  },
  {
    id:    "rolled",
    label: "Rolled Canvas",
    desc:  "Ships rolled in a tube — frame separately",
    sizes: [
      { id: "s",  label: '8″ × 14″',  price: 2400 },
      { id: "m",  label: '11″ × 18″', price: 3900 },
      { id: "l",  label: '16″ × 24″', price: 5500 },
      { id: "xl", label: '18″ × 24″', price: 9000 },
    ],
  },
];

// ── HELPER: get only available sizes for a given type + artwork ───────────────
export function getAvailableSizes(printTypeId, availablePrintSizes) {
  const type = PRINT_TYPES.find((t) => t.id === printTypeId);
  if (!type) return [];
  // if artwork has no restriction, all sizes available
  if (!availablePrintSizes || availablePrintSizes.length === 0) return type.sizes;
  return type.sizes.filter((s) => availablePrintSizes.includes(s.id));
}

// ─────────────────────────────────────────────────────────────────────────────
// ARTWORKS
// availablePrintSizes: array of size IDs available for this artwork as a print
//   Size IDs: "s" = 8×14  |  "m" = 11×18  |  "l" = 16×24  |  "xl" = 18×24
//   Leave as [] or omit to make ALL sizes available.
// ─────────────────────────────────────────────────────────────────────────────
export const artworks = [
  {
    id: "1",
    title: "Hanuman — The Devoted",
    description:
      "A masterwork depicting Lord Hanuman in deep meditation, the evening sun casting a warm halo behind his divine form. Layered oil glazes build the ochre and orange tones over weeks of careful work — every brushstroke a quiet act of devotion.",
    price: 45000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m"],   // only 8×14 and 11×18
    category: "Mythological",
    tags: ["mythological", "devotional"],
    medium: "Oil on Canvas",
    dimensions: "24 × 36 inches",
    year: "2024",
    available: true,
    color: "#C4956A",
    emoji: "🙏",
  },
  {
    id: "2",
    title: "Ram Vivah",
    description:
      "The sacred wedding of Lord Ram and Sita, surrounded by sages, celestial beings, and the divine court. An intricate multi-figure composition crafted over months — every face distinct, every gesture intentional.",
    price: 85000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Divine Weddings",
    tags: ["divine weddings", "epic"],
    medium: "Oil on Canvas",
    dimensions: "36 × 48 inches",
    year: "2024",
    available: true,
    color: "#B5654A",
    emoji: "🔥",
  },
  {
    id: "3",
    title: "The Great Assembly",
    description:
      "Sages, rishis, and divine figures gathered in sacred discourse — a scene from the Mahabharata rendered with encyclopedic devotion. The yajna fire glows at the centre, warm light spilling across dozens of unique faces.",
    price: 72000,
    printPrice: 2400,
    availablePrintSizes: ["m", "l"],   // only 11×18 and 16×24
    category: "Mythological",
    tags: ["mythological", "epic"],
    medium: "Oil on Canvas",
    dimensions: "36 × 48 inches",
    year: "2023",
    available: false,
    color: "#8A6A4A",
    emoji: "🕉️",
  },
  {
    id: "4",
    title: "Buddha's Parinirvana",
    description:
      "The moment of the Enlightened One's final departure — monks, disciples, and celestial beings surrounding the serene Tathagata. A painting of profound stillness that rewards quiet contemplation.",
    price: 68000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l"],  // 3 sizes
    category: "Mythological",
    tags: ["mythological", "devotional"],
    medium: "Oil on Canvas",
    dimensions: "30 × 40 inches",
    year: "2023",
    available: true,
    color: "#9A7A5A",
    emoji: "☸️",
  },
  {
    id: "5",
    title: "Govardhan Gathering",
    description:
      "A panoramic devotional scene of sages and devotees assembled at the sacred mountain. All distinct faces, each a meditation in itself, warmth of devotion echoing through every colour.",
    price: 76000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Mythological",
    tags: ["mythological", "devotional"],
    medium: "Oil on Canvas",
    dimensions: "40 × 30 inches",
    year: "2024",
    available: true,
    color: "#7A9A6A",
    emoji: "🏔️",
  },
  {
    id: "6",
    title: "Radha Krishna — Eternal Dance",
    description:
      "The divine couple in the eternal Raas — Krishna's peacock feather catching moonlight, Radha's golden jewels warm against the blue of her beloved. A painting of divine love rendered in the richest oil.",
    price: 55000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Divine Weddings",
    tags: ["divine weddings", "devotional"],
    medium: "Oil on Canvas",
    dimensions: "24 × 36 inches",
    year: "2024",
    available: true,
    color: "#6A7AAA",
    emoji: "🪈",
  },
  {
    id: "7",
    title: "Radha Swayamvara",
    description:
      "The divine union ceremony of Radha and Krishna depicted in luminous oils — celestial flowers rain from above as the two souls unite in an act that transcends time.",
    price: 62000,
    printPrice: 2400,
    availablePrintSizes: ["m", "l", "xl"],  // 3 sizes
    category: "Divine Weddings",
    tags: ["divine weddings"],
    medium: "Oil on Canvas",
    dimensions: "30 × 40 inches",
    year: "2024",
    available: true,
    color: "#AA7A6A",
    emoji: "💐",
  },
  {
    id: "8",
    title: "Shiva in Meditation",
    description:
      "Lord Shiva seated in deep samadhi, the Ganga flowing from his matted locks, the crescent moon a cool silver light above. An atmosphere of absolute stillness and cosmic power.",
    price: 58000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m"],   // only small sizes
    category: "Mythological",
    tags: ["mythological", "devotional"],
    medium: "Oil on Canvas",
    dimensions: "24 × 36 inches",
    year: "2023",
    available: false,
    color: "#6A8AAA",
    emoji: "🌙",
  },
  {
    id: "9",
    title: "Rukmini Vivah",
    description:
      "The divine marriage of Rukmini and Krishna — an epic moment of love and divine will rendered with the same meticulous care Sarvesh brings to every canvas.",
    price: 80000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Divine Weddings",
    tags: ["divine weddings", "epic"],
    medium: "Oil on Canvas",
    dimensions: "40 × 30 inches",
    year: "2024",
    available: true,
    color: "#AA8A6A",
    emoji: "✨",
  },
];

export const CATEGORIES_ORIGINALS = ["All Works", "Mythological", "Divine Weddings"];
export const CATEGORIES_PRINTS    = ["All Prints", "Mythological", "Divine Weddings"];

export const COMMISSION_SIZES = [
  { size: "2' × 3'",   price: "₹90,000"   },
  { size: "3' × 4.5'", price: "₹2,10,000" },
  { size: "4' × 6'",   price: "₹3,40,000" },
  { size: "5' × 7.5'", price: "₹5,60,000" },
];

export const WHATSAPP_NUMBER = "917558411657";
export const WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I'm%20interested%20in%20your%20artwork.`;
export const COMMISSION_WA   = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Sarvesh%2C%20I'd%20like%20to%20commission%20a%20custom%20painting.`;

// ── EmailJS (your real keys) ──────────────────────────────────────────────────
export const EMAILJS_SERVICE           = "service_gl424im";
export const EMAILJS_PUBLIC            = "fx--QoQ_2n-07QhXm";
export const EMAILJS_CUSTOMER_TEMPLATE = "template_v3iv58x";
export const EMAILJS_ADMIN_TEMPLATE    = "template_ufegc2t";