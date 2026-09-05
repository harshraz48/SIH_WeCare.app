import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Assuming your login file is named login.tsx or index.tsx */}
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      
      {/* Customizes the header for profile.tsx */}
      <Stack.Screen 
        name="profile" 
        options={{ title: 'My Profile' }} 
      />
    </Stack>
  );
}