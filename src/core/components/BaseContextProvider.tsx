import "@core/static/style.css"
import { ReactNode } from "react"
import { QueryClient, QueryClientProvider } from "react-query"
import ModalProvider from "@core/components/ModalProvider.tsx"
import ToastProvider from "@core/components/ToastProvider.tsx"

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
                <ToastProvider>{children}</ToastProvider>
            </ModalProvider>
        </QueryClientProvider>
    )
}
