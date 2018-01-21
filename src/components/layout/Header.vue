<template lang="pug">
  main
    img.fondo(src="src/assets/background.jpg")
    
    ul.contenedor-menu.contenedor
      li.texto-lolspells LOL Spells
      router-link.item.icon-magic-wand(
        @click="cambiarAPP(1)"
        :class="estaSeleccionadoClase(1)"
        to="/"
      )
      router-link.item.icon-leaf(
        @click="cambiarAPP(2)"
        :class="estaSeleccionadoClase(2)"
        to="jungla"
      )
      router-link.item.icon-man(
        @click="cambiarAPP(3)"
        :class="estaSeleccionadoClase(3)"
        to="redes-sociales"
      )
      router-link.item.icon-cog(
        @click="cambiarAPP(4)"
        :class="estaSeleccionadoClase(4)"
        to="ajustes"
      )
</template>

<script>
export default{
  methods: {
    estaSeleccionadoClase (opts) {
      this.$emit('seleccionado', opts)
    },
    cambiarAPP (opts) {
      this.$emit('cambiar-app', opts)
    }
  }
}
</script>

<style lang="scss">

</style>