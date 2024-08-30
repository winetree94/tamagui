import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
import { z } from 'zod';

export const MessageSchema = z.object({
  timestamp: z.string(),
  message: z.string(),
});

export const MessagesSchema = z.object({
  messages: MessageSchema.array(),
});

export type MessagesState = z.infer<typeof MessagesSchema>;

export type MessagesActions = {};

export type MessagesStore = MessagesState & MessagesActions;

export const useMessagesStore = create(
  immer<MessagesStore>(() => ({
    messages: [],
  })),
);
