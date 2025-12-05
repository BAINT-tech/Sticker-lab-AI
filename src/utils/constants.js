export const COLORS = {
  primary: '#FF6B35',
  secondary: '#004E89',
  background: '#F7F7F7',
  text: '#1C1C1E',
  textSecondary: '#8E8E93',
  white: '#FFFFFF',
  border: '#E5E5EA',
  success: '#34C759',
  error: '#FF3B30',
};

export const CREDIT_PACKAGES = [
  { id: 1, credits: 1, price: 50, label: '1 Sticker' },
  { id: 2, credits: 3, price: 100, label: '3 Stickers', popular: true },
  { id: 3, credits: 10, price: 300, label: '10 Stickers' },
  { id: 4, credits: 30, price: 800, label: '30 Stickers', bestValue: true },
];

export const STICKER_PACKS = [
  {
    id: 1,
    name: 'Love & Romance',
    price: 0,
    stickerCount: 12,
    preview: ['❤️', '💕', '😍', '💑'],
    isFree: true,
  },
  {
    id: 2,
    name: 'Naija Vibes',
    price: 300,
    stickerCount: 15,
    preview: ['🇳🇬', '🍛', '🚕', '💃'],
    isFree: false,
  },
  {
    id: 3,
    name: 'Meme Pack',
    price: 500,
    stickerCount: 20,
    preview: ['😂', '🤣', '💀', '🔥'],
    isFree: false,
  },
  {
    id: 4,
    name: 'Office Life',
    price: 400,
    stickerCount: 18,
    preview: ['💼', '☕', '💻', '📊'],
    isFree: false,
  },
];

// Get your API key from https://remove.bg/api
export const REMOVE_BG_API_KEY = 'WgBXuLvHCTuNGbn4cmtqiGTQ';
