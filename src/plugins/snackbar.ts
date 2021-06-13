import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  // this.$Snackbar inside Vue components
  interface Vue {
    $Snackbar(data: { message: string; color: string }): void
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$Snackbar inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $Snackbar(data: { message: string; color: string }): void
  }
  // nuxtContext.$Snackbar
  interface Context {
    $Snackbar(data: { message: string; color: string }): void
  }
}

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module 'vuex/types/index' {
  // this.$Snackbar inside Vuex stores
  interface Store<S> {
    $Snackbar(data: { message: string; color: string }): void
  }
}

const showSnackbar: Plugin = (context, inject) => {
  inject('Snackbar', ({ message = '', color = '' }) =>
    context.store.commit('Snackbar/setSnackbar', { message, color })
  )
}

export default showSnackbar
