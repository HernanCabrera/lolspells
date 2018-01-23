<template lang="pug">
  main
    .contenedor-entrada-principal.contenedor
      h2.texto-campeon CAMPEONES
      select.seleccion-campeon(v-model="campeonSeleccionado")
        option.opcion-campeon(disabled value="") Todos los campeones
        option.opcion-campeon(v-for="(c, indice) in campeones"  :value="c") {{ c }}
      button.btn-agregar-campeon(@click="agregarALaLista(campeonSeleccionado)") AGREGAR
      
    ul.contenedor-lista-de-campeones.contenedor
      transition-group(name="move-campeon" tag="p")
        li.campeon(v-for="(l, indiceL) in listaDeCampeonesSelec"  :key="l.img")
          .contenedor-img 
            img.img-campeon(:src="l.img" @click="eliminarDeLaLista(indiceL, l.listaDeTiempos)")
            //- span.nombre-campeon {{ l.nombre }}
          .contenedor-img-rde
            img.img-rde.botas(
              src="src/assets/rde/botas.png"
              @click="activarDesactivarRDE(1, l)"
              :class="{ 'esta-prendido': l.RDE1Activo === false }"
            )
            img.img-rde.runas(
              src="src/assets/rde/runas.png"
              @click="activarDesactivarRDE(2, l)"
              :class="{ 'esta-prendido': l.RDE2Activo === false }"
            )
          ul.contenedor-lista-de-hechizos
            li.hechizo(v-for="(t, indiceT) in l.listaDeTiempos")
              .contenedor-entrada-secundaria(v-if="!t.estaAgregado")
                .contenedor-efecto
                  button.btn-agregar-hechizo(@click="activarModal(t)") HECHIZO 
                    span.icon-plus
              transition(name="move-modal")
                main(class="overlay" v-if="t.modalActivo")
                  .modal
                    h1.titulo Agregar nuevo hechizo!
                    .modal-buttons
                      select.seleccion-hechizo(v-model="t.id")
                        option.opcion-hechizo(disabled value="") Todos los hechizos
                        option.opcion-hechizo(v-for="(h, indice) in hechizos"  :value="h.id") {{ h.nombre }}
                    button(class="btn agregar" @click="agregarHechizo(t, indiceL, l, RDE)") AGREGAR
                    button(class="btn cancelar" @click="cancelarModal(t)") CANCELAR

              .contenedor-entrada-secundaria2(v-if="t.estaAgregado")
                button.btn-quitar-hechizo(@click="quitarHechizo(t)") quitar
                .contenedor-img
                  img.img-hechizo(
                    :src="t.img"
                    @click="iniciarTemporizador(t, l)"
                    :class="{ 'esta-prendido': t.estaPrendido === true }"
                  )
                  span.duracion-hechizo(
                    v-show="t.estaPrendido"
                    @click="iniciarTemporizador(t)"
                  ) {{ t.duracion | formateaTiempo }}
                audio.audio-hechizo(
                  src="src/assets/alarma.mp3" 
                  type="audio/mpeg"
                  controls
                  :id="t.DOM"
                )
          
</template>
 
