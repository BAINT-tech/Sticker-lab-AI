import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import PacksScreen from './src/screens/PacksScreen';
import MyStickersScreen from './src/screens/MyStickersScreen';
import LoginScreen from './src/screens/LoginScreen';
import PreviewScreen from './src/screens/PreviewScreen';
import CreditsScreen from './src/screens/CreditsScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: '#FF6B35',
        tabBarInactiveTintColor: '#8E8E93',
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: '#E5E5EA',
          height: 60,
          paddingBottom: 8,
        },
      }}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen}
        options={{ 
          tabBarLabel: 'Create',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>✨</Text>
        }}
      />
      <Tab.Screen 
        name="Packs" 
        component={PacksScreen}
        options={{ 
          tabBarLabel: 'Packs',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>📦</Text>
        }}
      />
      <Tab.Screen 
        name="MyStickers" 
        component={MyStickersScreen}
        options={{ 
          tabBarLabel: 'My Stickers',
          tabBarIcon: ({ color }) => <Text style={{ fontSize: 24 }}>💾</Text>
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const user = await AsyncStorage.getItem('user');
      setIsLoggedIn(!!user);
    } catch (error) {
      console.error('Error checking login:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return null; // Add a splash screen here if you want
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="Preview" component={PreviewScreen} />
            <Stack.Screen name="Credits" component={CreditsScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
