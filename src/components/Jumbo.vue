<template lang="pug">
v-layout(text-xs-center, wrap, justify-center)
    v-flex(mb-4='', xs12).pa-0
        h1.display-1.font-weight-bold.mb-3.white--text {{ $t('ready_for_new') }}
        h1.display-2.font-weight-normal.mb-3.white--text Selfscale NEW
        p.subheading.font-weight-regular.white--text {{ $t('internet_of_scales') }}
    v-flex(xs12).mb-3.justify-center
        img(:src="require('../assets/phone_1.svg')", width="300px")
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component
export default class Jumbo extends Vue {

}
</script>