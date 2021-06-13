<template>
  <div>
    <v-dialog v-model="dialog" max-width="600">
      <v-card>
        <v-toolbar dark color="primary" flat>
          <v-toolbar-title class="white--text">
            <v-icon left large> mdi-plus-circle </v-icon>
            Insert New User
          </v-toolbar-title>
        </v-toolbar>
        <v-form ref="form" v-model="valid" lazy-validation class="mr-5 ml-5">
          <v-container>
            <v-row>
              <v-col cols="12" class="modal-form">
                <v-text-field
                  v-model="userSpec.name"
                  :rules="userRules.nameRules"
                  label="Name"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="modal-form">
                <v-text-field
                  v-model="userSpec.username"
                  :rules="userRules.usernameRules"
                  label="Username"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" class="modal-form">
                <v-text-field
                  v-model="userSpec.password"
                  :rules="userRules.passwordRules"
                  label="Password"
                  required
                ></v-text-field>
              </v-col>

              <v-col cols="12" align="end">
                <v-btn color="blue darken-1" text @click.stop="dialog = false"
                  >Cancel</v-btn
                >
                <v-btn color="primary" @click="doRequest"
                  >Submit <v-icon right> mdi-check-circle </v-icon></v-btn
                >
              </v-col>
            </v-row>
          </v-container>
        </v-form>
      </v-card>
    </v-dialog>
    <v-container>
      <v-row no-gutters class="mb-3 mr-2">
        <v-col cols="6" right align="start"> </v-col>
      </v-row>
      <v-card>
        <v-card-title>
          <v-row no-gutters class="mr-2">
            <v-col cols="12" md="2" align="start">
              <v-text-field
                v-model="userIDFilter"
                class="mb-n5"
                label="User ID"
                outlined
                dense
                @input="applyFilter"
              >
              </v-text-field>
            </v-col>
            <v-col cols="12" md="10" right align="end">
              <v-btn
                color="primary lighten-1"
                dark
                @click.stop="setInsert(), (dialog = true)"
              >
                <v-icon left> mdi-plus-circle </v-icon>
                New User
              </v-btn>
            </v-col>
          </v-row>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="data"
          class="elevation-2"
          :hide-default-footer="true"
          disable-pagination
        >
          <template #[`item.actions`]="{ item }">
            <v-tooltip bottom>
              <template #activator="{ on, attrs }">
                <v-btn
                  fab
                  small
                  icon
                  v-bind="attrs"
                  @click="setUpdate(item), (dialog = true)"
                  v-on="on"
                >
                  <v-icon dark> mdi-pencil-outline </v-icon>
                </v-btn>
              </template>
              <span>Edit Data</span>
            </v-tooltip>
          </template>
        </v-data-table>
      </v-card>
    </v-container>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import User from '@@/business/user/user'
import Meta from '@@/business/type/meta'

import { userStore } from '@/store'

@Component({
  components: {},
})
export default class Partner extends Vue {
  // store here

  // util

  // static Data
  headers: Array<Object> = [
    { text: 'ID', value: 'id', align: 'start', sortable: false },
    { text: 'Name', value: 'name', sortable: false },
    { text: 'Username', value: 'username', sortable: false },
    { text: 'Password', value: 'password', sortable: false },
    { text: 'Actions', value: 'actions', sortable: false },
  ]

  userRules = {
    nameRules: [(v: string) => !!v || 'Name is required'],
    usernameRules: [(v: string) => !!v || 'Username is required'],
    passwordRules: [(v: string) => !!v || 'Password is required'],
  }

  // page data
  valid: boolean = false
  dialog: boolean = false
  isInsert: boolean = false

  userSpec: User = {
    id: '',
    name: '',
    username: '',
    password: '',
  }

  data: Array<User> = []
  meta: Meta = {
    page: 1,
    row_per_page: 10,
    next_page: false,
    previous_page: false,
  }

  userIDFilter: string = ''

  // Lifecycle
  created() {
    this.getAllData(this.meta.page, this.meta.row_per_page)
  }

  // Custom Methods
  async getAllData(page: number, rowPerPage: number) {
    this.$Loading({ show: true })

    const userID = this.userIDFilter

    await userStore
      .GetAlluser({
        page,
        rowPerPage,
        userID,
      })
      .then((user) => {
        this.data = user
      })
      .catch(() => {
        this.$Snackbar({ message: 'error', color: 'red' })
      })

    this.$Loading({ show: false })
  }

  async doRequest() {
    const validationOK = (
      this.$refs.form as Vue & {
        validate: () => boolean
      }
    ).validate()

    if (validationOK) {
      let result: Promise<any>
      if (this.isInsert) {
        result = userStore.InsertUser({ user: this.userSpec })
      } else {
        result = userStore.UpdateUser({ user: this.userSpec })
      }

      await result
        .then(() => {
          this.resetForm()
          this.getAllData(this.meta.page, this.meta.row_per_page)
          this.$Snackbar({ message: 'Success', color: 'green' })
          this.dialog = false
        })
        .catch(() => {
          this.$Snackbar({ message: 'error', color: 'red' })
        })

      this.$Loading({ show: false })
    }
  }

  applyFilter() {
    this.getAllData(this.meta.page, this.meta.row_per_page)
  }

  setInsert() {
    this.resetForm()
    this.isInsert = true
  }

  setUpdate(item: User) {
    this.userSpec = { ...item }
    this.isInsert = false
  }

  resetForm() {
    ;(
      this.$refs.form as Vue & {
        reset(): () => boolean
      }
    ).reset()
  }
}
</script>
