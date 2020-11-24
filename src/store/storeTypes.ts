export interface User {
  id: number
  email: string
  password: string
  token: string
}

export interface UserState {
  user: User[]
}