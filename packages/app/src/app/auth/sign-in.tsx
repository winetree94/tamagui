import { useAuthStore } from '@/store/auth';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button, Form, H4, Input, Spinner, Text, YStack } from 'tamagui';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const SignInSchema = z.object({
  id: z.string().min(5),
  password: z.string().min(5),
});

type SignInSchemaType = z.infer<typeof SignInSchema>;

export default function FormsDemo() {
  const router = useRouter();
  const [state, setState] = useState<'pending' | 'loading' | 'error'>(
    'pending',
  );
  const signIn = useAuthStore((auth) => auth.signIn);

  const { control, handleSubmit, formState } = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    defaultValues: {
      id: '',
      password: '',
    },
  });

  const onSubmit = handleSubmit(async (values) => {
    setState('loading');
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    setState('pending');
    signIn({
      userId: values.id,
      userName: values.password,
    });
    router.replace('/home');
  });

  return (
    <YStack>
      <Form
        alignItems='center'
        minWidth={300}
        gap='$2'
        onSubmit={onSubmit}
        borderWidth={1}
        borderRadius='$4'
        backgroundColor='$background'
        borderColor='$borderColor'
        padding='$8'
      >
        <H4>Sign In</H4>

        <YStack gap='$4'>
          <Controller
            name='id'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder='id'
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
          <Controller
            name='password'
            control={control}
            rules={{ required: true }}
            render={({ field: { onChange, onBlur, value } }) => (
              <Input
                placeholder='password'
                secureTextEntry={true}
                onChange={onChange}
                onBlur={onBlur}
                value={value}
              />
            )}
          />
        </YStack>

        <Form.Trigger asChild disabled={state !== 'pending'}>
          <Button icon={state === 'loading' ? () => <Spinner /> : undefined}>
            Submit
          </Button>
        </Form.Trigger>

        {formState.isSubmitted && formState.errors ? (
          <Text>5글자 이상씩 쳐야함</Text>
        ) : null}
      </Form>
      <YStack>
        <Button onPress={() => router.push('./sign-up')}>Sign Up</Button>
      </YStack>
    </YStack>
  );
}
