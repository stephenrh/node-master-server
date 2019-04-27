<template lang="pug">
v-app(style="background-color: #EEEEEE")
    v-toolbar(flat, color="primary")
    transition(name="fade", mode="out-in")
      router-view/
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component
export default class extends Vue {

}
</script>
