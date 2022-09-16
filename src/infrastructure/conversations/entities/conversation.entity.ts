import { ApiProperty } from '@nestjs/swagger';

export class ConversationEntity {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty({ required: false, nullable: true })
    description: string | null;

    @ApiProperty()
    avatar: string;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    updatedAt: Date;

    @ApiProperty()
    members: string[];

    @ApiProperty()
    creator: string;

    @ApiProperty()
    admins: string[];
}
