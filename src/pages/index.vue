<template lang="pug">
v-container
  v-select(:items="sites", item-text="root.name", return-object, label="Hello")
  input(type="file", @change="uploadFile")
</template>

<script lang="ts">
// @ is an alias to /src
import { Vue, Component } from 'vue-property-decorator'
import Jumbo from '@/components/Jumbo.vue'
import axios from 'axios'
@Component({
  components: { Jumbo }
})
export default class extends Vue {
  name = 'home'
  sites: any[] = []
  mounted(): void {
    this.getItems()
  }

  async getItems(): Promise<void> {
    const items  = await axios.get('/api')
    console.log(items.data)
    this.sites = items.data.rootSites
  }

  async sendPage(): Promise<any> {
    console.log(this.$store.state.user)
  }

  uploadFile = async (el: any) => {
    console.log(el.target.files.item(0))
    const file = el.target.files.item(0)
    let formData = new FormData()
    formData.append('file', file)
    try {
      const sendFile = await axios.post('/api/sites', formData, { headers: { 'Content-Type': 'multipart/form-data' }})
      console.log(sendFile.data)
    } catch(err) {
      console.log(err)
    }
  }
}
</script>
