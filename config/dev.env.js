'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  HTTP_SERVER_URL: '"http://localhost:3000/"',
  SOCKET_SERVER_URL: '"http://localhost:3001/"',

})
