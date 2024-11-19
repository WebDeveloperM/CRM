import { ModelType } from "@core/types.ts"

export type BaseUserType = ModelType & {
    firstName: string
    lastName: string
}



export type BaseResponse = {
    success: string
    message: string
}

export type SignUpSuperUser = {
    firstName: string
    lastName: string
    clinicName: string
    personalNumber: number
    pasportSerNum: string
}


export type SignUpSuperUserResponse = BaseResponse & {
    data?: { uniqueToken: string, uniqueUrl: string }
}


export type SignUpSuperUserAddRegister = {
    token?: string
    username: string
    password?: string
    confirmPassword?: string
}
export type SignUpSuperUserAddRegisterResponse = BaseResponse & {
    token: string
    data: string
}


export type AccountLogin = {
    username: string
    password: string
}

export type AccountLoginResponse = BaseResponse & {
    data: { token: string, expiration: string }
}