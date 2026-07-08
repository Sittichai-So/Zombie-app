import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useTranslation } from 'react-i18next';

import LoginScreen from '../screens/LoginScreen';
import CharacterSelectScreen from '../screens/CharacterSelectScreen';
import HomeScreen from '../screens/HomeScreen';
import CategoriesScreen from '../screens/CategoriesScreen';
import LevelMapScreen from '../screens/LevelMapScreen';
import BattleScreen from '../screens/BattleScreen';
import CharactersScreen from '../screens/CharactersScreen';
import ShopScreen from '../screens/ShopScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';

export type RootStackParamList = {
  Login: undefined;
  CharacterSelect: undefined;
  Home: undefined;
  Categories: undefined;
  LevelMap: { categoryId?: string };
  Battle: { levelId: number; categoryId?: string };
  Characters: undefined;
  Shop: undefined;
  Profile: undefined;
  Settings: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator: React.FC = () => {
  const { t } = useTranslation();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#16213e',
          },
          headerTintColor: '#ffffff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          cardStyle: {
            backgroundColor: '#1a1a2e',
          },
        }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="CharacterSelect"
          component={CharacterSelectScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'หน้าหลัก',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Categories"
          component={CategoriesScreen}
          options={{
            title: 'หมวดหมู่ข้อสอบ',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="LevelMap"
          component={LevelMapScreen}
          options={{
            title: 'เลือกด่าน',
          }}
        />
        <Stack.Screen
          name="Battle"
          component={BattleScreen}
          options={{
            title: 'ต่อสู้',
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Characters"
          component={CharactersScreen}
          options={{
            title: 'ตัวละคร',
          }}
        />
        <Stack.Screen
          name="Shop"
          component={ShopScreen}
          options={{
            title: 'ร้านค้า',
          }}
        />
        <Stack.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            title: 'โปรไฟล์',
          }}
        />
        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            title: 'ตั้งค่า',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;
