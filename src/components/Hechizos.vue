<template lang="pug">
  main.contenedor-entrada-principal.contenedor
    h2.texto-campeon CAMPEONES
    select.seleccion-campeon(v-model="campeonSeleccionado")
      option.opcion-campeon(disabled value="") Todos los campeones
      option.opcion-campeon(v-for="(c, indice) in campeones"  :value="c") {{ c }}
    button.btn-agregar-campeon(@click="agregarALaLista(campeonSeleccionado)") AGREGAR
      
    ul.contenedor-lista-de-campeones.contenedor
      li.campeon(v-for="(l, indiceL) in listaDeCampeonesSelec")
        .contenedor-img 
          img.img-campeon(:src="l.img" @click="eliminarDeLaLista(indiceL, l.listaDeTiempos)")
          span.nombre-campeon {{ l.nombre }}
        
        ul.contenedor-lista-de-hechizos
          li.hechizo(v-for="t in l.listaDeTiempos")
            .contenedor-entrada-secundaria(v-if="!t.estaAgregado")
              .contenedor-efecto
                button.btn-agregar-hechizo(@click="agregarHechizo(t, indiceL, l)") NUEVO 
                  span.icon-plus
            
            //- .contenedor-entrada-secundaria2(v-if="t.estaAgregado")
            //-   img.img-hechizo(
            //-   :src="t.img"
            //-   @click="iniciarTemporizador(t)"
            //-   :class="{ 'esta-prendido': t.estaPrendido === true }"
            //-   )
            //-   span.duracion-hechizo {{ t.duracion | formateaTiempo }}
            //-   button.btn-quitar-hechizo.icon-minus(@click="quitarHechizo(t)")
            //-   audio.audio-hechizo(
            //-   src="src/assets/alarma.mp3" 
            //-   type="audio/mpeg"
            //-   controls
            //-   :id="t.DOM"
            //-   )
          //- li.hechizo(v-for="t in l.listaDeTiempos")
          //-   .contenedor-entrada-secundaria(v-if="!t.estaAgregado")
          //-     .contenedor-efecto
          //-       select.seleccion-secundaria(v-model="t.id")
          //-         option.opcion-hechizo(disabled value="") Todos los hechizos
          //-         option.opcion-hechizo(v-for="(h, indice) in hechizos"  :value="h.id") {{ h.nombre }}
          //-       button.btn-agregar-hechizo.icon-plus(@click="agregarHechizo(t, indiceL, l)")
            
          //-   .contenedor-entrada-secundaria2(v-if="t.estaAgregado")
          //-     img.img-hechizo(
          //-     :src="t.img"
          //-     @click="iniciarTemporizador(t)"
          //-     :class="{ 'esta-prendido': t.estaPrendido === true }"
          //-     )
          //-     span.duracion-hechizo {{ t.duracion | formateaTiempo }}
          //-     button.btn-quitar-hechizo.icon-minus(@click="quitarHechizo(t)")
          //-     audio.audio-hechizo(
          //-     src="src/assets/alarma.mp3" 
          //-     type="audio/mpeg"
          //-     controls
          //-     :id="t.DOM"
          //-     )
</template>
 
