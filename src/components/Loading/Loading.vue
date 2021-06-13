<template>
  <center>
    <v-overlay v-if="overlay" :value="show">
      <v-progress-circular
        v-if="show"
        color="black"
        class="circular mt-5"
        indeterminate
      ></v-progress-circular>
    </v-overlay>
    <div v-else>
      <v-progress-circular
        v-if="show"
        color="black"
        class="circular mt-5"
        indeterminate
      ></v-progress-circular>
    </div>
  </center>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Loading extends Vue {
  @Prop({ default: false }) overlay!: boolean

  show: boolean = false

  created() {
    this.$store.subscribe((mutation, state) => {
      if (mutation.type === 'Loading/setLoading') {
        this.show = state.Loading.loadingState.show
      }
    })
  }
}
</script>

<style scoped>
.circular {
  position: relative;
}
</style>
