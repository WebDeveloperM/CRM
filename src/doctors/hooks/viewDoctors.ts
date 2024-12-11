
import { useFetch } from "@core/hooks/request"
import { request } from "@core/utils/baseAxios.ts"
import { DoctorDetailResponseType } from "@doctors/types"
import { DOCTORS_VIEW } from "@doctors/urls"


export function useDocorsView(uniqueToken: string) {
    return useFetch<DoctorDetailResponseType>([uniqueToken], () => request({ url: DOCTORS_VIEW.replace("{uniqueToken}", uniqueToken) }))
}
