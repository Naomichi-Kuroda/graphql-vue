const express = require('express')
const {buildSchema} = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')

const schema = buildSchema(`
  type Query {
    user: String
  }
`)

const rootValue = {
  user: () => 'GraphQL'
}

const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))

app.listen(3000, () => console.log)
