import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Share from 'react-native-share';
import RNFS from 'react-native-fs';
import { COLORS } from '../utils/constants';

export default function PreviewScreen({ route, navigation }) {
  const { imageUri, hasWatermark } = route.params;

  const shareToWhatsApp = async () => {
    try {
      await Share.open({
        url: `file://${imageUri}`,
        social: Share.Social.WHATSAPP,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share to WhatsApp');
    }
  };

  const shareToTelegram = async () => {
    try {
      await Share.open({
        url: `file://${imageUri}`,
        social: Share.Social.TELEGRAM,
      });
    } catch (error) {
      Alert.alert('Error', 'Failed to share to Telegram');
    }
  };

  const saveToGallery = async () => {
    try {
      const destPath = `${RNFS.PicturesDirectoryPath}/StickerLab_${Date.now()}.png`;
      await RNFS.copyFile(imageUri, destPath);
      Alert.alert('Success', 'Sticker saved to gallery!');
    } catch (error) {
      Alert.alert('Error', 'Failed to save sticker');
    }
  };

  const removeWatermark = () => {
    Alert.alert(
      'Remove Watermark',
      'Pay ₦50 to remove watermark from this sticker?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Pay ₦50', onPress: () => {
          // Implement payment here
          Alert.alert('Coming Soon', 'Payment integration in progress');
        }},
      ]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Your Sticker</Text>
        <View style={{ width: 60 }} />
      </View>

      {/* Preview */}
      <View style={styles.previewContainer}>
        <Image 
          source={{ uri: `file://${imageUri}` }} 
          style={styles.previewImage}
          resizeMode="contain"
        />
        {hasWatermark && (
          <View style={styles.watermarkBadge}>
            <Text style={styles.watermarkText}>Sticker Lab</Text>
          </View>
        )}
      </View>

      {/* Actions */}
      <View style={styles.actions}>
        {hasWatermark && (
          <TouchableOpacity 
            style={styles.removeWatermarkButton}
            onPress={removeWatermark}>
            <Text style={styles.removeWatermarkText}>
              ✨ Remove Watermark (₦50)
            </Text>
          </TouchableOpacity>
        )}

        <Text style={styles.sectionTitle}>Share To:</Text>
        
        <View style={styles.shareButtons}>
          <TouchableOpacity 
            style={styles.shareButton}
            onPress={shareToWhatsApp}>
            <Text style={styles.shareIcon}>💬</Text>
            <Text style={styles.shareLabel}>WhatsApp</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.shareButton}
            onPress={shareToTelegram}>
            <Text style={styles.shareIcon}>✈️</Text>
            <Text style={styles.shareLabel}>Telegram</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.shareButton}
            onPress={saveToGallery}>
            <Text style={styles.shareIcon}>💾</Text>
            <Text style={styles.shareLabel}>Save</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.doneButton}
          onPress={() => navigation.navigate('Home')}>
          <Text style={styles.doneButtonText}>Done</Text>
        </TouchableOpacity>
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
  backButton: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  watermarkBadge: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 8,
    borderRadius: 6,
  },
  watermarkText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '600',
  },
  actions: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  removeWatermarkButton: {
    backgroundColor: COLORS.primary,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  removeWatermarkText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  shareButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  shareButton: {
    alignItems: 'center',
    padding: 12,
  },
  shareIcon: {
    fontSize: 40,
    marginBottom: 8,
  },
  shareLabel: {
    fontSize: 12,
    color: COLORS.text,
  },
  doneButton: {
    backgroundColor: COLORS.background,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  doneButtonText: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '600',
  },
});
