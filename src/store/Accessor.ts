import { Store } from 'vuex'
import { getModule } from 'vuex-module-decorators'
import LoadingStore from '@/store/Loading/index'
import SnackbarStore from '@/store/Snackbar/index'
import UserStore from '@/store/User/index'

let loadingStore: LoadingStore // eslint-disable-line
let snackbarStore: SnackbarStore // eslint-disable-line
let userStore: UserStore // eslint-disable-line

function initialiseStores(store: Store<any>): void {
  loadingStore = getModule(LoadingStore, store)
  snackbarStore = getModule(SnackbarStore, store)
  userStore = getModule(UserStore, store)
}

export {
  initialiseStores,
  loadingStore,
  snackbarStore,
  userStore,
}
