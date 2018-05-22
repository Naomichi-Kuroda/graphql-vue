<template>
  <section class="item">
    <h1>Item</h1>
    <section>Data:
      <ul class="items">
        <li v-for="(item, i) in items" :key="i">{{item.name}}</li>
      </ul>
    </section>
    <button @click="getItems">Request GET</button>
  </section>
</template>

<style scoped lang="scss">
  .items {
    list-style: none;
    margin: 0;
    padding: 0;
  }
</style>

<script>
import axios from 'axios'

export default {
  name: 'Item',
  data () {
    return {
      items: []
    }
  },
  methods: {
    async getItems () {
      try {
        const requestURI = 'http://localhost:3000/graphql'
        const res = await axios.post(requestURI, {
          query: `{
            items {
              name
            }
          }`
        })
        this.items = res.data.data.items
      } catch (e) {
        console.log('error', e)
      }
    }
  }
}
</script>
