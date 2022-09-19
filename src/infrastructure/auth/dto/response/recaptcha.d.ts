class IRecaptcha {
    success: boolean;
}

export class ISuccessRecaptcha extends IRecaptcha {
    challenge_ts: Date;
    hostname: string;
    score: number;
}

export class IFailRecaptcha extends IRecaptcha {
    'error-codes': string[];
}
