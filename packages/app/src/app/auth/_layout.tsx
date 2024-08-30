import { useAuthStore } from '@/store/auth';
import { Redirect, Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'sign-in',
};

export default function Auth() {
  const user = useAuthStore((auth) => auth.user);
  if (user) {
    return <Redirect href='/home' />;
  }
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen
        name='sign-in'
        options={{ headerShown: false }}
      ></Stack.Screen>
      <Stack.Screen
        name='sign-up'
        options={{ headerShown: false }}
      ></Stack.Screen>
    </Stack>
  );
}
