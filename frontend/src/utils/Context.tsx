import  {createContext, useContext} from "react"

export type Note = {
    id: string
    title: string
    note: string
    author: string
}
export type UserDetails = {
    name: string,
    id: string,
    email: string
}
type contextProp = {
    userDetail: React.RefObject<UserDetails>;
    notes: React.RefObject<Array<Note>>;
}

export const HomeContext = createContext<contextProp | undefined>(undefined)

export function UseContext() {
    const context = useContext(HomeContext)

    if (context === undefined) {
        throw "Error the context is undefined"
    }

    return context
}