<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {
      campeonSeleccionado: '',
      listaDeCampeonesSelec: [],
      campeones: [
        'Aatrox', 'Ahri', 'Akali', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Ashe', 'Aurelion Sol', 'Azir', 'Bardo', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Cassiopeia', "Cho'Gath", 'Corki', 'Darius', 'Diana', 'Dr. Mundo', 'Draven', 'Ekko', 'Elise', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Gangplank', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Hecarim', 'Heimerdinger', 'Illaoi', 'Irelia', 'Ivern', 'Janna', 'Jarvan IV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kalista', 'Karma', 'Karthus', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', "Kha'Zix", 'Kindred', 'Kled', "Kog'Maw", 'Le Blanc', 'Lee Sin', 'Leona', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Maestro Yi', 'Malphite', 'Malzahar', 'Maokai', 'Miss Fortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Nidalee', 'Nocturne', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Quinn', 'Rakan', 'Rammus', "Rek'Sai", 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Ryze', 'Sejuani', 'Shaco', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Skarner', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Tahm Kench', 'Taliyah', 'Talon', 'Taric', 'Teemo', 'Thresh', 'Tristana', 'Trundle', 'Tryndamere', 'Twisted Fate', 'Twitch', 'Udyr', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Velkoz', 'Vi', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'Wukong', 'Xayah', 'Xerath', 'Xin Zhao', 'Yasuo', 'Yorick', 'Zac', 'Zed', 'Ziggs', 'Zilean', 'Zoe', 'Zyra'
      ],
      hechizos: [
        { nombre: 'Curar', duracion: 240, id: 1 },
        { nombre: 'Fantasma', duracion: 180, id: 2 },
        { nombre: 'Barrera', duracion: 180, id: 3 },
        { nombre: 'Extenuación', duracion: 210, id: 4 },
        { nombre: 'Claridad', duracion: 240, id: 5 },
        { nombre: 'Destello', duracion: 300, id: 6 },
        { nombre: 'Teleportación', duracion: 300, id: 7 },
        { nombre: 'Castigo', duracion: 15, id: 8 },
        { nombre: 'Ignición', duracion: 210, id: 9 },
        { nombre: 'Purificación', duracion: 210, id: 10 }
      ]
    }
  },
  created () {
    this.$store.commit('setOpcionAPP', 1)
  },
  computed: {
    ...mapState(['opcionAPP'])
  },
  methods: {
    estaSeleccionadoAPP (opts) {
      if (this.opcionAPP === opts) {
        return true
      } else {
        return false
      }
    },
    devolverRuta (str, opts) {
      if (opts === 1) {
        return 'src\\assets\\campeones\\' + str + '.png'
      } else {
        return 'src\\assets\\hechizos\\' + str + '.png'
      }
    },
    agregarALaLista (campeonSeleccionado) {
      if (this.campeonSeleccionado !== '' && !this.existeEnLaLista(campeonSeleccionado)) {
        const nuevoObj = {
          nombre: campeonSeleccionado,
          img: this.devolverRuta(campeonSeleccionado, 1),
          listaDeTiempos: [
            {
              id: '', estaPrendido: false, estaAgregado: false, duracion: 0, img: null, intervalo: null, DOM: ''
            },
            {
              id: '', estaPrendido: false, estaAgregado: false, duracion: 0, img: null, intervalo: null, DOM: ''
            }
          ]
        }
        this.listaDeCampeonesSelec.push(nuevoObj)
        this.campeonSeleccionado = ''
      }
    },
    agregarHechizo (t, indiceL, l) {
      if (t.id !== '') {
        const auxDOM = this.hechizos[t.id - 1].nombre + t.id + indiceL
        if (!this.existeHechizo(auxDOM, l)) {
          t.DOM = auxDOM
          t.estaAgregado = true
          t.img = this.devolverRuta(this.hechizos[t.id - 1].nombre, 2)
          t.duracion = this.hechizos[t.id - 1].duracion
        } else {
          t.DOM = ''
        }
      }
    },
    existeHechizo (DOM, l) {
      const longitud = l.listaDeTiempos.length
      let existe = false
      for (let i = 0; i < longitud; i++) {
        if (DOM === l.listaDeTiempos[i].DOM) {
          existe = true
        }
      }
      return existe
    },
    quitarHechizo (t) {
      this.inicializarValoresTiempo(t)
    },
    cambiarEstado (t) {
      t.estaPrendido = !t.estaPrendido
    },
    iniciarTemporizador (t) {
      this.cambiarEstado(t)
      const dom = document.getElementById(t.DOM)
      dom.play()
      dom.pause()
      if (t.estaPrendido) {
        t.intervalo = setInterval(() => {
          if (t.duracion <= 0) {
            dom.currentTime = 0
            dom.play()
            t.duracion = this.hechizos[t.id - 1].duracion
            t.estaPrendido = false
            clearInterval(t.intervalo)
          } else {
            t.duracion--
          }
        }, 1000)
      } else {
        t.estaPrendido = false
        t.duracion = this.hechizos[t.id - 1].duracion
        clearInterval(t.intervalo)
      }
    },
    existeEnLaLista (campeonSeleccionado) {
      const longitud = this.listaDeCampeonesSelec.length
      let existe = false
      for (let i = 0; i < longitud; i++) {
        if (campeonSeleccionado === this.listaDeCampeonesSelec[i].nombre) {
          existe = true
        }
      }
      return existe
    },
    eliminarDeLaLista (indiceL, t) {
      this.inicializarValoresTiempo(t[0])
      this.inicializarValoresTiempo(t[1])
      this.listaDeCampeonesSelec.splice(indiceL, 1)
    },
    inicializarValoresTiempo (t) {
      clearInterval(t.intervalo)
      t.intervalo = null
      t.id = ''
      t.estaPrendido = false
      t.estaAgregado = false
      t.img = null
      t.DOM = ''
    }
  },
  filters: {
    formateaTiempo (t) {
      let minutos = parseInt(t / 60) % 60
      let segundos = t % 60
      minutos = (minutos < 10) ? `0${minutos}` : minutos
      segundos = (segundos < 10) ? `0${segundos}` : segundos
      return `${minutos}:${segundos}`
    }
  }
}
</script>

