import { Store } from 'vuex'
import { initialiseStores } from '@/store/Accessor'
const initializer = (store: Store<any>) => initialiseStores(store)
export const plugins = [initializer]
export * from '@/store/Accessor'
