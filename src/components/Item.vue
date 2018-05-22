<template>
  <section class="item">
    <h1>Item</h1>
    <section>Data:
      <ul class="items" v-for="(item, i) in items" :key="i">
        <li>Name: {{item.name}}</li>
        <li>Power: {{item.power}}</li>
      </ul>
    </section>
    <button @click="getItems">GET Items</button>
    <hr>
    <section>Data:
      <ul class="items" v-if="item">
        <li>Name: {{item.name}}</li>
        <li>Power: {{item.power}}</li>
      </ul>
    </section>
    <input type="text" v-model="itemName">
    <button @click="getItemsByName">GET Item By Name</button>
    <template v-if="item">
      <input type="text" v-model="itemPower">
      <button @click="updatePower">UPDATE Item's Power</button>
    </template>
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
      items: [],
      item: null,
      itemName: null,
      itemPower: null
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
              power
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
            itemName: this.itemName
          }
        })
        this.item = res.data.data.itemByName
      } catch (e) {
        console.log('error', e)
      }
    },
    async updatePower () {
      try {
        const requestURI = 'http://localhost:3000/graphql'
        const res = await axios.post(requestURI, {
          query: `
            mutation UpdatePower(
              $itemName: String!, $itemPower: Float
            ) {
                updatePower(name: $itemName, power: $itemPower)
              {
                name
                power
              }
            }`,
          variables: {
            itemName: this.itemName,
            itemPower: this.itemPower
          }
        })
        this.item = res.data.data.updatePower
      } catch (e) {
        console.log('error', e)
      }
    }
  }
}
</script>
