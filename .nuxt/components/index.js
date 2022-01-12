import { wrapFunctional } from './utils'

export { default as WidgetEyes } from '../..\\components\\widget\\eyes.vue'
export { default as WidgetLogoTypoBig } from '../..\\components\\widget\\logo-typo-big.vue'
export { default as WidgetLogoTypoSmall } from '../..\\components\\widget\\logo-typo-small.vue'
export { default as WidgetScrollindicator } from '../..\\components\\widget\\scrollindicator.vue'
export { default as WidgetSlider } from '../..\\components\\widget\\slider.vue'
export { default as UiBackgroundTest } from '../..\\components\\ui\\background-test.vue'
export { default as UiBackground } from '../..\\components\\ui\\background.vue'
export { default as UiContact } from '../..\\components\\ui\\contact.vue'
export { default as UiLoading } from '../..\\components\\ui\\loading.vue'
export { default as UiLogo } from '../..\\components\\ui\\logo.vue'
export { default as UiMenu } from '../..\\components\\ui\\menu.vue'

export const LazyWidgetEyes = import('../..\\components\\widget\\eyes.vue' /* webpackChunkName: "components/widget-eyes" */).then(c => wrapFunctional(c.default || c))
export const LazyWidgetLogoTypoBig = import('../..\\components\\widget\\logo-typo-big.vue' /* webpackChunkName: "components/widget-logo-typo-big" */).then(c => wrapFunctional(c.default || c))
export const LazyWidgetLogoTypoSmall = import('../..\\components\\widget\\logo-typo-small.vue' /* webpackChunkName: "components/widget-logo-typo-small" */).then(c => wrapFunctional(c.default || c))
export const LazyWidgetScrollindicator = import('../..\\components\\widget\\scrollindicator.vue' /* webpackChunkName: "components/widget-scrollindicator" */).then(c => wrapFunctional(c.default || c))
export const LazyWidgetSlider = import('../..\\components\\widget\\slider.vue' /* webpackChunkName: "components/widget-slider" */).then(c => wrapFunctional(c.default || c))
export const LazyUiBackgroundTest = import('../..\\components\\ui\\background-test.vue' /* webpackChunkName: "components/ui-background-test" */).then(c => wrapFunctional(c.default || c))
export const LazyUiBackground = import('../..\\components\\ui\\background.vue' /* webpackChunkName: "components/ui-background" */).then(c => wrapFunctional(c.default || c))
export const LazyUiContact = import('../..\\components\\ui\\contact.vue' /* webpackChunkName: "components/ui-contact" */).then(c => wrapFunctional(c.default || c))
export const LazyUiLoading = import('../..\\components\\ui\\loading.vue' /* webpackChunkName: "components/ui-loading" */).then(c => wrapFunctional(c.default || c))
export const LazyUiLogo = import('../..\\components\\ui\\logo.vue' /* webpackChunkName: "components/ui-logo" */).then(c => wrapFunctional(c.default || c))
export const LazyUiMenu = import('../..\\components\\ui\\menu.vue' /* webpackChunkName: "components/ui-menu" */).then(c => wrapFunctional(c.default || c))
