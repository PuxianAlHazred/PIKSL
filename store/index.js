export const state = () => ({
  preloading: false,
  menu: false,
  audio: true,
  konami: false,
  canvas: {
    theme1: {
        NB_ITE:65,
        X0:1.50,
        X1:2.50,
        Y0:0.50,
        Y1:1.78,
        T0:3000,
        T1:6000,
    },
    theme2: {
        NB_ITE:5,
        X0:2.50,
        X1:1.50,
        Y0:1.50,
        Y1:10.78,
        T0:9000,
        T1:9000,
    },
    theme3: {
        NB_ITE:5,
        X0:1.50,
        X1:2.50,
        Y0:20.50,
        Y1:10.78,
        T0:60000,
        T1:60000,
    },
  },
})
export const mutations = {
    tglPreloading(state) { 
        state.preloading = !state.preloading 
    },
    tglMenu(state) { 
        state.menu = !state.menu 
    },
    tglAudio(state) { 
        state.audio = !state.audio 
    }
}
export const actions = {
    preloading({ commit }) { 
        commit('tglPreloading') 
    },
    menu({ commit }) { 
        commit('tglMenu') 
    },
    audio({ commit }) { 
        commit('tglAudio') 
    },
    async sound1({state}) {
        const sound = require("@/assets/ui/1.ogg")
        let sndUi = sound.default
        try {
          const snd = new Audio(sndUi)
          if( state.audio ) { 
                snd.loop = true
                snd.play()
          } 
          if ( !state.audio ){
            snd.muted = true
          }
        } catch(e) {
        }
    },
    async sound2({state}) {
        const sound = require("@/assets/ui/2.ogg")
        let sndUi = sound.default
        try {
          if( state.audio ) { 
            const snd = new Audio(sndUi)
            snd.play()
          } else {
            snd.paused()  
          }
        } catch(e) {
        }
    },
    async sound3({state}) {
        const sound = require("@/assets/ui/3.ogg")
        let sndUi = sound.default
        try {
          if( state.audio ) { 
            const snd = new Audio(sndUi)
            snd.play()
          } else {
            snd.paused()  
          }
        } catch(e) {
        }
    },
    async sound4({state}) {
        const sound = require("@/assets/ui/4.ogg")
        let sndUi = sound.default
        const snd = new Audio(sndUi)

        try {
          if( state.audio ) { 
            if( state.menu ) { 
                snd.loop = true
                snd.play()
            } else {
                snd.pause()
            }
          } 
          if ( !state.audio ){
            snd.muted = true
          }
        } catch(e) {
        }
    },
}
export const getters = {
    preloading(state) { 
        return state.preloading 
    },
    menu(state) { 
        return state.menu 
    },
    audio(state) { 
        return state.audio 
    },
}
