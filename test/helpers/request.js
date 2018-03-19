import request from 'supertest'

export default function (t) {
  return {
    async get (resource) {
      return await request(t.context.server)
        .get(resource)
    },
    async post (resource, data) {
      return await request(t.context.server)
        .post(resource)
        .send(data)
        .set('Content-Type', 'application/json')
        .set('Accept', 'application/json')
    }
  }
}
