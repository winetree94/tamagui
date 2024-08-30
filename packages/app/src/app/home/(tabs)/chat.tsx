import { YStack } from 'tamagui';
import { Chat } from '@expo-app/ui';
import { useState } from 'react';

export default function ChatPage() {
  const [messageSending, setMessageSending] = useState(false);
  const [inputDisabled, setInputDisabled] = useState(false);

  const data = Array.from({ length: 100 }).map((_, i) => ({
    index: i,
    author: 'alksdfjaskldfjsaldkfj',
    message: 'asldkfasdklfansdlfkasd',
  }));

  const onSubmit = async () => {
    setMessageSending(true);
    setInputDisabled(true);
    await new Promise<void>((resolve) => setTimeout(() => resolve(), 3000));
    console.log('submit');
    setMessageSending(false);
    setInputDisabled(false);
  };

  return (
    <YStack f={1}>
      <Chat.Root>
        <Chat.Body
          messages={data}
          keyExtractor={(data) => data.index.toString()}
        >
          {(item) => (
            <Chat.Message
              key={item.item.index}
              align='left'
              author={item.item.author}
              message={item.item.message}
            ></Chat.Message>
          )}
        </Chat.Body>
        <Chat.Input
          loading={messageSending}
          disabled={inputDisabled}
          onSubmit={onSubmit}
        ></Chat.Input>
      </Chat.Root>
    </YStack>
  );
}
