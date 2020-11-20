export interface User {
  email: string
  password: string
  token: string
}

export interface UserState {
  user: User[]
}