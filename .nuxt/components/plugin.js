import Vue from 'vue'
import { wrapFunctional } from './utils'

const components = {
  UiBackgroundTest: () => import('../..\\components\\ui\\background-test.vue' /* webpackChunkName: "components/ui-background-test" */).then(c => wrapFunctional(c.default || c)),
  UiBackground: () => import('../..\\components\\ui\\background.vue' /* webpackChunkName: "components/ui-background" */).then(c => wrapFunctional(c.default || c)),
  UiContact: () => import('../..\\components\\ui\\contact.vue' /* webpackChunkName: "components/ui-contact" */).then(c => wrapFunctional(c.default || c)),
  UiLoading: () => import('../..\\components\\ui\\loading.vue' /* webpackChunkName: "components/ui-loading" */).then(c => wrapFunctional(c.default || c)),
  UiLogo: () => import('../..\\components\\ui\\logo.vue' /* webpackChunkName: "components/ui-logo" */).then(c => wrapFunctional(c.default || c)),
  UiMenu: () => import('../..\\components\\ui\\menu.vue' /* webpackChunkName: "components/ui-menu" */).then(c => wrapFunctional(c.default || c)),
  WidgetEyes: () => import('../..\\components\\widget\\eyes.vue' /* webpackChunkName: "components/widget-eyes" */).then(c => wrapFunctional(c.default || c)),
  WidgetLogoTypoBig: () => import('../..\\components\\widget\\logo-typo-big.vue' /* webpackChunkName: "components/widget-logo-typo-big" */).then(c => wrapFunctional(c.default || c)),
  WidgetLogoTypoSmall: () => import('../..\\components\\widget\\logo-typo-small.vue' /* webpackChunkName: "components/widget-logo-typo-small" */).then(c => wrapFunctional(c.default || c)),
  WidgetScrollindicator: () => import('../..\\components\\widget\\scrollindicator.vue' /* webpackChunkName: "components/widget-scrollindicator" */).then(c => wrapFunctional(c.default || c)),
  WidgetSlider: () => import('../..\\components\\widget\\slider.vue' /* webpackChunkName: "components/widget-slider" */).then(c => wrapFunctional(c.default || c))
}

for (const name in components) {
  Vue.component(name, components[name])
  Vue.component('Lazy' + name, components[name])
}
