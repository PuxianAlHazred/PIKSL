<template>
  <div>
    <Logo />
    <Menu />
    <Scrollindicator />
    <Contact />
    <Nuxt />
  </div>
</template>

<style>

html {
  scroll-snap-type: y mandatory;
  font-family: Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background:#000000;
  overflow: auto;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
}
.container {
  padding: 0 200px;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  scroll-snap-align: center;
}
.title {
  display: block;
  font-weight: 600;
  font-size: 36px;
  color: #FFFFFF;
  letter-spacing: 1px;
  text-transform: uppercase;
  font-family: 'Yeseva One', cursive;
}
.sub-title {
  font-weight: 600;
  font-size: 16px;
  color: #FFFFFF;
  letter-spacing: 1px;
  text-transform: uppercase;
}
</style>
<script>
  export default {
    mounted() {
      this.$nextTick(() => {
        this.$nuxt.$loading.start()
        setTimeout(() => this.$nuxt.$loading.finish(), 6400)
      })
    }
  }
</script>
