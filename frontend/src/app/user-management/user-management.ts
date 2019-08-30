export interface UserManagementPage {
    id: string;
    index: number;
    type: EUserManagementPageTypes;
}

export enum EUserManagementPageTypes {
    USER = 'USER',
    ADMIN = 'ADMIN',
}
