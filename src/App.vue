<template lang="pug">
  #app
    app-header(
      :opcion="opcionAPP"
      :full="estaFullScreen"
      @cambiar-app="cambiarAPP"
      @full="cambiarFullScreen"
    )
    router-view

</template>
 
<script>
import AppHeader from './components/layout/Header.vue'
import { mapState } from 'vuex'

export default {
  name: 'app',
  components: { AppHeader },
  data () {
    return {
      estaFullScreen: false
    }
  },
  computed: {
    ...mapState(['opcionAPP'])
  },
  methods: {
    cambiarAPP (opts) {
      this.opcionAPP = opts
    },
    cambiarFullScreen () {
      const doc = window.document
      const docEl = doc.documentElement
      const requestFullScreen = docEl.requestFullscreen || docEl.mozRequestFullScreen || docEl.webkitRequestFullScreen || docEl.msRequestFullscreen
      const cancelFullScreen = doc.exitFullscreen || doc.mozCancelFullScreen || doc.webkitExitFullscreen || doc.msExitFullscreen
      if (!doc.fullscreenElement && !doc.mozFullScreenElement && !doc.webkitFullscreenElement && !doc.msFullscreenElement) {
        this.estaFullScreen = true
        requestFullScreen.call(docEl)
      } else {
        this.estaFullScreen = false
        cancelFullScreen.call(doc)
      }
    }
  }
}
</script>

<style lang="scss">
*{
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
body{
  font-size: 16px;
  font-family: sans-serif, helvetica;
  min-height: 100vh;
}
ul{
  list-style: none;
}
button{
  background: none;
  border: 0;
  color: #a6a5a7;
}
.fondo{
  position: fixed;
  display: block;
  height: 100vh;
  width: 100vw;
  background: url('./assets/background.jpg');
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
}
.contenedor{
  max-width: 700px;
  margin: 0 auto;
}
.contenedor-menu{
  display: flex;
  height: 80px;
  border-bottom: 1px solid #a6a5a7;
  .texto-lolspells{
    color: #f6dea7;
    width: 40%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding-left: 4%;
    font-size: 2em;
    font-weight: 900;
  }
  .item{
    text-decoration: none;
    color: #a6a5a7;
    width: 15%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 3.2em;
    font-weight: 900;
    transition: .3s;
    cursor: pointer;
  }
  .item:hover{
    color: #f6dea7;
  }
  .esta-activo{
    color: #f6dea7;
  }
}
@media (max-width: 534px){
  body{
    font-size: 12.8px;
  }
}

@media (max-width: 300px){
  body{
    font-size: 10px;
  }
}
</style>
