import { request } from "@core/utils/baseAxios.ts"
import { useFetch, useMutate } from "@core/hooks/request.ts"
import { REGISTER_CLINIC, WORKER_POSITIONS } from "@clinica/urls.ts"
import { ClinicaFormData, ClinicaFormDataResponse, WorkerPositionsResponse } from "../types"


export const useClinicRegister = () => {
    return useMutate<ClinicaFormDataResponse, ClinicaFormData>((data) =>
        request({ url: REGISTER_CLINIC, method: "POST", data })
    )
}


export const useWorkerPositions = () => {
    return useFetch<WorkerPositionsResponse>(["worker-position"], () => request({ url: WORKER_POSITIONS }))
}
