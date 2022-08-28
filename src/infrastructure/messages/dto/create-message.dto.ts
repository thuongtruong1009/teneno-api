import { ApiExtraModels } from '@nestjs/swagger';

@ApiExtraModels()
export class CreateMessageDto {
  id: string;
  senderId: string;
  text: string;
}
