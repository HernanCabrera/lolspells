<template lang="pug">
  main
    img.fondo(src="src/assets/background.jpg")
    
    ul.contenedor-menu.contenedor
      li.texto-lolspells LOL Spells
      router-link.item.icon-magic-wand(
        @click="cambiarAPP(1)"
        :class="{ 'esta-activo': opcion === 1 }"
        to="/"
      )
      button.item.icon-plus(
        @click="cambiar()"
        :class="{ 'icon-minus': full === true }"
      )
      //- router-link.item.icon-leaf(
      //-   @click="cambiarAPP(2)"
      //-   :class="{ 'esta-activo': opcion === 2 }"
      //-   to="jungla"
      //- )
      //- router-link.item.icon-man(
      //-   @click="cambiarAPP(3)"
      //-   :class="{ 'esta-activo': opcion === 3 }"
      //-   to="redes-sociales"
      //- )
      //- router-link.item.icon-cog(
      //-   @click="cambiarAPP(4)"
      //-   :class="{ 'esta-activo': opcion === 4 }"
      //-   to="ajustes"
      //- )
</template>

<script>
export default{
  props: {
    opcion: { type: Number, required: true },
    full: { type: Boolean, required: true }
  },
  methods: {
    cambiarAPP (opts) {
      this.$emit('cambiar-app', opts)
    },
    cambiar () {
      this.$emit('full')
    }
  }
}
</script>

<style lang="scss" scoped>

</style>