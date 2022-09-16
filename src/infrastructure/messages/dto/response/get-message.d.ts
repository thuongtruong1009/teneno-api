import { ConversationEntity } from 'src/infrastructure/conversations/entities';
import { MessageEntity } from '../../entities/message.entity';

export type IMessage = MessageEntity;

export type IGetAllMessages = Pick<ConversationEntity> & {
    messages: IMessage[];
};
