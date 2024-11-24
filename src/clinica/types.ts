import { ModelType } from "@core/types.ts"

export type BaseUserType = ModelType & {
    email: string
    firstName: string
    lastName: string
    avatar?: string
}


export type CreateClinica = {
    clinicName: string
    legalAddress: string
    actualAddress: string
    phoneNumber: string
    email: string
    website: string
    taxpayerIdNumber: string
    stateRegistrationNumber: string
    clinicType: string
    employeeCount: number
    licenseNumber: string
    licenseExpiryDate: string
    bankAccountDetails: string
    additionalServices: [string]
    accountingSystem: string
}