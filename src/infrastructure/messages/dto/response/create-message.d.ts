import { IMessage } from './get-message';

export type ICreateMessage = Pick<
    IMessage,
    'type' | 'text' | 'senderId',
    'conversationId'
>;
