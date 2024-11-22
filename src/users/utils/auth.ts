import { AccountLoginResponse } from "@users/types"
import { useNavigate } from "react-router-dom"

const authToken = import.meta.env.VITE_AUTHORIZATION_TOKEN

export function auth() {
    return {
        headers: {
            Authorization: authToken,
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

export function login(res: AccountLoginResponse) {
    localStorage.setItem("token", res.data.token)
    localStorage.setItem("expiration", res.data.expiration)
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
    const now = new Date()
    const expiration = localStorage.getItem("expiration")
    const targetDate = new Date(expiration as string)
    return localStorage.getItem("token") && now < targetDate
}
