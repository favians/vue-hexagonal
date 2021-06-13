<template>
  <v-app dark>
    <Snackbar />
    <v-navigation-drawer v-model="drawer" class="v-navigation-drawer" fixed app>
      <v-toolbar color="primary darken-1" dark>
        <img
          src="../static/m.png"
          height="36"
          alt="Vue Material Admin Template"
        />
        <v-toolbar-title class="ml-0 pl-3">
          <span>Hexagonal</span>
        </v-toolbar-title>
      </v-toolbar>
      <v-list>
        <v-list-item
          v-for="(item, i) in items"
          :key="i"
          :to="item.to"
          router
          exact
          dense
          expand
        >
          <v-subheader v-if="item.header" :key="i">{{
            item.header
          }}</v-subheader>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content class="navigation-text">
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar fixed app color="primary" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-menu offset-y>
        <template #activator="{ on, attrs }">
          <v-btn
            slot="activator"
            class="mr-2"
            icon
            large
            v-bind="attrs"
            v-on="on"
          >
            <v-avatar size="30px">
              <img src="../static/m.png" alt="Michael Wang" />
            </v-avatar>
          </v-btn>
        </template>
        <v-list class="pa-0">
          <v-list-item
            v-for="(item, index) in menuProfile"
            :key="index"
            @click="item.click"
          >
            <v-icon class="mr-2">{{ item.icon }}</v-icon>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt class="body-childern" />
        <Loading />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Snackbar from '@/components/Snackbar/Snackbar.vue'
import Loading from '@/components/Loading/Loading.vue'

@Component({
  components: {
    Snackbar,
    Loading,
  },
})
export default class DefaultLayout extends Vue {
  drawer: boolean = false
  fixed: boolean = true
  menuProfile = [
    {
      icon: 'mdi-login',
      href: '#',
      title: 'Logout',
      click: this.logout,
    },
  ]

  items: Array<Object> = [
    { header: 'Menu' },
    {
      icon: 'mdi-home',
      title: 'Home',
      to: '/',
    },
    { header: 'Applications' },
    {
      icon: 'mdi-account',
      title: 'User',
      to: '/user',
    },
    {
      icon: 'mdi-dog',
      title: 'Dog',
      to: '/dog',
    },
    {
      icon: 'mdi-cat',
      title: 'Cat',
      to: '/cat',
    },
  ]

  miniVariant: boolean = false
  title: string = 'Vue Hexagonal'

  logout() {}
}
</script>

<style scoped>
.header-menu {
  color: #4a4a4a;
  font-size: 20px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 15px;
  font-weight: bold;
}
.header-menu-center {
  color: #4a4a4a;
  font-size: 15px;
  text-align: center;
  margin-top: 28px;
  margin-bottom: 15px;
  font-weight: bold;
}
.mydivider {
  width: 100%;
  margin: 0% 5% 0% 5%;
  padding: 0.8px;
  background-color: grey;
}
.mydivider-full {
  width: 100%;
  margin: 0% 5% 0% 5%;
  padding: 0.8px;
  background-color: grey;
}
.navigation-text {
  margin-left: -10px;
}
</style>
