
import User from './user'

export interface IRepository {
    GetAlluser(page: number, rowPerPage: number, userID: string): Promise<Array<User>>
    InsertUser(user: User): Promise<string>
    UpdateUser(user: User): Promise<string> 
}
  
export interface IService {
    GetAlluser(page: number, rowPerPage: number, userID: string): Promise<Array<User>>
    InsertUser(user: User): Promise<string>
    UpdateUser(user: User): Promise<string> 
}
  
export default class UserService implements IService {
    UserRepository: IRepository

    constructor(userRepository: IRepository) {
        this.UserRepository = userRepository
    }

    async GetAlluser(page: number, rowPerPage: number, userID: string): Promise<Array<User>> {
        return await this.UserRepository.GetAlluser(page, rowPerPage, userID)
    }

    async InsertUser(user: User): Promise<string> {
        return await this.UserRepository.InsertUser(user)
    }

    async UpdateUser(user: User): Promise<string> {
        return await this.UserRepository.UpdateUser(user)
    }

}
  