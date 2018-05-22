<template>
  <section class="item">
    <h1>Item</h1>
    <section>Data:
      <ul class="items">
        <li v-for="(item, i) in items" :key="i">{{item.name}}</li>
      </ul>
    </section>
    <button @click="getItems">GET Items</button>
    <hr>
    <section>Data:
      <ul class="items" v-if="item">
        <li>Name:{{item.name}}</li>
        <li>Power:{{item.power}}</li>
      </ul>
    </section>
    <button @click="getItemsByName">GET Items By Name</button>
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
      item: null,
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
    },
    async getItemsByName () {
      try {
        const requestURI = 'http://localhost:3000/graphql'
        const res = await axios.post(requestURI, {
          query: `
            query GetItemsByName($itemName: String!) {
              itemByName(name: $itemName) {
                name
                power
              }
            }`,
          variables: {
            itemName: '白蓮華'
          }
        })
        this.item = res.data.data.itemByName
      } catch (e) {
        console.log('error', e)
      }
    }
  }
}
</script>
