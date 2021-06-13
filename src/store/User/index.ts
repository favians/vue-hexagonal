import { Module, VuexModule, Action } from 'vuex-module-decorators'
import User from '@@/business/user/user'
import UserService, {
  IRepository,
  IService,
} from '@@/business/user/service'
import UserRepository from '@@/repository/user/user'
  
// Initiate Service Needed for this store object
const userRepository: IRepository = new UserRepository()
const userService: IService = new UserService(userRepository)

interface UserState {}

@Module({
  name: 'User',
  namespaced: true,
  stateFactory: true,
})
class UserStore extends VuexModule {
  resourceState: UserState = {}

  @Action({ rawError: true})
  public async GetAlluser(payload: {page: number, rowPerPage: number, userID: string}): Promise<Array<User>> {
    return await userService.GetAlluser(payload.page, payload.rowPerPage, payload.userID)
  }

  @Action({ rawError: true})
  public async InsertUser(payload: {user: User}): Promise<string> {
    return await userService.InsertUser(payload.user)
  }

  @Action({ rawError: true})
  public async UpdateUser(payload: {user: User}): Promise<string> {
    return await userService.UpdateUser(payload.user)
  }
}

export default UserStore
