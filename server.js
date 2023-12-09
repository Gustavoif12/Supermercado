import { fastify } from 'fastify'
import { DatabaseMemory } from "./database-memory.js"

const server = fastify()
const database = new DatabaseMemory()

server.get('/', () => {
  return 'Olá Mundo!'
})

server.post('/prateleira', (request, reply) => {
  const { cor, altura_cm, comprimento_m } = request.body
  database.create({
    cor: cor,
    altura_cm: altura_cm,
    comprimento_m: comprimento_m
  })
  console.log(database.list())
  return reply.status(201).send()
})

server.get('/prateleira', (request) => {
  const search = request.query.search

  console.log(search)

  const prateleiras = database.list(search)

  return prateleiras
})

server.put('/prateleira/:id', (request, reply) => {
  const prateleiraId = request.params.id
  const { cor, altura_cm, comprimento_m } = request.body
  const prateleira = database.update(prateleiraId, {
    cor,
    altura_cm,
    comprimento_m,
  })
  return reply.status(204).send()
})

server.delete('/prateleira/:id', (request, reply) => {
  const prateleiraId = request.params.id

  database.delete(prateleiraId)

  return reply.status(204).send()
})

server.listen({
  port: 3333,
})