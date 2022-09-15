import { ApiExtraModels } from '@nestjs/swagger';

// @ApiExtraModels()
export class CreateMessageDto {
    id?: string;
    senderId: string;
    type: string;
    text: string;
}
