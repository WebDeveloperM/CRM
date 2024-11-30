import { useFetch } from "@core/hooks/request"
import { DoctorRolesResponse } from "@doctors/types"
import { request } from "@core/utils/baseAxios.ts"
import { DOCTOR_ROLS } from "@doctors/urls"

export const useDoctorRols = () => {
    return useFetch<DoctorRolesResponse>(["doctor-roles"], () => request({ url: DOCTOR_ROLS }))
}
