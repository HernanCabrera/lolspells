<template lang="pug">
  .contenedor-entrada-principal.contenedor
    h2.texto-campeon CAMPEONES
    app-select(
      :array="campeones",
      :select="campeonSeleccionado"
    )
    button.btn-agregar-campeon(@click="agregarALaLista(campeonSeleccionado)") AGREGAR
</template>

<script>
export default{
  props: {
    campeonSeleccionado: { type: Object, required: true },
    campeones: { type: Array, required: true }
  },
  methods: {
    agregarALaLista (campeonSeleccionado) {
      this.$emit('agregar', campeonSeleccionado)
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
@media (max-width: 710px){
  .contenedor-entrada-principal{
    margin: 5% auto;
    .texto-campeon{
      padding: 3% 0;
    }
  }
}
@media (max-width: 335px){
  .contenedor-entrada-principal{
    .texto-campeon{
      letter-spacing: 0;
    }
  }
}
</style>