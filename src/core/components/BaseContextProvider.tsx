import "@core/static/style.css"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import ModalProvider from "@core/components/ModalProvider.tsx"
import { ToastContainer } from "react-toastify"

type Props = {
    children?: ReactNode
}

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: true,
            staleTime: 30000,
            retry: 1,
        },
    },
})

export default function BaseContextProvider({ children }: Props) {
    return (
        <QueryClientProvider client={queryClient}>
            <ModalProvider>
                {children}
                <ToastContainer />
            </ModalProvider>
        </QueryClientProvider>
    )
}
