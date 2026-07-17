import Shiv_parvati_kalyanam from "../images/originals/Shiv_parvati_kalyanam.jpg";
import Vishwaroop from "../images/originals/Vishwaroop.jpg";
import Srinivasa_Kalyanam from "../images/originals/Srinivasa_Kalyanam.jpg";
import Ganesha_A_Childs_Innocent_Prayer from "../images/originals/Ganesha_child.jpg";
import Lord_Venkateswara from "../images/originals/Lord_Venkateswara.jpg";
import Krishna_Balarama_in_Vrindavan from "../images/originals/Krishna_Balarama.jpg";
import Hanuman_Eternal_Devotion from "../images/originals/Hanuman_Eternal_Devotion.jpg";
import Annapurna_Devi from "../images/originals/Annapurna_Devi.jpg";
import Krishna_Under_the_Moonlight from "../images/originals/Krishna_Under_the_Moonlight.jpg";
import Godess_Annapurna from "../images/originals/Godess_Annapurna.jpg";
import Lord_Venkateswara_Supreme_Protector from "../images/originals/Lord_Venkateswara_The_Supreme_Protector.jpg";
import Child_Hanuman_Innocent_Devotion from "../images/originals/Child_Hanuman.jpg";
import Radha_Krishna_Divine_Swing from "../images/originals/Radha_Krishna.png";
import Ardhanarishvara_Divine_Union from "../images/originals/Ardhanarishvara.jpg";


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
    title: "Shiv Parvati Kalyanam",
    image: Shiv_parvati_kalyanam,
    description:
      "This painting depicts the divine wedding of Lord Shiva and Goddess Parvati, symbolizing the eternal union of devotion, love, and cosmic balance. At the center, the sacred marriage ceremony unfolds around the holy fire, with Lord Vishnu performing the Kanyadaan and revered sages chanting Vedic hymns. The celebration is witnessed by gods, goddesses, saints, Shiva Ganas, Nandi, and celestial musicians, each adding life and devotion to the scene. Set against the majestic Himalayas, this artwork blends mythology with my artistic vision, capturing the grandeur, spirituality, and timeless beauty of one of Hinduism’s most sacred events.",
    price: 340000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m"],   // only 8×14 and 11×18
    category: "Mythological",
    tags: ["mythological", "devotional"],
    medium: "Oil on Linen",
    dimensions: "7/4 ft",
    year: "2026",
    available: false,
    color: "#C4956A",
  },
  {
    id: "2",
    title: "Vishwaroop",
    image: Vishwaroop,
    description:
      "The Cosmic Form of the Divine - This painting depicts the majestic Vishwaroop, where the Supreme Lord reveals His infinite cosmic form. Surrounded by the universe and embodying multiple divine manifestations, the artwork symbolizes the unity of all creation and the eternal presence of the Divine beyond time and space",
    price: 240000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Mythological",
    tags: ["mythological", "devotional"],
    medium: "Oil on Canvas",
    dimensions: "8/6 ft ",
    year: "2024",
    available: false,
    color: "#B5654A",
  },
  {
    id: "3",
    title: "Srinivasa Kalyanam",
    description:
      "The celestial wedding of Lord Srinivasa and Goddess Padmavati is portrayed with divine grandeur. Surrounded by sages, deities, and devotees, the painting celebrates the sacred union that represents eternal love and dharma.",
    price: 320000,
    printPrice: 2400,
    availablePrintSizes: ["m", "l"],   // only 11×18 and 16×24
    category: "Mythological",
    tags: ["mythological", "epic"],
    medium: "Oil on Linen",
    dimensions: "7/4 ft",
    year: "2025",
    available: false,
    color: "#8A6A4A",
    image: Srinivasa_Kalyanam,
  },
  {
    id: "4",
    title: "Ganesha – A Child’s Innocent Prayer",
    description:
      "A heartfelt moment where a child offers devotion to Lord Ganesha. The painting beautifully captures innocence, faith, and the compassionate presence of the remover of obstacles.",
    price: 150000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l"],  // 3 sizes
    category: "Divine",
    tags: ["divine weddings", "devotional"],
    medium: "Oil on Linen",
    dimensions: "2/1.5 ft",
    year: "2025",
    available: false,
    color: "#9A7A5A",
    image: Ganesha_A_Childs_Innocent_Prayer,
  },
  {
    id: "5",
    title: "Lord Venkateswara",
    description:
      "Standing in majestic stillness, Lord Venkateswara radiates divine protection and compassion. Rich ornaments and traditional floral garlands reflect the timeless spiritual magnificence of Tirumala.",
    price: 130000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Mythological",
    tags: ["mythological", "devotional"],
    medium: "Oil on Linen ",
    dimensions: "4.5/3 ft",
    year: "2025",
    available: false,
    color: "#7A9A6A",
    image: Lord_Venkateswara,
  },
  {
    id: "6",
    title: "Krishna & Balarama in Vrindavan",
    description:
      "Lord Krishna and Balarama walk joyfully through the lush meadows of Vrindavan, surrounded by cows and nature. The painting captures the innocence, harmony, and divine beauty of their childhood pastimes.",
    price: 60000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Mythological",
    tags: ["mythological", "devotional"],
    medium: "Oil on Linen ",
    dimensions: "2/3 ft",
    year: "2025",
    available: false,
    color: "#6A7AAA",
    image: Krishna_Balarama_in_Vrindavan,
  },
  {
    id: "7",
    title: "Hanuman’s Eternal Devotion",
    description:
      "In deep meditation, Lord Hanuman offers his heart and soul to Shri Rama, Sita, and Lakshmana. This artwork symbolizes unwavering faith, humility, and selfless devotion.",
    price: 250000,
    printPrice: 2400,
    availablePrintSizes: ["m", "l", "xl"],  // 3 sizes
    category: "Divine",
    tags: ["divine weddings"],
    medium: "Oil on Linen",
    dimensions: "6/4 ft ",
    year: "2026",
    available: false,
    color: "#AA7A6A",
    image: Hanuman_Eternal_Devotion,
  },
  {
    id: "8",
    title: "Annapurna Devi – The Divine Nourisher (Varanasi)",
    description:
      "Goddess Annapurna lovingly serves food to Lord Shiva on the sacred ghats of Kashi, symbolizing that nourishment is the highest form of compassion. The painting celebrates abundance, humility, and the eternal bond between the Divine Mother and the universe.",
    price: 60000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m"],   // only small sizes
    category: "Mythological",
    tags: ["mythological", "devotional"],
    medium: "Oil on Linen ",
    dimensions: "2/3 ft",
    year: "2026",
    available: false,
    color: "#6A8AAA",
    image: Annapurna_Devi,
  },
  {
    id: "9",
    title: "Krishna Under the Moonlight",
    description:
      "Bathed in the soft glow of the moon, Lord Krishna plays his enchanting flute amidst blooming lotuses. The serene atmosphere reflects divine love, peace, and the soul’s longing for the Supreme.",
    price: 80000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Divine",
    tags: ["divine weddings", "epic"],
    medium: "Oil on Linen",
    dimensions: "3/3 ft",
    year: "2025",
    available: false,
    color: "#AA8A6A",
    image: Krishna_Under_the_Moonlight,
  },
  {
    id: "10",
    title: "Godess Annapurna",
    description:
      "Goddess Annapurna, the eternal giver of nourishment, is portrayed in a serene and majestic form. Holding the sacred pot of food, she symbolizes abundance, compassion, and the divine blessing that sustains all life. The warm temple atmosphere and glowing lamps enhance the painting’s sense of peace, devotion, and spiritual grace.",
    price: 60000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Divine",
    tags: ["divine weddings", "epic"],
    medium: "Oil on Linen",
    dimensions: "2/3 ft",
    year: "2026",
    available: false,
    color: "#AA8A6A",
    image: Godess_Annapurna,
  },
  {
    id: "11",
    title: "Lord Venkateswara – The Supreme Protector",
    description:
      "Adorned with vibrant garlands beneath the sacred arch, Lord Venkateswara stands as the eternal guardian of his devotees. The artwork reflects unwavering faith, blessings, and divine grace.",
    price: 60000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Divine",
    tags: ["divine weddings", "epic"],
    medium: "Oil on Linen",
    dimensions: "2/3 ft",
    year: "2025",
    available: false,
    color: "#AA8A6A",
    image: Lord_Venkateswara_Supreme_Protector,
  },
  {
    id: "12",
    title: "Child Hanuman – Innocent Devotion",
    description:
      "Depicted in his childhood form, Hanuman offers a lotus to Lord Rama with pure love and unwavering devotion. The gentle smile and folded hands capture the innocence of a child whose heart belongs entirely to his Lord. This painting reflects the beauty of selfless faith, humility, and the eternal bond between the devotee and the Divine.",
    price: 40000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Mythological",
    tags: ["mythological", "epic"],
    medium: "Oil on Linen",
    dimensions: "2/3 ft",
    year: "2024",
    available: true,
    color: "#AA8A6A",
    image: Child_Hanuman_Innocent_Devotion,
  },
  {
    id: "13",
    title: "Radha Krishna – The Divine Swing",
    description:
      "Seated together on a flower-adorned swing beneath a flourishing tree, Radha and Krishna share a moment of divine love and eternal companionship. Surrounded by birds, butterflies, and the beauty of nature, the painting captures the harmony, joy, and spiritual bliss that their presence brings to creation.",
    price: 120000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Divine",
    tags: ["divine weddings", "epic"],
    medium: "Oil on Linen",
    dimensions: "3/4 ft",
    year: "2025",
    available: false,
    color: "#AA8A6A",
    image: Radha_Krishna_Divine_Swing,
  },
  {
    id: "14",
    title: "Ardhanarishvara – The Divine Union",
    description:
      "This painting portrays Ardhanarishvara, the sacred union of Lord Shiva and Goddess Parvati in a single divine form. Seated upon a blooming lotus and surrounded by revered sages and deities, the artwork symbolizes the perfect balance of masculine and feminine energies, reminding us that creation flourishes through harmony, unity, and completeness.",
    price: 30000,
    printPrice: 2400,
    availablePrintSizes: ["s", "m", "l", "xl"],  // all sizes
    category: "Divine",
    tags: ["divine weddings", "epic"],
    medium: "Oil on Linen",
    dimensions: "2/15 ft",
    year: "2025",
    available: false,
    color: "#AA8A6A",
    image: Ardhanarishvara_Divine_Union,
  },
];

export const CATEGORIES_ORIGINALS = ["All Works", "Mythological", "Divine"];
export const CATEGORIES_PRINTS    = ["All Prints", "Mythological", "Divine"];

export const COMMISSION_SIZES = [
  { size: "3/2 ft",   price: "₹75,000"   },
  { size: "4.5/3 ft", price: "₹1,80,000" },
  { size: "4/6 ft",   price: "₹3,00,000" },
  { size: "7.5/5 ft", price: "₹4,20,000" },
];

export const WHATSAPP_NUMBER = "917558411657";
export const WHATSAPP_URL    = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%2C%20I'm%20interested%20in%20your%20artwork.`;
export const COMMISSION_WA   = `https://wa.me/${WHATSAPP_NUMBER}?text=Hi%20Sarvesh%2C%20I'd%20like%20to%20commission%20a%20custom%20painting.`;

// ── EmailJS (your real keys) ──────────────────────────────────────────────────
export const EMAILJS_SERVICE           = "service_gl424im";
export const EMAILJS_PUBLIC            = "fx--QoQ_2n-07QhXm";
export const EMAILJS_CUSTOMER_TEMPLATE = "template_v3iv58x";
export const EMAILJS_ADMIN_TEMPLATE    = "template_ufegc2t";