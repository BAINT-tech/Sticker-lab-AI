import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSticker = async (stickerData) => {
  try {
    const stickers = await getMyStickers();
    const newSticker = {
      id: Date.now().toString(),
      uri: stickerData.uri,
      hasWatermark: stickerData.hasWatermark,
      createdAt: new Date().toISOString(),
    };
    
    stickers.push(newSticker);
    await AsyncStorage.setItem('myStickers', JSON.stringify(stickers));
    return newSticker;
  } catch (error) {
    console.error('Save sticker error:', error);
    throw error;
  }
};

export const getMyStickers = async () => {
  try {
    const stickers = await AsyncStorage.getItem('myStickers');
    return stickers ? JSON.parse(stickers) : [];
  } catch (error) {
    console.error('Get stickers error:', error);
    return [];
  }
};

export const getUserCredits = async () => {
  try {
    const credits = await AsyncStorage.getItem('userCredits');
    return credits ? parseInt(credits) : 0;
  } catch (error) {
    return 0;
  }
};

export const updateUserCredits = async (amount) => {
  try {
    const currentCredits = await getUserCredits();
    const newCredits = currentCredits + amount;
    await AsyncStorage.setItem('userCredits', newCredits.toString());
    return newCredits;
  } catch (error) {
    throw error;
  }
};

export const deductCredit = async () => {
  return await updateUserCredits(-1);
};
