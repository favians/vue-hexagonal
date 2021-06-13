import { Plugin } from '@nuxt/types'

declare module 'vue/types/vue' {
  // this.$Loading inside Vue components

  interface Vue {
    $Loading(data: { show: boolean }): void
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$Loading inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $Loading(data: { show: boolean }): void
  }
  // nuxtContext.$Loading
  interface Context {
    $Loading(data: { show: boolean }): void
  }
}

/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
declare module 'vuex/types/index' {
  // this.$Loading inside Vuex stores
  interface Store<S> {
    $Loading(data: { show: boolean }): void
  }
}

const showLoading: Plugin = (context, inject) => {
  inject('Loading', ({ show = false }) =>
    context.store.commit('Loading/setLoading', { show })
  )
}

export default showLoading
