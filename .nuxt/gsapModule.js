import Vue from 'vue'
import { gsap } from 'gsap'

Vue.directive('gsap', (el, binding) => {
  const options = { ...binding.value }
  const modifiers = binding.modifiers

  if (modifiers.set) {
    gsap.set(el, options)
  }

  if (modifiers.to) {
    gsap.to(el, options)
  }

  if (modifiers.from) {
    gsap.from(el, options)
  }

  if (modifiers.fromTo) {
    gsap.fromTo(el, { ...binding.value[0] }, { ...binding.value[1] })
  }
})

Vue.prototype.$gsap = gsap

    if (process.client) {
        const { TextPlugin } = require('gsap/TextPlugin')
        Vue.prototype.$TextPlugin = TextPlugin
        gsap.registerPlugin(TextPlugin)

        const { ScrollToPlugin } = require('gsap/ScrollToPlugin')
        Vue.prototype.$ScrollToPlugin = ScrollToPlugin
        gsap.registerPlugin(ScrollToPlugin)

        const { ScrollTrigger } = require('gsap/ScrollTrigger')
        Vue.prototype.$ScrollTrigger = ScrollTrigger
        gsap.registerPlugin(ScrollTrigger)

      // Club Plugins
    }
