import { Module, VuexModule, Mutation } from 'vuex-module-decorators'

interface SnackbarState {
  message: string
  color: string
}

@Module({
  name: 'Snackbar',
  namespaced: true,
  stateFactory: true,
})
class SnackbarStore extends VuexModule {
  snackbarState: SnackbarState = {
    message: '',
    color: '',
  }

  @Mutation
  public setSnackbar({ message = '', color = '' }): void {
    this.snackbarState = { message, color }
  }
}

export default SnackbarStore