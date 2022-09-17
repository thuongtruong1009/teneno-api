import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { UserEntity } from 'src/infrastructure/users/entities/user.entity';

export class UpdatePasswordDto extends PickType(UserEntity, ['email']) {
    @ApiProperty({
        type: String,
        description: 'The old password of user',
        example: 'password123',
    })
    @IsNotEmpty()
    @IsString()
    oldPassword: string;

    @ApiProperty({
        type: String,
        description: 'The new password of user',
        example: 'password123',
    })
    @IsNotEmpty()
    @IsString()
    newPassword: string;
}
