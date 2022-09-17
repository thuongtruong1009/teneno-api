export const STATUS_MESSAGE = {
    SUCCESS: 'Success.',
    ERROR: 'Errors.',
    WARNING: 'Warning.',
    INFO: 'Info.',
    UNKNOWN: 'Unknown.',
};

export const RESPONSES_MESSAGE = {
    CREATE_USER: 'The new account has been created.',
    DELETE_USER: 'The user account has been deleted.',
    DELETE_COMMENT: 'The comment has been deleted.',
};

export const SYSTEM_ERROR = {
    FORBIDDEN: 'Access denied',
    NOT_FOUND: 'Not found',
    INTERNAL_SERVER_ERROR: 'Internal server error',
    BAD_REQUEST: 'Bad request',
    UNAUTHORIZED: 'Unauthorized',
    CONFLICT: 'Conflict',
    TOO_MANY_REQUESTS: 'Too many requests',
    METHOD_NOT_ALLOWED: 'Method not allowed',
    NOT_ACCEPTABLE: 'Provided fields are not acceptable',
    REQUEST_TIMEOUT: 'Request timeout',
    PAYLOAD_TOO_LARGE: 'Payload too large',
    UNSUPPORTED_MEDIA_TYPE: 'Unsupported media type',
};

export const AUTH_ERROR = {
    SAME_PASSWORD: 'New password must be different from old password',
    PASSWORD_NOT_MATCH: 'Password does not match',
    RECAPTCHA_FAILED: 'Failed to verify recaptcha',
    RECAPTCHA_NOT_PERSON: "You're not person",
};

export const USER_ERROR = {
    NOT_FOUND: 'User not found',
    DUPLICATE: 'User already exist',
};

export const POST_ERROR = {
    NOT_FOUND: 'Post not found',
    EMPTY: 'User not have post',
    DUPLICATE: 'Post already exist',
    NOT_AUTHOR: 'You are not author of this post',
};

export const CONVERSATION_ERROR = {
    NOT_FOUND: 'Conversation not found',
    NOT_CREATOR: 'You are not creator of this conversation',
    NOT_MEMBER: 'You are not member of this conversation',
};
