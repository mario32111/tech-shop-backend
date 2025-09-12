export enum RabbitMQ{
    UserQueue = 'users',
}

export enum UserMsg {
    CREATE_USER_PROFILE='CREATE_USER_PROFILE',
    FIND_ALL = 'FIND_USERS',
    FIND_ONE = 'FIND_USER',
    UPDATE = 'UPDATE_USER',
    DELETE= 'DELETE_USER',
    VALID_USER= 'VALID_USER',
    FIND_BY_EMAIL = 'FIND_USER_BY_EMAIL',
    FIND_BY_ID = 'FIND_USER_BY_ID',
}
