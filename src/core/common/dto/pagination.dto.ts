import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEnum, IsInt, IsOptional, IsString, Max, Min } from 'class-validator';
import { EORDER } from 'src/core/constants';

export class PaginationDto {
    @ApiPropertyOptional({
        type: Number,
        example: 1,
        minimum: 1,
        default: 1,
        nullable: true,
        description: 'Page number',
    })
    @IsString({
        message: 'Page current must be as string',
    })
    @IsOptional({
        message: 'Page current is optional',
    })
    current?: string = '1';

    @ApiPropertyOptional({
        type: Number,
        example: 10,
        nullable: true,
        description: 'Number of items per page',
    })
    @IsString({
        message: 'Page limit must be as string',
    })
    @IsOptional({
        message: 'Page limit is optional',
    })
    limit?: string;

    @ApiPropertyOptional({
        type: String,
        description: 'asc, desc',
        example: 'asc',
        nullable: true,
        enum: EORDER,
        default: EORDER.ASC,
    })
    @IsString({
        message: 'Page order must be as string',
    })
    @IsOptional({
        message: 'Page order is optional',
    })
    @IsEnum(EORDER)
    order?: string = EORDER.ASC;

    @ApiPropertyOptional({
        minimum: 1,
        maximum: 50,
        default: 10,
    })
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(50)
    @IsOptional({
        message: 'Page take is optional',
    })
    readonly take?: number = 10;

    get skip(): number {
        return (Number(this.current) - 1) * this.take;
    }
}
