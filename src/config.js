require('babel-polyfill');

const environment = {
  development: {
    isProduction: false
  },
  production: {
    isProduction: true
  }
}[process.env.NODE_ENV || 'development'];

module.exports = Object.assign({
  host: process.env.HOST || 'localhost',
  port: process.env.PORT,
  apiHost: 'https://mazmorra.net/api',
  app: {
    title: 'Mazmo',
    description: 'Red social de sexualidad libre',
    head: {
      titleTemplate: '%s | Mazmo',
      meta: [
        {name: 'description', content: 'Red social de sexualidad libre'},
        {charset: 'utf-8'},
        {property: 'og:site_name', content: 'Mazmo'},
        {property: 'og:image', content: 'https://mazmorra.net/img/logos/facebook.jpg'},
        {property: 'og:locale', content: 'es_AR'},
        {property: 'og:title', content: 'Mazmo'},
        {property: 'og:description', content: 'Red social de sexualidad libre'},
        {property: 'og:card', content: 'summary'},
        {property: 'og:site', content: '@joaqtor'},
        {property: 'og:creator', content: '@joaqtor'},
        {property: 'og:image:width', content: '200'},
        {property: 'og:image:height', content: '200'}
      ]
    },
    notifications: {
      q: 10
    },
    publications: {
      q: 20
    }
  },

}, environment);
