<template lang="pug">
  #app
    app-header(
      @seleccionado="estaSeleccionadoClase"
      @cambiar-app="cambiarAPP"
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
    }
  },
  computed: {
    ...mapState(['opcionAPP'])
  },
  methods: {
    cambiarAPP (opts) {
      this.opcionAPP = opts
    },
    estaSeleccionadoClase (opts) {
      if (this.opcionAPP === opts) {
        return 'esta-activo'
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
</style>
