const express = require('express')
const {buildSchema} = require('graphql')
const graphqlHTTP = require('express-graphql')
const cors = require('cors')
const Item = require('./item')

const schema = buildSchema(`
  type Query {
    user: String
    items: [Item]
  }
  
  type Item {
    name: String
    power: Float
  }
`)

const items = [
  new Item('ダイヤケーン', 375),
  new Item('白蓮華', 360)
]

const rootValue = {
  user: () => 'GraphQL',
  items: () => items
}

const app = express()
app.use(cors())

app.use('/graphql', graphqlHTTP({
  rootValue, schema, graphiql: true
}))

app.listen(3000, () => console.log)
