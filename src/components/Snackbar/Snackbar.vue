<template>
  <v-snackbar v-model="show" :color="color" timeout="2000" center top>
    <span class="muli_font_content snackbar-main">{{ message }}</span>
    <template #action="{ attrs }">
      <v-btn color="white" text v-bind="attrs" @click="show = false">
        Close
      </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

@Component
export default class Snackbar extends Vue {
  show: boolean = false
  message: string = ''
  color: string = ''

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'Snackbar/setSnackbar') {
        this.message = state.Snackbar.snackbarState.message
        this.color = state.Snackbar.snackbarState.color
        this.show = true
      }
    })
  }
}
</script>

<style scoped>
.snackbar-main {
  font-weight: 700;
}
</style>
