import { wrapFunctional } from './utils'

export { default as Contact } from '../..\\components\\Contact.vue'
export { default as Loading } from '../..\\components\\Loading.vue'
export { default as Logo } from '../..\\components\\Logo.vue'
export { default as Menu } from '../..\\components\\Menu.vue'
export { default as Scrollindicator } from '../..\\components\\Scrollindicator.vue'
export { default as Slider } from '../..\\components\\Slider.vue'

export const LazyContact = import('../..\\components\\Contact.vue' /* webpackChunkName: "components/contact" */).then(c => wrapFunctional(c.default || c))
export const LazyLoading = import('../..\\components\\Loading.vue' /* webpackChunkName: "components/loading" */).then(c => wrapFunctional(c.default || c))
export const LazyLogo = import('../..\\components\\Logo.vue' /* webpackChunkName: "components/logo" */).then(c => wrapFunctional(c.default || c))
export const LazyMenu = import('../..\\components\\Menu.vue' /* webpackChunkName: "components/menu" */).then(c => wrapFunctional(c.default || c))
export const LazyScrollindicator = import('../..\\components\\Scrollindicator.vue' /* webpackChunkName: "components/scrollindicator" */).then(c => wrapFunctional(c.default || c))
export const LazySlider = import('../..\\components\\Slider.vue' /* webpackChunkName: "components/slider" */).then(c => wrapFunctional(c.default || c))
