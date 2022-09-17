import { MessageEntity } from '../../entities/message.entity';

export type ICreateMessage = Omit<MessageEntity, 'id'>;
