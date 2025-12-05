import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { COLORS } from '../utils/constants';
import { getUserCredits, deductCredit, saveSticker } from '../services/storage';
import { removeBackground } from '../services/imageProcessor';

export default function HomeScreen({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [processing, setProcessing] = useState(false);
  const [credits, setCredits] = useState(0);

  useEffect(() => {
    loadCredits();
    
    // Refresh credits when screen comes into focus
    const unsubscribe = navigation.addListener('focus', loadCredits);
    return unsubscribe;
  }, [navigation]);

  const loadCredits = async () => {
    const userCredits = await getUserCredits();
    setCredits(userCredits);
  };

  const pickImage = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      quality: 1,
    });

    if (result.assets && result.assets[0]) {
      setSelectedImage(result.assets[0]);
    }
  };

  const createSticker = async () => {
    if (!selectedImage) {
      Alert.alert('No Image', 'Please select an image first');
      return;
    }

    if (credits < 1) {
      Alert.alert(
        'No Credits',
        'You need credits to create stickers. Buy credits now?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Buy Credits', onPress: () => navigation.navigate('Credits') },
        ]
      );
      return;
    }

    setProcessing(true);
    
    try {
      // Remove background
      const processedImage = await removeBackground(selectedImage.uri);
      
      // Deduct credit
      await deductCredit();
      await loadCredits();
      
      // Save sticker
      await saveSticker({
        uri: processedImage,
        hasWatermark: true,
      });
      
      // Navigate to preview
      navigation.navigate('Preview', {
        imageUri: processedImage,
        hasWatermark: true,
      });
      
      setSelectedImage(null);
    } catch (error) {
      Alert.alert('Error', error.message || 'Failed to create sticker');
    } finally {
      setProcessing(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sticker Lab</Text>
        <View style={styles.creditsContainer}>
          <Text style={styles.creditsText}>💎 {credits}</Text>
          <TouchableOpacity 
            style={styles.buyButton}
            onPress={() => navigation.navigate('Credits')}>
            <Text style={styles.buyButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Content */}
      <View style={styles.content}>
        {selectedImage ? (
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: selectedImage.uri }} 
              style={styles.previewImage}
              resizeMode="contain"
            />
            <TouchableOpacity 
              style={styles.changeButton}
              onPress={pickImage}>
              <Text style={styles.changeButtonText}>Change Photo</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.uploadBox}
            onPress={pickImage}>
            <Text style={styles.uploadIcon}>📷</Text>
            <Text style={styles.uploadText}>Tap to Upload Photo</Text>
            <Text style={styles.uploadSubtext}>
              Background will be removed automatically
            </Text>
          </TouchableOpacity>
        )}

        {/* Create Button */}
        <TouchableOpacity
          style={[
            styles.createButton,
            (!selectedImage || processing) && styles.createButtonDisabled,
          ]}
          onPress={createSticker}
          disabled={!selectedImage || processing}>
          {processing ? (
            <ActivityIndicator color={COLORS.white} />
          ) : (
            <Text style={styles.createButtonText}>
              Create Sticker (1 credit)
            </Text>
          )}
        </TouchableOpacity>

        {/* Info */}
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>✨ Auto background removal</Text>
          <Text style={styles.infoText}>🎨 Free watermark version</Text>
          <Text style={styles.infoText}>💾 Export to WhatsApp & more</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.border,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  creditsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  creditsText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
  },
  buyButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: COLORS.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buyButtonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  uploadBox: {
    height: 300,
    backgroundColor: COLORS.white,
    borderRadius: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderColor: COLORS.border,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  uploadIcon: {
    fontSize: 64,
    marginBottom: 12,
  },
  uploadText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  uploadSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  previewImage: {
    width: '100%',
    height: 300,
    borderRadius: 16,
    backgroundColor: COLORS.white,
  },
  changeButton: {
    marginTop: 12,
    padding: 12,
    backgroundColor: COLORS.white,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
    alignItems: 'center',
  },
  changeButtonText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  createButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  createButtonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  createButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  infoBox: {
    backgroundColor: COLORS.white,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  infoText: {
    fontSize: 14,
    color: COLORS.text,
  },
});
