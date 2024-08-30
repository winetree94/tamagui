import { useAuthStore } from '@/store/auth';
import { Redirect, Stack } from 'expo-router';

export const unstable_settings = {
  // Ensure that reloading on `/modal` keeps a back button present.
  initialRouteName: 'sign-in',
};

export default function Auth() {
  const uid = useAuthStore((auth) => auth.uid);
  if (uid) {
    return <Redirect href='/home' />;
  }
  return <Stack screenOptions={{ headerShown: false }} />;
}
