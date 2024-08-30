import { useAuthStore } from '@/store/auth';
import { Redirect, Stack } from 'expo-router';

export default function HomeLayout() {
  const uid = useAuthStore((auth) => auth.uid);

  if (!uid) {
    return <Redirect href='/auth/sign-in' />;
  }

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='+not-found' />
    </Stack>
  );
}
