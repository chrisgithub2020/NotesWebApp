import { CreateNoteResponse,CreateUserResponse, GetUserInput, Resolvers, User } from "./types"

export const resolvers: Resolvers = {
    Mutation: {
        createUser: async (_, {input}, {dataSource}): Promise<CreateUserResponse> =>{
            try {
                const custInp:GetUserInput = {email: input.email, password: input.password}
                if (!(await dataSource.usersDb.getUser(custInp))){
                    dataSource.usersDb.createUser(input)
                } else {
                    return {
                    success: false,
                    code: 500, 
                    message: "Account exist already",
                    user: null
                }
                }
            } catch (err: unknown) {
                return {
                    success: false,
                    code: 500, 
                    message: (err instanceof Error) ? err.message:"We don't know ye",
                    user: null
                }
            }

            return {
                    success: true,
                    code: 200, 
                    message: "User has been added",
                    user: input,
                }
        },

        createNote: (_, {input}, {dataSource}): CreateNoteResponse => {
            try{
                dataSource.notesDb.createNote(input)
            } catch (err: unknown) {
                return {
                    success: false,
                    code: 500, 
                    message: (err instanceof Error) ? err.message:"We don't know yet",
                    note: null
                }
            }

            return {
                success: true,
                code: 200, 
                message: "Your note was added succesfully",
                note: [input], 
            }
        },

        updateNote (_, {input}, {dataSource}) {
            try {
                dataSource.notesDb.updateNote(input)
            } catch (err: unknown) {
                return {
                    success: false,
                    code: 500, 
                    message: (err instanceof Error) ? err.message:"We don't know yet",
                }
            }

            return {
                code: 200,
                success: true,
                message: "Update was successful"
            }
        }
    },

    Query: {
        getUser (_, {input}, {dataSource}) {
            const user = dataSource.usersDb.getUser(input)
            return (input.password === user.password) ? user : null
        },

        getNote (_, {id}, {dataSource}) {
            return dataSource.notesDb.getNote(id)
        }
    },
}