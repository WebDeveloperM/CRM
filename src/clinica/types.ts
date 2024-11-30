import { BaseResponse, ModelType } from "@core/types.ts"
import { WorkerData } from "./components/TreeSelect"

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

interface DataNodeUz {
    id: number;
    nameUz: string;
}

interface DataNodeRu {
    id: number;
    nameRu: string;
}


export type WorkerDataTypeUz = {
    [key: string]: DataNodeUz
}
export type WorkerDataTypeRu = {
    [key: string]: DataNodeRu
}


export type ClinicaFormDataResponse = BaseResponse & {
    data?: []
}

export type WorkerPositionsResponse = BaseResponse & {
    data?: [{ uz: WorkerDataTypeUz, rus: WorkerDataTypeRu }]
}

