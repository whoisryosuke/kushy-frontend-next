const routes = module.exports = require('next-routes')()


routes
.add('shop', '/shop/:slug', 'shop/profile')