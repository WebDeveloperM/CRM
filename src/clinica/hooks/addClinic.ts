import { request } from "@core/utils/baseAxios.ts"
import { useMutate } from "@core/hooks/request.ts"
import { REGISTER_CLINIC } from "@clinica/urls.ts"
import { ClinicaFormData, ClinicaFormDataResponse } from "../types"


export const useClinicRegister = () => {
    return useMutate<ClinicaFormDataResponse, ClinicaFormData>((data) =>
        request({ url: REGISTER_CLINIC, method: "POST", data })
    )
}
