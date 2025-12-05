import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Share from 'react-native-share';
import { COLORS } from '../utils/constants';
import { getMyStickers } from '../services/storage';

export default function MyStickersScreen({ navigation }) {
  const [stickers, setStickers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadStickers();
    
    const unsubscribe = navigation.addListener('focus', loadStickers);
    return unsubscribe;
  }, [navigation]);

  const loadStickers = async () => {
    try {
      const userStickers = await getMyStickers();
      setStickers(userStickers);
    } catch (error) {
      console.error('Error loading stickers:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async (sticker) => {
    try {
      await Share.open({
        url: `file://${sticker.uri}`,
      });
    } catch (error) {
      console.log('Share cancelled');
    }
  };

  const renderSticker = ({ item }) => (
    <TouchableOpacity
      style={styles.stickerCard}
      onPress={() => handleShare(item)}>
      <Image
        source={{ uri: `file://${item.uri}` }}
        style={styles.stickerImage}
        resizeMode="contain"
      />
      {item.hasWatermark && (
        <View style={styles.watermarkBadge}>
          <Text style={styles.watermarkText}>🏷️</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Stickers</Text>
        </View>
        <View style={styles.centered}>
          <Text>Loading...</Text>
        </View>
      </View>
    );
  }

  if (stickers.length === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>My Stickers</Text>
        </View>
        <View style={styles.centered}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyText}>No stickers yet</Text>
          <Text style={styles.emptySubtext}>
            Create your first sticker to see it here
          </Text>
          <TouchableOpacity
            style={styles.createButton}
            onPress={() => navigation.navigate('Home')}>
            <Text style={styles.createButtonText}>Create Sticker</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Stickers</Text>
        <Text style={styles.count}>{stickers.length} total</Text>
      </View>

      <FlatList
        data={stickers}
        renderItem={renderSticker}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.list}
        columnWrapperStyle={styles.row}
      />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  count: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  list: {
    padding: 16,
  },
  row: {
    justifyContent: 'space-between',
  },
  stickerCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  stickerImage: {
    width: '100%',
    height: '100%',
  },
  watermarkBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: 'rgba(0,0,0,0.5)',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  watermarkText: {
    fontSize: 12,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  createButton: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  createButtonText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: 'bold',
  },
});
