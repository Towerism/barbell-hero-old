export default {
  'Login and logout': client => {
    const devServer = client.globals.devServerURL
    client
      .url(devServer)
      .waitForElementVisible('#username')
      .setValue('#username', 'admin')
      .setValue('#password', 'password')
      .click('#loginSubmit')
      .waitForElementVisible('#logoutMenuItem')
      .click('#logoutMenuItem')
      .end()
  }
}
