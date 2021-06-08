import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e8332898 = () => interopDefault(import('..\\pages\\editor.vue' /* webpackChunkName: "pages/editor" */))
const _0af0971e = () => interopDefault(import('..\\pages\\layout\\index.vue' /* webpackChunkName: "pages/layout/index" */))
const _1cd5ad72 = () => interopDefault(import('..\\pages\\login.vue' /* webpackChunkName: "pages/login" */))
const _44341e2a = () => interopDefault(import('..\\pages\\register.vue' /* webpackChunkName: "pages/register" */))
const _6c5028ac = () => interopDefault(import('..\\pages\\settings.vue' /* webpackChunkName: "pages/settings" */))
const _532e0a5b = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/editor",
    component: _e8332898,
    name: "editor"
  }, {
    path: "/layout",
    component: _0af0971e,
    name: "layout"
  }, {
    path: "/login",
    component: _1cd5ad72,
    name: "login"
  }, {
    path: "/register",
    component: _44341e2a,
    name: "register"
  }, {
    path: "/settings",
    component: _6c5028ac,
    name: "settings"
  }, {
    path: "/",
    component: _532e0a5b,
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
