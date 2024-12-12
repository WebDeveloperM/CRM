import { useMutate } from "@core/hooks/request"
import { request } from "@core/utils/baseAxios"
import { DoctorUpdate, DoctorUpdateResponse } from "@doctors/types"
import { UPDATE_DOCTOR } from "@doctors/urls"
import { useQueryClient } from "react-query"

export const useUpdateDoctor = (clinicId: string) => {
    const queryClient = useQueryClient()

    return useMutate<DoctorUpdateResponse, DoctorUpdate>(
        (data) => request({ url: UPDATE_DOCTOR.replace("{clinicId}", clinicId), method: "post", data }),
        { onSuccess: () => queryClient.invalidateQueries(["get-clinic"]) }
    )
}