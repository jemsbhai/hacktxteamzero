import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import LoginScreen from './LoginScreen/LoginScreen';
import HutRec from './HutRec/HutRec';

const Tab = createMaterialBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Hut"
      activeColor="#009DE0"
      inactiveColor="white"
      labelStyle={{ fontSize: 12 }}
      barStyle={{ backgroundColor: '#153745' }}
    >
      <Tab.Screen
        name="Hut"
        component={HutRec}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Timeline"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Timeline',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="timeline-plus" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={LoginScreen}
        options={{
          tabBarLabel: 'Settings',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function Botnav() {
    return (
        <MyTabs />
    );
  }