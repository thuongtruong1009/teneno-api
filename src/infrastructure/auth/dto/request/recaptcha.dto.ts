import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { LoginDto } from './sigin.dto';

export class RecaptchaDto extends LoginDto {
    @ApiProperty({
        description: 'Recapcha token',
        type: String,
        example:
            '03ANYolqtMS4nv1u0XNKtfZxSjthwjRLiuvXJABk18ZQSuc8IMkuZ_mvV7Tk6aOBULne66mRwPoe9ypFs6EPl76uxlYj4QQKYWWaBX-VxAn5GW4XpL7Ps4_2PdZB1kIibDgN2zyt9BJIkwisLRvzxZenCeWWg4T7lEns25P84d7N7s12DxIKdqi2XaaEMnAS1LK-ypqAN3E8Avyd_yCTvZqkOeu9J_exVR-UoewSdcm7T6cS84zfpwaw7Q3eH4hyo7tmHrhoiqtMh9cmFgGYFN4MQOHcSx0bhJ-LgDlkq3QzudG1AKL95fwu80YWKMgofbjD2afTdLeSmH9r2YU3bi05Nqj_682aenAiwy5Qe0j3CqZ234TJqxyhihPfi2tXVANByG_z53XetTS9Wo95NZQ_NtXgOz-V9slImnDmINg5jOFjIGpIQu-GkXJ824bP14bwaRPWXdXZTu59nVfQHE99Nz0MYGVg39s8m86cZarKZWGiZUMq2-nuk',
    })
    @IsString({
        message: 'Recapcha token must be a string',
    })
    @IsNotEmpty({
        message: 'Recapcha token must not be empty',
    })
    recaptcha: string;
}
