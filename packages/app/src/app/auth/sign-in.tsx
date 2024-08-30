import { useAuthStore } from '@/store/auth';
import { useRouter } from 'expo-router';
import React from 'react';
import { Button, Form, H4, Input, Spinner, YStack } from 'tamagui';

export default function FormsDemo() {
  const router = useRouter();
  const signIn = useAuthStore((auth) => auth.signIn);
  const [status, setStatus] = React.useState<
    'off' | 'submitting' | 'submitted'
  >('off');

  React.useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => {
        setStatus('off');
        signIn('test-uid');
        router.replace('/home');
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [status]);

  return (
    <Form
      alignItems='center'
      minWidth={300}
      gap='$2'
      onSubmit={() => setStatus('submitting')}
      borderWidth={1}
      borderRadius='$4'
      backgroundColor='$background'
      borderColor='$borderColor'
      padding='$8'
    >
      <H4>Sign In</H4>

      <YStack gap='$4'>
        <Input placeholder='email' />
        <Input placeholder='password' secureTextEntry={true} />
      </YStack>

      <Form.Trigger asChild disabled={status !== 'off'}>
        <Button icon={status === 'submitting' ? () => <Spinner /> : undefined}>
          Submit
        </Button>
      </Form.Trigger>
    </Form>
  );
}
