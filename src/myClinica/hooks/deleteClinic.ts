import { useMutate } from "@core/hooks/request"
import { request } from "@core/utils/baseAxios.ts"
import { DeleteClinicResponse } from "@my-clinica/types"
import { DELETE_CLINIC } from "@my-clinica/urls"

// export const useDeletwweClinicData = (clinicId: string) => {
//     return useMutate<ClinicResponse>(["delete-clinic"], () => request({ url: DELETE_CLINIC.replace("{clinicId}", clinicId) }))
// }

// export const useDeleteClinicData = (clinicId: string) => {
//     return useMutate<DeleteClinicResponse, void>(() =>
//         request({ method: "post", url: DELETE_CLINIC.replace("{clinicId}", clinicId) })
//     )
// }


export const useDeleteClinicData = (clinicId: string) => {
    return useMutate<DeleteClinicResponse, void>(() =>
        request({ url: DELETE_CLINIC.replace("{clinicId}", clinicId), method: "POST", })
    )
}