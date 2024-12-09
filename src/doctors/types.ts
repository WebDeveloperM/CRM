import { BaseResponse, ModelType } from "@core/types.ts"

export type BaseUserType = ModelType & {
    email: string
    firstName: string
    lastName: string
    avatar?: string
}

export type Department = {
    id: number;
    nameUz: string;
    nameRu: string;
}

export type DoctorRolesResponse = BaseResponse & {
    data: Department[];
}




export type DoctorFormData = {
    firstName: string,
    lastName: string,
    fatherName: string,
    userName: string,
    password: string,
    passwordConfirm: string,
    base64Photo: string,
    phoneNumber: string,
    timeOutMinutes: number,
    allowedWorkingHours: string[],
    sex: string,
    salary: number,
    position: number,
    canSeeReports: boolean,
    clinicId: number,
    orderSign: string,
    description: string
}


export type DoctorFormDataResponse = BaseResponse & {
    data: [{ clinicId: string, clinicName: string, logoFilePath: string }]
}

