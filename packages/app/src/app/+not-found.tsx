import { useAuthStore } from '@/store/auth';
import { Redirect } from 'expo-router';

export default function NotFoundScreen() {
  const uid = useAuthStore((auth) => auth.uid);

  if (uid) {
    return <Redirect href='/home' />;
  } else {
    return <Redirect href='/auth' />;
  }
}
