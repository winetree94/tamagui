import React from 'react';
import { Button, Form, H4, Input, Spinner, YStack } from 'tamagui';

export default function SignUp() {
  const [status, setStatus] = React.useState<
    'off' | 'submitting' | 'submitted'
  >('off');

  React.useEffect(() => {
    if (status === 'submitting') {
      const timer = setTimeout(() => setStatus('off'), 2000);
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

      <Form.Trigger asChild disabled={status !== 'off'}>
        <YStack gap='$4'>
          <Input placeholder='email' />
          <Input placeholder='password' secureTextEntry={true} />
          <Button
            icon={status === 'submitting' ? () => <Spinner /> : undefined}
          >
            Submit
          </Button>
        </YStack>
      </Form.Trigger>
    </Form>
  );
}
