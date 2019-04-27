<template lang="pug">
v-layout(row, wrap)
    v-flex(mb-5='', lg4, md6, xs12, v-for="point in points", :key="point.title").pa-2
        v-card(min-height="400px")
            v-toolbar(card, color="#0099cc")
                v-toolbar-title.white--text {{ point.title }}
            v-card-text
                v-list(two-line)
                    v-list-tile(v-for="sellpoint in point.spoints", :key="sellpoint.icon")
                            v-list-tile-content
                                v-list-tile-action
                                    v-icon {{ sellpoint.icon }}
                                v-list-tile-title {{ sellpoint.description }}
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { TranslateResult } from 'vue-i18n'
@Component
export default class SellPoints extends Vue {
points: ISellPoint[] = [
    {
      title: this.trans('selling_points.trucking.title'),
      spoints: [
        {
          icon: 'business',
          description: this.trans('selling_points.trucking.commercial_use')
        },
        {
          icon: 'bar_chart',
          description: this.trans('selling_points.trucking.real_time_stats')
        },
        {
          icon: 'cloud',
          description: this.trans('selling_points.trucking.cloud_based')
        }
      ]
    },
    {
      title: this.trans('selling_points.small_shop.title'),
      spoints: [
        {
          icon: 'home',
          description: this.trans('selling_points.small_shop.small_home_use')
        },
        {
          icon: 'help',
          description: this.trans('selling_points.small_shop.etc')
        }
      ]
    }
  ]

  trans(path: string): string {
    return this.$t(path).toString()
  }
}

interface ISellPoint {
  title: string | TranslateResult,
  spoints: Array<ISellPointList>
}

interface ISellPointList {
  icon: string,
  description: string
}
</script>

<style scoped lang="stylus">
.v-list__tile__title
    height: 100% !important
    white-space: normal !important
    overflow: visible !important
</style>