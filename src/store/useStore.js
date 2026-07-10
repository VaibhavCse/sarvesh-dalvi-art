import { create } from 'zustand';

const DISCOUNT_THRESHOLD = 3;   // 3+ originals
const DISCOUNT_RATE      = 0.10; // 10%

const useStore = create((set, get) => ({

  // ─── CART ────────────────────────────────────────────────────────────────
  cart: [],

  /**
   * addToCart(artwork, isPrint, sizeKey)
   *
   * For originals  → cartKey = "1", "2", etc.
   * For prints     → cartKey = "1-print-stretched-l"
   *   so the same artwork in different type+size combos can coexist in cart.
   *
   * sizeKey = "stretched-l" | "rolled-m" etc.  (typeId-sizeId)
   * Returns true if added, false if already exists.
   */
  addToCart: (artwork, isPrint = false, sizeKey = null) => {
    const cartKey = isPrint
      ? `${artwork.id}-print-${sizeKey ?? 'default'}`
      : String(artwork.id);

    if (get().cart.find((c) => c.cartKey === cartKey)) return false;

    set((s) => ({
      cart: [
        ...s.cart,
        {
          ...artwork,
          cartKey,
          isPrint,
          sizeKey,
          // unitPrice: for prints use the selected size price passed in artwork.printPrice
          unitPrice: isPrint ? (artwork.printPrice ?? 0) : artwork.price,
        },
      ],
    }));
    return true;
  },

  removeFromCart: (cartKey) =>
    set((s) => ({ cart: s.cart.filter((c) => c.cartKey !== cartKey) })),

  clearCart: () => set({ cart: [] }),

  // ─── TOTALS ───────────────────────────────────────────────────────────────
  getSubtotal: () =>
    get().cart.reduce((sum, item) => sum + item.unitPrice, 0),

  getDiscount: () => {
    const originals = get().cart.filter((c) => !c.isPrint).length;
    if (originals < DISCOUNT_THRESHOLD) return 0;
    return Math.round(get().getSubtotal() * DISCOUNT_RATE);
  },

  getTotal: () => get().getSubtotal() - get().getDiscount(),

  // ─── UI STATE ─────────────────────────────────────────────────────────────
  cartOpen:     false,
  checkoutOpen: false,

  toggleCart:    () => set((s) => ({ cartOpen: !s.cartOpen })),
  closeCart:     () => set({ cartOpen: false }),
  openCheckout:  () => set({ checkoutOpen: true, cartOpen: false }),
  closeCheckout: () => set({ checkoutOpen: false }),

  // ─── WISHLIST ─────────────────────────────────────────────────────────────
  wishlist: [],

  toggleWishlist: (id) =>
    set((s) => ({
      wishlist: s.wishlist.includes(id)
        ? s.wishlist.filter((w) => w !== id)
        : [...s.wishlist, id],
    })),

  isWishlisted: (id) => get().wishlist.includes(id),
}));

export default useStore;
