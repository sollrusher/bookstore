export interface User {
  id: number
  email: string
  fullname: string
  age: number
  about: string
}

export interface UserState {
  user: User
  initialized: boolean
}