<script>
import AppNuevoHechizo from './hijo/NuevoHechizo'
import { mapState } from 'vuex'
export default {
  components: { AppNuevoHechizo },
  data () {
    return {
      RDE: [],
      campeonSeleccionado: '',
      listaDeCampeonesSelec: [],
      campeones: [
        'Aatrox', 'Ahri', 'Akali', 'Alistar', 'Amumu', 'Anivia', 'Annie', 'Ashe', 'Aurelion Sol', 'Azir', 'Bardo', 'Blitzcrank', 'Brand', 'Braum', 'Caitlyn', 'Camille', 'Cassiopeia', "Cho'Gath", 'Corki', 'Darius', 'Diana', 'Dr. Mundo', 'Draven', 'Ekko', 'Elise', 'Evelynn', 'Ezreal', 'Fiddlesticks', 'Fiora', 'Fizz', 'Galio', 'Gangplank', 'Garen', 'Gnar', 'Gragas', 'Graves', 'Hecarim', 'Heimerdinger', 'Illaoi', 'Irelia', 'Ivern', 'Janna', 'Jarvan IV', 'Jax', 'Jayce', 'Jhin', 'Jinx', 'Kalista', 'Karma', 'Karthus', 'Kassadin', 'Katarina', 'Kayle', 'Kayn', 'Kennen', "Kha'Zix", 'Kindred', 'Kled', "Kog'Maw", 'Le Blanc', 'Lee Sin', 'Leona', 'Lissandra', 'Lucian', 'Lulu', 'Lux', 'Maestro Yi', 'Malphite', 'Malzahar', 'Maokai', 'Miss Fortune', 'Mordekaiser', 'Morgana', 'Nami', 'Nasus', 'Nautilus', 'Nidalee', 'Nocturne', 'Nunu', 'Olaf', 'Orianna', 'Ornn', 'Pantheon', 'Poppy', 'Quinn', 'Rakan', 'Rammus', "Rek'Sai", 'Renekton', 'Rengar', 'Riven', 'Rumble', 'Ryze', 'Sejuani', 'Shaco', 'Shen', 'Shyvana', 'Singed', 'Sion', 'Sivir', 'Skarner', 'Sona', 'Soraka', 'Swain', 'Syndra', 'Tahm Kench', 'Taliyah', 'Talon', 'Taric', 'Teemo', 'Thresh', 'Tristana', 'Trundle', 'Tryndamere', 'Twisted Fate', 'Twitch', 'Udyr', 'Urgot', 'Varus', 'Vayne', 'Veigar', 'Velkoz', 'Vi', 'Viktor', 'Vladimir', 'Volibear', 'Warwick', 'Wukong', 'Xayah', 'Xerath', 'Xin Zhao', 'Yasuo', 'Yorick', 'Zac', 'Zed', 'Ziggs', 'Zilean', 'Zoe', 'Zyra'
      ],
      hechizos: [
        { nombre: 'Barrera', duracion: 180, id: 1 },
        { nombre: 'Castigo', duracion: 75, id: 2 },
        { nombre: 'Claridad', duracion: 240, id: 3 },
        { nombre: 'Curar', duracion: 240, id: 4 },
        { nombre: 'Destello', duracion: 300, id: 5 },
        { nombre: 'Extenuación', duracion: 210, id: 6 },
        { nombre: 'Fantasma', duracion: 180, id: 7 },
        { nombre: 'Ignición', duracion: 210, id: 8 },
        { nombre: 'Purificación', duracion: 210, id: 9 },
        { nombre: 'Teleportación', duracion: 300, id: 10 }
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
          RDE1Activo: false,
          RDE2Activo: false,
          listaDeTiempos: [
            {
              id: '', estaPrendido: false, estaAgregado: false, duracion: 0, img: null, intervalo: null, DOM: '', modalActivo: false, RDE: 0
            },
            {
              id: '', estaPrendido: false, estaAgregado: false, duracion: 0, img: null, intervalo: null, DOM: '', modalActivo: false, RDE: 0
            }
          ]
        }
        this.listaDeCampeonesSelec.push(nuevoObj)
        this.campeonSeleccionado = ''
      }
    },
    agregarHechizo (t, indiceL, l, RDE) {
      if (t.id !== '') {
        const auxDOM = this.hechizos[t.id - 1].nombre + t.id + indiceL
        if (!this.existeHechizo(auxDOM, l)) {
          t.DOM = auxDOM
          t.estaAgregado = true
          t.img = this.devolverRuta(this.hechizos[t.id - 1].nombre, 2)
          t.duracion = this.hechizos[t.id - 1].duracion
          this.cancelarModal(t)
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
    iniciarTemporizador (t, l) {
      this.cambiarEstado(t)
      const dom = document.getElementById(t.DOM)
      dom.play()
      dom.pause()
      if (t.estaPrendido) {
        if (l.RDE1Activo) {
          t.RDE += 10
        }
        if (l.RDE2Activo) {
          t.RDE += 5
        }
        t.duracion = t.duracion - (t.duracion * t.RDE / 100)
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
        t.RDE = 0
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
      t.RDE = 0
      t.modalActivo = false
      t.duracion = 0
    },
    activarModal (t) {
      t.modalActivo = true
    },
    cancelarModal (t) {
      t.modalActivo = false
    },
    activarDesactivarRDE (opts, l) {
      if (opts === 1) {
        l.RDE1Activo = !l.RDE1Activo
      } else {
        l.RDE2Activo = !l.RDE2Activo
      }
    }
  },
  filters: {
    formateaTiempo (t) {
      let minutos = parseInt(t / 60) % 60
      let segundos = parseInt(t % 60)
      minutos = (minutos < 10) ? `0${minutos}` : minutos
      segundos = (segundos < 10) ? `0${segundos}` : segundos
      return `${minutos}:${segundos}`
    }
  }
}
</script>

<style lang="scss">
.contenedor-entrada-principal{
  text-align: center;
  margin: 20px auto;
  .texto-campeon{
    color: #a6a5a7;
    letter-spacing: 2px;
    padding: 20px 0;
    font-size: 2.5em;
    font-weight: 700;
  }
  .seleccion-campeon{
    display: inline-block;
    margin: 0 auto;
    width: 90%;
    padding: 3% 0;
    font-weight: 700;
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
    width: 90%;
    padding: 3% 0;
    margin-top: 2%;
    font-size: 1.8em;
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
  margin: 40px auto;
  .campeon{
    border-radius: 75px;
    background: rgba(0,0,0,.3);
    display: flex;
    margin-bottom: 1%;
    border-top: 2px solid #a6a5a7;
    border-left: 2px solid #a6a5a7;
    .contenedor-img{
      margin: 2%;
      .img-campeon{
        max-width: 100%;
        border-radius: 50%;
        border: 1px solid #a6a5a7;
        cursor: pointer;
        display: block;
      }
      .nombre-campeon{
        color: #a6a5a7;
      }
    }
    .contenedor-img-rde{
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      width: 10%;
      .img-rde{
        max-width: 90%;
        min-width: 34px;
        margin: 10% 0;
        cursor: pointer;
      }
      .botas{

      }
      .runas{

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
        text-align: center;
        &:first-child:before{
          display: none;
        }
        &:before{
          position: absolute;
          top: 0;
          left: calc(50% - 2px);
          top: 0;
          content: '';
          height: 100%;
          width: 2px;
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
          width: 100%;
          position: relative;
          .contenedor-img{
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            width: 100%;
            .img-hechizo{
              cursor: pointer;
              border: 1px solid #a6a5a7;
              border-radius: 2px;
              max-width: 50%;
              min-width: 46px;
            }
            .duracion-hechizo{
              cursor: pointer;
              font-size: 24px;
              width: 64px;
              font-weight: 700;
              color: #212529;
              position: absolute;
              background: #c4c4c4;
            }
          }
          .btn-quitar-hechizo{
            display: inline-block;
            background: none;
            color: #a6a5a7;
            color: #a6a5a7;
            border: 0;
            border-radius: 1px;
            cursor: pointer;
            font-size: 1.5em;
            padding: 0 4px;
            font-weight: 700;
            &:hover{
              color: #212529;
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
  .esta-prendido{
    -webkit-filter: grayscale(100%);
    -moz-filter: grayscale(100%);
    -ms-filter: grayscale(100%);
    -o-filter: grayscale(100%);
  }
}





.overlay{
  background: rgba(0,0,0,.5);
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: 1.1s ease-in;
  color: black;
  z-index: 5;
  .modal{
    width: 500px;
    background: white;
    padding: 2em;
    border-radius: .5em;
    text-align: center;
    font-size: 1em;
    z-index: 10;
    .titulo{
      font-size: 1.5em;
    }
    .modal-buttons{
      margin: 5% 0;
      .seleccion-hechizo{
        width: 80%;
        height: 30%;
        display: block;
        margin: 0 auto;
        font-size: 2em;
        padding: 1% 1%;
        border: 0;
        border-bottom: 5px solid #2C514C;
        color: #2C514C;
        .opcion-hechizo{
        }
      }
    }
    .btn{
      text-align: center;
      padding: .6em .8em;
      border: none;
      color: white;
      margin: 1%;
      border-radius: 5px;
      cursor: pointer;
      transition: .3s;
      font-weight: 700;
      will-change: transform;
      font-size: 1em;
    }
    .btn:active {
      transform: scale(.9);
    }
    .agregar{
      background: #0ca192;
    }
    .cancelar{
      background: #fab702;
    }
  }
}

.move-modal-enter-active{
  animation: modalIn .8s forwards;
}
.move-modal-leave-active{
  animation: modalOut .8s forwards;
}


.move-campeon-enter-active, .move-campeon-leave-active{
  transition: transform .3s;
}
.move-campeon-enter, .move-campeon-leave-to{
  transform: translateX(100%);
}
@keyframes modalIn {
  0% { transform: translateY(-3000px); }
  60% { transform: translateY(25px); }
  75% { transform: translateY(-10px); }
  90% { transform: translateY(5px); }
}
@keyframes modalOut {
  0% { transform: translateY(5px); }
  60% { transform: translateY(-10px); }
  75% { transform: translateY(25px); }
  100% { transform: translateY(-3000px); }
}
@media (max-width: 710px){
  .contenedor-entrada-principal{
    margin: 5% auto;
    .texto-campeon{
      padding: 3% 0;
    }
  }
}
@media (max-width: 335px){
  body{
    font-size: 12.8px;
  }
  .contenedor-entrada-principal{
    .texto-campeon{
      letter-spacing: 0;
    }
  }
  .contenedor-lista-de-campeones{
    margin: 8% auto;
  }
}
@media (max-width: 335px){
  body{
    font-size: 10px;
  }
}
</style>
