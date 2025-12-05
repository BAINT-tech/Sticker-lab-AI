import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { COLORS, STICKER_PACKS } from '../utils/constants';

export default function PacksScreen() {
  const handlePurchasePack = (pack) => {
    if (pack.isFree) {
      Alert.alert('Free Pack', 'This pack is free! Download now?', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Download', onPress: () => downloadPack(pack) },
      ]);
    } else {
      Alert.alert(
        pack.name,
        `Purchase this pack for ₦${pack.price}?`,
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Buy Now', onPress: () => purchasePack(pack) },
        ]
      );
    }
  };

  const downloadPack = (pack) => {
    Alert.alert('Success!', `${pack.name} downloaded successfully`);
  };

  const purchasePack = (pack) => {
    // Implement Paystack payment here
    Alert.alert('Coming Soon', 'Payment integration in progress');
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Sticker Packs</Text>
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>
          Browse and download amazing sticker packs
        </Text>

        {STICKER_PACKS.map((pack) => (
          <TouchableOpacity
            key={pack.id}
            style={styles.packCard}
            onPress={() => handlePurchasePack(pack)}>
            <View style={styles.packPreview}>
              {pack.preview.map((emoji, index) => (
                <Text key={index} style={styles.previewEmoji}>
                  {emoji}
                </Text>
              ))}
            </View>

            <View style={styles.packInfo}>
              <View style={styles.packHeader}>
                <Text style={styles.packName}>{pack.name}</Text>
                {pack.isFree ? (
                  <View style={styles.freeBadge}>
                    <Text style={styles.freeText}>FREE</Text>
                  </View>
                ) : (
                  <Text style={styles.packPrice}>₦{pack.price}</Text>
                )}
              </View>

              <Text style={styles.packCount}>
                {pack.stickerCount} stickers
              </Text>

              <TouchableOpacity
                style={[
                  styles.packButton,
                  pack.isFree && styles.packButtonFree,
                ]}>
                <Text
                  style={[
                    styles.packButtonText,
                    pack.isFree && styles.packButtonTextFree,
                  ]}>
                  {pack.isFree ? 'Download' : 'Buy Now'}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}

        <View style={styles.comingSoon}>
          <Text style={styles.comingSoonText}>
            🎨 More packs coming soon!
          </Text>
          <Text style={styles.comingSoonSubtext}>
            Request custom packs or suggest ideas
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  header: {
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
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    marginBottom: 20,
  },
  packCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  packPreview: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 100,
    marginRight: 16,
  },
  previewEmoji: {
    fontSize: 32,
    width: 40,
    height: 40,
    textAlign: 'center',
  },
  packInfo: {
    flex: 1,
  },
  packHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  packName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: COLORS.text,
    flex: 1,
  },
  packPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  freeBadge: {
    backgroundColor: COLORS.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  freeText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  packCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  packButton: {
    backgroundColor: COLORS.primary,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  packButtonFree: {
    backgroundColor: COLORS.success,
  },
  packButtonText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: 'bold',
  },
  packButtonTextFree: {
    color: COLORS.white,
  },
  comingSoon: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginTop: 8,
  },
  comingSoonText: {
    fontSize: 18,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  comingSoonSubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
  },
});
