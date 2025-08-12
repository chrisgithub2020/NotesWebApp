export const GRAPHQL_URL = "https://graphql-notes-vxj3.onrender.com/graphql"
// export const GRAPHQL_URL = "http://localhost:10/graphql"

export const AddNoteQuery = `mutation CreateNote ($input: CreateNoteInput!) {
  createNote(input: $input) {
    code
    success
    message
    note {
      id
      title
      note
      author
    }
  }
}`


export const GetNotesQuery = `query GetNote($getNoteId: ID!) {
  getNote(id: $getNoteId) {
    id
    title
    note
  }
}`

export const UpdateNotesQuery = `
mutation UpdateNote($input: UpdateNoteInput!) {
  updateNote(input: $input) {
    code
    success
    message
  }
}`

export const SignUpQuery = `mutation CreateUser($input: CreateUserInput!) {
  createUser(input: $input) {
    code
    success
    message
    user {
      id
      name
      email
    }
  }
}`

export const LogInQuery = `query GetUser($input: GetUserInput!) {
  getUser(input: $input) {
    id
    name
    email
  }
}`