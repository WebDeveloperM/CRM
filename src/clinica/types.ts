import { BaseResponse, ModelType } from "@core/types.ts"

export type BaseUserType = ModelType & {
    email: string
    firstName: string
    lastName: string
    avatar?: string
}


export type ClinicaFormData = {
    clinicName: string;
    legalAddress: string;
    phoneNumber: string;
    email: string;
    website: string;
    taxpayerIdNumber: string;
    stateRegistrationNumber: string;
    clinicType: string;
    employeeCount: number;
    licenseNumber: string;
    licenseExpiryDate: string;
    bankAccountDetails: string;
    additionalServices: number[];
    accountingSystem: string;
    instagram: string;
    telegram: string;
    facebook: string;
    youtube: string;
    geolocationLatitude?: number | undefined;
    geolocationLongitude?: number | undefined;
    description: string;
}

export type ClinicaFormDataResponse = BaseResponse & {
    data?: []
}