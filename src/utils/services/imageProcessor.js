import axios from 'axios';
import RNFS from 'react-native-fs';
import { REMOVE_BG_API_KEY } from '../utils/constants';

export const removeBackground = async (imageUri) => {
  try {
    // Read image as base64
    const base64Image = await RNFS.readFile(imageUri, 'base64');
    
    // Call Remove.bg API
    const response = await axios.post(
      'https://api.remove.bg/v1.0/removebg',
      {
        image_file_b64: base64Image,
        size: 'preview', // Use 'regular' for production
      },
      {
        headers: {
          'X-Api-Key': REMOVE_BG_API_KEY,
        },
        responseType: 'arraybuffer',
      }
    );

    // Convert response to base64
    const base64Result = Buffer.from(response.data, 'binary').toString('base64');
    
    // Save to temp file
    const outputPath = `${RNFS.CachesDirectoryPath}/sticker_${Date.now()}.png`;
    await RNFS.writeFile(outputPath, base64Result, 'base64');
    
    return outputPath;
  } catch (error) {
    console.error('Background removal error:', error);
    throw new Error('Failed to remove background');
  }
};

export const addWatermark = async (imageUri, isPaid = false) => {
  if (isPaid) return imageUri;
  
  // For now, return as-is. In production, use react-native-image-watermark
  // or a Canvas library to add "Sticker Lab" text
  return imageUri;
};

export const optimizeForSticker = async (imageUri) => {
  // Resize to 512x512 (WhatsApp sticker standard)
  // Use react-native-image-resizer
  return imageUri;
};
