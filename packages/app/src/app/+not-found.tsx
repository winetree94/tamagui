import { useAuthStore } from '@/store/auth';
import { Redirect } from 'expo-router';

export default function NotFoundScreen() {
  const user = useAuthStore((auth) => auth.user);

  if (user) {
    return <Redirect href='/home' />;
  } else {
    return <Redirect href='/auth' />;
  }
}
