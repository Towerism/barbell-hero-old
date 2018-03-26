require('@babel/register')

module.exports = {
  src_folders: ['test/ui/pages'],
  output_folder: 'test/ui/pages/reports',
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: '',
  globals_path: 'test/ui/globals/globalModules.js',

  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    log_path: 'test/ui/',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path,
      'webdriver.gecko.driver': require('geckodriver').path
    }
  },

  test_settings: {
    default: {
      launch_url: 'http://localhost',
      selenium_port: 4444,
      selenium_host: 'localhost',
      silent: true,
      screenshots: {
        enabled: false,
        path: ''
      },
      desiredCapabilities: {
        browserName: 'firefox',
        marionette: true
      },
      globals: {
        devServerURL: 'http://localhost:' + (process.env.PORT || 3000)
      }
    },

    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        chromeOptions: {
          args: [
            '--headless', '--no-sandbox'
          ]
        }
      }
    }
  }
}