<style lang="scss">
.esta-prendido{
  -webkit-filter: grayscale(100%);
  -moz-filter: grayscale(100%);
  -ms-filter: grayscale(100%);
  -o-filter: grayscale(100%);
}
.contenedor-entrada-principal{
  text-align: center;
  .texto-campeon{
    color: #a6a5a7;
    letter-spacing: 5px;
    padding: 3% 0;
    font-size: 2.5em;
    font-weight: 700;
  }
  .seleccion-campeon{
    display: inline-block;
    margin: 0 auto;
    width: 80%;
    height: 60px;
    font-size: 1.7em;
    border-radius: 5px;
    background: none;
    color: #a6a5a7;
    transition: .5s;
    padding-left: 2%;
    .opcion-campeon{
      color: #212529;
    }
    &:hover{
      border: 1px solid #fff;
      color: #fff;
    }
  }
  .seleccion-campeon:focus{
    border: 1px solid #f6dea7;
  }
  .btn-agregar-campeon{
    display: inline-block;
    width: 80%;
    height: 60px;
    margin-top: 2%;
    font-size: 1.5em;
    letter-spacing: 2px;
    border-radius: 5px;
    background: none;
    border: 1px solid #f6dea7;
    color: #f6dea7;
    transition: .5s;
    cursor: pointer;
    font-weight: 700;
    &:hover{
      background: #f6dea7;
      color: #212529;
    }
  }
}
.contenedor-lista-de-campeones{
  margin: 8% 0;
  .campeon{
    border-radius: 4px;
    background: rgba(0,0,0,.2);
    display: flex;
    margin-bottom: 1%;
    .contenedor-img{
      .img-campeon{
        border-radius: 50%;
        border: 1px solid #a6a5a7;
        cursor: pointer;
        display: block;
      }
      .nombre-campeon{
        color: #a6a5a7;
      }
    }
    .contenedor-lista-de-hechizos{
      display: flex;
      width: 100%;
      justify-content: center;
      align-items: center;
      position: relative;
      .hechizo{
        width: 50%;
        // border-right: 4px solid #a6a5a7;
        &:first-child:before{
          display: none;
        }
        &:before{
          position: absolute;
          top: 0;
          left: calc(50% -5px);
          top: calc(50% - 30%);
          content: '';
          height: 60%;
          width: 5px;
          background: #a6a5a7;
          display: block;
        }
        .contenedor-entrada-secundaria{
          .contenedor-efecto{
            .seleccion-secundaria{
              background: none;
              border: 1px solid #a6a5a7;
              border-radius: 5px;
              color: #a6a5a7;
              .opcion-hechizo{
                color: #212529;
              }
            }
            .btn-agregar-hechizo{
              cursor: pointer;
              background: none;
              transition: .5s;
              padding: 3%;
              border: 3px solid #a6a5a7;
              border-radius: 25px;
              color: #a6a5a7;
              transition: .3s;
              font-size: 1.2em;
              font-weight: 700;
              &:hover{
                border: 3px solid #f6dea7;
                background: #f6dea7;
                color: #212529;
              }
              .icon-plus{
                font-size: 1em;
              }
            }
          }
        }
        .contenedor-entrada-secundaria2{
          border: 1px solid #a6a5a7;
          border-right: 0;
          .img-hechizo{
            border-right: 1px solid #a6a5a7;
            cursor: pointer;
          }
          .duracion-hechizo{
            color: #f6dea7;
          }
          .btn-quitar-hechizo{
            color: none;
            cursor: pointer;
            background: #a6a5a7;
            &:hover{
              background: #f6dea7;
            }
          }
          .audio-hechizo{
            opacity: 0;
            position: absolute;
            z-index: -1;
            height: 10px;
            width: 10px;
            top: 0;
            left: 0;
          }
        }
      }
    }
  }
  .campeon:last-child{
    border: 0;
  }
}
</style>
