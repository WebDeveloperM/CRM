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
