import request from 'supertest'

export default function (t) {
  return {
    async get (resource, query) {
      return await request(t.context.server)
        .get(resource)
        .type('form')
        .send(query)
    },
    async post (resource, data) {
      return await request(t.context.server)
        .post(resource)
        .type('json')
        .send(data)
    }
  }
}
