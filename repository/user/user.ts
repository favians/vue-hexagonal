import { IRepository } from '@@/business/user/service'
import User from '@@/business/user/user'

import UserManagement from './userData'


export default class UserRepository implements IRepository {
  userManagement = new UserManagement()

  async GetAlluser(page: number, rowPerPage: number, userID: string): Promise<Array<User>> {
    const url = '/v1/biller/all'
    const params = {
      page,
      row_per_page: rowPerPage,
    }

    return await this.userManagement.getAllUser(userID)
  }

  async InsertUser(user: User): Promise<string> {
    return await this.userManagement.insertUser(user)
  }

  async UpdateUser(user: User): Promise<string> {
    return await this.userManagement.editUser(user)
  }
}