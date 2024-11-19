import { request } from "@core/utils/baseAxios.ts"
import { useFetch, useMutate } from "@core/hooks/request.ts"
import { ACCOUNT_LOGIN, SUPER_USER_ADD_REGISTER_DATA, SUPER_USER_CREATE } from "@users/urls.ts"
import {
    AccountLogin,
    AccountLoginResponse,
    SignUpSuperUser,
    SignUpSuperUserAddRegister,
    SignUpSuperUserAddRegisterResponse,
    SignUpSuperUserResponse,
} from "@users/types.ts"

export const useSuperUserCreate = () => {
    return useMutate<SignUpSuperUserResponse, SignUpSuperUser>((data) =>
        request({ url: SUPER_USER_CREATE, method: "POST", data })
    )
}

export const useCheckUserUrl = (url?: string) => {
    return useFetch<Record<string, string>>(["check", url], () => request({ url }), { enabled: Boolean(url) })
}

export const useAddSuperUserResgiter = () => {
    return useMutate<SignUpSuperUserAddRegisterResponse, SignUpSuperUserAddRegister>((data) =>
        request({ url: SUPER_USER_ADD_REGISTER_DATA, method: "POST", data })
    )
}

export const useAccountLogin = () => {
    return useMutate<AccountLoginResponse, AccountLogin>((data) =>
        request({ url: ACCOUNT_LOGIN, method: "POST", data }, true)
    )
}
