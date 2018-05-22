<template>
  <section class="user">
    <h1>User</h1>
    <pre>
      Data: {{user}}
    </pre>
    <button @click="getUser">Request</button>
  </section>
</template>

<script>
import axios from 'axios'

export default {
  name: 'User',
  data () {
    return {
      user: null
    }
  },
  methods: {
    async getUser () {
      try {
        const requestURI = 'http://localhost:3000/graphql'
        const res = await axios.post(requestURI, {
          query: '{user}'
        })
        this.user = res.data.data.user
      } catch (e) {
        console.log('error', e)
      }
    }
  }
}
</script>
