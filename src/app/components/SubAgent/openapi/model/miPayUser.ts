/**
 * OpenAPI definition
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: v0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
import { MiRole } from './miRole';
import { RoleManagement } from './roleManagement';
import { WalletAccount } from './walletAccount';


export interface MiPayUser { 
    id?: number;
    email?: string;
    firstName?: string;
    lastName?: string;
    phone?: string;
    userType?: MiPayUser.UserTypeEnum;
    role?: MiRole;
    roleData?: RoleManagement;
    username?: string;
    password?: string;
    gender?: MiPayUser.GenderEnum;
    walletAccount?: WalletAccount;
    accountKycLevel?: MiPayUser.AccountKycLevelEnum;
    product?: number;
}
export namespace MiPayUser {
    export type UserTypeEnum = 'CUSTOMER' | 'AGENT' | 'CORPORATE' | 'BO';
    export const UserTypeEnum = {
        Customer: 'CUSTOMER' as UserTypeEnum,
        Agent: 'AGENT' as UserTypeEnum,
        Corporate: 'CORPORATE' as UserTypeEnum,
        Bo: 'BO' as UserTypeEnum
    };
    export type GenderEnum = 'MALE' | 'FEMALE' | 'OTHERS' | 'DEFAULT';
    export const GenderEnum = {
        Male: 'MALE' as GenderEnum,
        Female: 'FEMALE' as GenderEnum,
        Others: 'OTHERS' as GenderEnum,
        Default: 'DEFAULT' as GenderEnum
    };
    export type AccountKycLevelEnum = 'NONE' | 'BASIC' | 'FULL';
    export const AccountKycLevelEnum = {
        None: 'NONE' as AccountKycLevelEnum,
        Basic: 'BASIC' as AccountKycLevelEnum,
        Full: 'FULL' as AccountKycLevelEnum
    };
}


