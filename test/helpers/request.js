import request from 'supertest'

export default function (t) {
  let _request = request(t.context.server)
  let auth = t.context.auth != null
    ? ['Authorization', `Bearer ${t.context.auth.token}`]
    : []

  return {
    async get (resource, data) {
      return await _request
        .get(resource)
        .type('form')
        .send(data)
    },
    async post (resource, data) {
      return await _request
        .post(resource)
        .type('json')
        .send(data)
    },
    authenticated: {
      async get (resource, data) {
        return await _request
          .get(resource)
          .set(...auth)
          .type('form')
          .send(data)
      },
      async post (resource, data) {
        return await _request
          .post(resource)
          .set(...auth)
          .type('json')
          .send(data)
      }
    }
  }
}
