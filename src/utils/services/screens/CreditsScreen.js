import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { COLORS, CREDIT_PACKAGES } from '../utils/constants';
import { updateUserCredits, getUserCredits } from '../services/storage';

export default function CreditsScreen({ navigation }) {
  const [selectedPackage, setSelectedPackage] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handlePurchase = async (pkg) => {
    setProcessing(true);
    
    // Simulate payment (replace with real Paystack integration)
    setTimeout(async () => {
      try {
        await updateUserCredits(pkg.credits);
        const newBalance = await getUserCredits();
        
        Alert.alert(
          'Success! 🎉',
          `You now have ${newBalance} credits`,
          [
            { text: 'OK', onPress: () => navigation.goBack() }
          ]
        );
      } catch (error) {
        Alert.alert('Error', 'Purchase failed');
      } finally {
        setProcessing(false} finally {
        setProcessing(false);
      }
    }, 1500);
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backButton}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Buy Credits</Text>
        <View style={{ width: 60 }} />
      </View>

      <ScrollView style={styles.content}>
        <Text style={styles.subtitle}>
          Choose a package to continue creating stickers
        </Text>

        {CREDIT_PACKAGES.map((pkg) => (
          <TouchableOpacity
            key={pkg.id}
            style={[
              styles.packageCard,
              selectedPackage?.id === pkg.id && styles.packageCardSelected,
              pkg.popular && styles.packageCardPopular,
            ]}
            onPress={() => setSelectedPackage(pkg)}>
            {pkg.popular && (
              <View style={styles.popularBadge}>
                <Text style={styles.popularText}>POPULAR</Text>
              </View>
            )}
            {pkg.bestValue && (
              <View style={styles.bestValueBadge}>
                <Text style={styles.bestValueText}>BEST VALUE</Text>
              </View>
            )}

            <View style={styles.packageHeader}>
              <Text style={styles.packageCredits}>💎 {pkg.credits}</Text>
              <Text style={styles.packagePrice}>₦{pkg.price}</Text>
            </View>
            <Text style={styles.packageLabel}>{pkg.label}</Text>
            <Text style={styles.packagePer}>
              ₦{Math.round(pkg.price / pkg.credits)} per sticker
            </Text>
          </TouchableOpacity>
        ))}

        <View style={styles.features}>
          <Text style={styles.featuresTitle}>What you get:</Text>
          <Text style={styles.featureItem}>✨ AI background removal</Text>
          <Text style={styles.featureItem}>🎨 High-quality stickers</Text>
          <Text style={styles.featureItem}>💾 Export to any platform</Text>
          <Text style={styles.featureItem}>💳 Safe & secure payment</Text>
        </View>
      </ScrollView>

      {/* Purchase Button */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={[
            styles.purchaseButton,
            (!selectedPackage || processing) && styles.purchaseButtonDisabled,
          ]}
          onPress={() => handlePurchase(selectedPackage)}
          disabled={!selectedPackage || processing}>
          <Text style={styles.purchaseButtonText}>
            {processing
              ? 'Processing...'
              : selectedPackage
              ? `Pay ₦${selectedPackage.price}`
              : 'Select a package'}
          </Text>
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
  content: {
    flex: 1,
    padding: 20,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 24,
  },
  packageCard: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: COLORS.border,
    position: 'relative',
  },
  packageCardSelected: {
    borderColor: COLORS.primary,
    backgroundColor: '#FFF5F2',
  },
  packageCardPopular: {
    borderColor: COLORS.primary,
  },
  popularBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: COLORS.primary,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  popularText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  bestValueBadge: {
    position: 'absolute',
    top: -12,
    right: 20,
    backgroundColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  bestValueText: {
    color: COLORS.white,
    fontSize: 10,
    fontWeight: 'bold',
  },
  packageHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  packageCredits: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.text,
  },
  packagePrice: {
    fontSize: 28,
    fontWeight: 'bold',
    color: COLORS.primary,
  },
  packageLabel: {
    fontSize: 16,
    color: COLORS.text,
    marginBottom: 4,
  },
  packagePer: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  features: {
    backgroundColor: COLORS.white,
    borderRadius: 16,
    padding: 20,
    marginTop: 8,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.text,
    marginBottom: 12,
  },
  featureItem: {
    fontSize: 14,
    color: COLORS.text,
    marginBottom: 8,
  },
  footer: {
    padding: 20,
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  purchaseButton: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  purchaseButtonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  purchaseButtonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
});
