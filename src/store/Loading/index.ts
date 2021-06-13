import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

interface LoadingState {
  show: boolean
}
@Module({
  name: 'Loading',
  namespaced: true,
  stateFactory: true,
})
class LoadingStore extends VuexModule {
  loadingState: LoadingState = {
    show: false,
  }

  @Mutation
  public setLoading({ show = false }): void {
    this.loadingState = { show }
  }
}

export default LoadingStore