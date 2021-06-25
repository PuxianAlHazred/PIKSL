import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _58d0569a = () => interopDefault(import('..\\pages\\contact.vue' /* webpackChunkName: "pages/contact" */))
const _e54105e6 = () => interopDefault(import('..\\pages\\works\\index.vue' /* webpackChunkName: "pages/works/index" */))
const _c4db592e = () => interopDefault(import('..\\pages\\works\\chateau-les-moines.vue' /* webpackChunkName: "pages/works/chateau-les-moines" */))
const _1a577325 = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/contact",
    component: _58d0569a,
    name: "contact"
  }, {
    path: "/works",
    component: _e54105e6,
    name: "works"
  }, {
    path: "/works/chateau-les-moines",
    component: _c4db592e,
    name: "works-chateau-les-moines"
  }, {
    path: "/",
    component: _1a577325,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
