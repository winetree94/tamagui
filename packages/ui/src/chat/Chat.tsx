/**
 * 채팅 UI 컴포넌트 정의
 */
import { zodResolver } from '@hookform/resolvers/zod';
import { useRef } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  FlatList,
  ListRenderItem,
  ListRenderItemInfo,
  NativeSyntheticEvent,
  TextInputKeyPressEventData,
  VirtualizedList,
} from 'react-native';
import {
  Avatar,
  Button,
  Form,
  ScrollView,
  Spinner,
  Text,
  TextArea,
  XStack,
  YStack,
} from 'tamagui';
import { z } from 'zod';

export interface ChatRootProps {
  children: JSX.Element[];
}

function ChatRoot(props: ChatRootProps) {
  return <YStack f={1}>{props.children}</YStack>;
}

export interface ChatBodyProps<T> {
  keyExtractor: (item: T) => string;
  messages: T[];
  children: (item: ListRenderItemInfo<T>) => JSX.Element;
}

function ChatBody<T>(props: ChatBodyProps<T>) {
  return (
    <YStack f={1}>
      <FlatList
        // initialNumToRender={5}
        data={props.messages}
        keyExtractor={props.keyExtractor}
        renderItem={props.children}
        inverted={true}
      />
    </YStack>
  );
}

export interface ChatMessageProps {
  align?: 'left' | 'right';
  author: string;
  children?: JSX.Element;
  message: string;
}

function ChatMessage({
  align = 'left',
  author,
  children,
  message,
}: ChatMessageProps) {
  return (
    <XStack
      p='$4'
      gap='$4'
      flexDirection={align === 'left' ? 'row' : 'row-reverse'}
    >
      <Avatar circular>
        <Avatar.Image src='https://images.unsplash.com/photo-1548142813-c348350df52b?&w=150&h=150&dpr=2&q=80'></Avatar.Image>
      </Avatar>
      <YStack gap='$2' ai={align === 'left' ? 'flex-start' : 'flex-end'}>
        <Text>{author}</Text>
        <Text>{message}</Text>
      </YStack>
    </XStack>
  );
}

const ChatMessageSchema = z.object({
  message: z.string().min(1),
});

export type ChatMessageType = z.infer<typeof ChatMessageSchema>;

interface ChatInputProps {
  loading?: boolean;
  disabled?: boolean;
  onSubmit?: (data: ChatMessageType) => void;
}

function ChatInput(props: ChatInputProps) {
  const { control, handleSubmit, formState } = useForm<ChatMessageType>({
    resolver: zodResolver(ChatMessageSchema),
    defaultValues: {
      message: '',
    },
  });

  const onKeyPress = (e: NativeSyntheticEvent<TextInputKeyPressEventData>) => {
    const nativeEvent = e.nativeEvent;
    if (nativeEvent.key === 'Enter') {
      e.preventDefault();
      onSubmit();
    }
  };

  const onSubmit = handleSubmit((data) => {
    props.onSubmit?.(data);
  });

  return (
    <XStack>
      <Form
        alignItems='center'
        minWidth={300}
        onSubmit={onSubmit}
        f={1}
        display='flex'
        flexDirection='row'
      >
        <Controller
          name='message'
          control={control}
          render={({ field: { onBlur, onChange, value } }) => (
            <TextArea
              f={1}
              h='$5'
              disabled={props.disabled}
              onBlur={onBlur}
              onChange={onChange}
              onKeyPress={onKeyPress}
              value={value}
            />
          )}
        />
        <Form.Trigger asChild>
          <Button
            disabled={props.disabled || !formState.isValid}
            icon={props.loading ? () => <Spinner /> : undefined}
          >
            Go
          </Button>
        </Form.Trigger>
      </Form>
    </XStack>
  );
}

export const Chat = {
  Root: ChatRoot,
  Body: ChatBody,
  Message: ChatMessage,
  Input: ChatInput,
};
