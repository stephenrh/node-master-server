<template lang="pug">
#app
  transition(name="fade", mode="out-in")
    router-view
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Layout from '@/layouts/default.vue'
@Component({
  components: { Layout }
})
export default class App extends Vue {
  title(): string {
    return this.$t('get_started').toString()
  }
  mounted(): void {
    console.log(this.$t('get_started'))
  }
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.3s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0
}

</style>