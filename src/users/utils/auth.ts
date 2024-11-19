import { AccountLoginResponse } from "@users/types"
import { useNavigate } from "react-router-dom"



export function auth() {
    return {
        headers: {
            Authorization: `Token ${localStorage.token}`,
        },
    }
}

let permissions: string[] | undefined

export function checkPermission(permission: string) {
    if (permissions === undefined) {
        permissions = JSON.parse(localStorage.getItem("permissions") || "[]") as string[]
    }

    return permissions.includes(permission)
}

export function clearPermissions() {
    permissions = undefined
}

// export function getToken(): string {
//     const token = localStorage.getItem("uniqueToken")
//     return `${token}`
// }

export function login(value: AccountLoginResponse) {
    localStorage.setItem("token", value.data.token)
    localStorage.setItem("expiration", value.data.expiration)
}

export function logout() {
    const navigate = useNavigate()
    localStorage.removeItem("token")
    localStorage.removeItem("expiration")
    localStorage.removeItem("uniqueToken")
    localStorage.removeItem("uniqueUrl")
    navigate("/")

}

export function isAuthenticated() {
    const now = new Date();
    const expiration = localStorage.getItem("expiration")
    const targetDate = new Date(expiration as string)

    return localStorage.getItem("token") && (now > targetDate)
}
