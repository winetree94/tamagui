import { useAuthStore } from '@/store/auth';
import { Redirect, Stack } from 'expo-router';

export default function HomeLayout() {
  const user = useAuthStore((auth) => auth.user);

  if (!user) {
    return <Redirect href='/auth/sign-in' />;
  }

  return (
    <Stack>
      <Stack.Screen name='(tabs)' options={{ headerShown: false }} />
      <Stack.Screen name='+not-found' />
    </Stack>
  );
}
