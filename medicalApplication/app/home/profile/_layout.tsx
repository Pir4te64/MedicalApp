// app/home/profile/_layout.tsx
import React from 'react';
import { Stack } from 'expo-router';

const ProfileLayout = () => {
  return (
    <Stack>
      {/* Perfil Screen */}
      <Stack.Screen
        name="index" // ProfileScreen
        options={{
          title: 'Perfil',
          headerShown: false,
        }}
      />
      
      
    </Stack>
  );
};

export default ProfileLayout;
