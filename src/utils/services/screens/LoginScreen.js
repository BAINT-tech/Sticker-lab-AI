import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { COLORS } from '../utils/constants';

export default function LoginScreen({ navigation }) {
  const [phone, setPhone] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (phone.length < 10) {
      Alert.alert('Invalid Phone', 'Please enter a valid phone number');
      return;
    }

    setLoading(true);
    
    // Simulate login (replace with real Firebase Auth later)
    setTimeout(async () => {
      try {
        const user = {
          phone,
          id: Date.now().toString(),
          credits: 3, // Give 3 free credits
        };
        
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('userCredits', '3');
        
        navigation.replace('MainTabs');
      } catch (error) {
        Alert.alert('Error', 'Failed to login');
      } finally {
        setLoading(false);
      }
    }, 1000);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.logo}>✨</Text>
        <Text style={styles.title}>Sticker Lab</Text>
        <Text style={styles.subtitle}>
          Create amazing stickers from your photos
        </Text>

        <View style={styles.form}>
          <Text style={styles.label}>Phone Number</Text>
          <TextInput
            style={styles.input}
            placeholder="080 1234 5678"
            keyboardType="phone-pad"
            value={phone}
            onChangeText={setPhone}
            maxLength={11}
          />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleLogin}
            disabled={loading}>
            <Text style={styles.buttonText}>
              {loading ? 'Logging in...' : 'Get Started'}
            </Text>
          </TouchableOpacity>

          <Text style={styles.bonus}>
            🎁 Get 3 free credits to start!
          </Text>
        </View>
      </View>

      <Text style={styles.footer}>
        By continuing, you agree to our Terms & Privacy Policy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  logo: {
    fontSize: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.primary,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: COLORS.textSecondary,
    textAlign: 'center',
    marginBottom: 48,
  },
  form: {
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 8,
  },
  input: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: COLORS.primary,
    padding: 18,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: COLORS.textSecondary,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: 'bold',
  },
  bonus: {
    textAlign: 'center',
    marginTop: 16,
    fontSize: 14,
    color: COLORS.success,
    fontWeight: '600',
  },
  footer: {
    textAlign: 'center',
    padding: 24,
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
