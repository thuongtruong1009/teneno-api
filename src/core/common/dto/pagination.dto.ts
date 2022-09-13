import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class PaginationDto {
    @IsString()
    @IsOptional()
    @ApiProperty({
        type: Number,
        example: 1,
        nullable: true,
        description: 'Page number',
    })
    current: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: Number,
        example: 10,
        nullable: true,
        description: 'Number of items per page',
    })
    limit: string;

    @IsString()
    @IsOptional()
    @ApiProperty({
        type: String,
        description: 'asc, desc',
        example: 'asc',
        nullable: true,
    })
    order: string;
}
