import fastify from 'fastify'

const app = fastify()

app.get('/', () => {
  return 'hello world'
})

app
  .listen({
    port: 3333,
  })
  .then(() => {
    console.log('HTTP server running on!')
  })
  .catch(() => {
    console.log('HTTP server off!')
  })
