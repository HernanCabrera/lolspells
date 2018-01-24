<template lang="pug">
  v-select.seleccion-campeon(
    :options="array",
    v-model="select.nombre"
  )
</template>

<script>
import VSelect from 'vue-select'
export default{
  components: { VSelect },
  props: {
    select: { type: Object, required: true },
    array: { type: Array, required: true }
  }
}
</script>

<style lang="scss">
.seleccion-campeon{
  width: 90%;
  margin: 0 auto;
  .dropdown-toggle{
    padding: 3% 0; 
    border: 1px solid #a6a5a7;
    min-height: 5em;
    text-align: left;
    display: flex;
    align-items: center;
    .selected-tag{
      margin: 0 0 0 4%;
      color: #a6a5a7;
      font-weight: 700;
      font-size: 2em;
    }
    .v-select .selected-tag{
      float: left;
      position: relative;
      width: 100%;
    }
    .clear{
      font-size: 3em;
      color: #a6a5a7;
      right: 10%;
      top: calc(50% - 0.55em);
    }
    .open-indicator{
      top: calc(50% - 1em);
      right: 6%;
      &:before{
        border-width: .5em .5em 0 0;
        width: 1.5em;
        height: 1.5em;
        border-color: #a6a5a7;
      }
    }
    .form-control{
      color: #a6a5a7;
      position: absolute;
      top: calc(50% - 17px);
      left: 3%;
      &:focus{
        font-size: 2em;
        position: absolute;
        top: calc(50% - 17px);
      }
    }
  }
}
@media (max-width: 400px){
  .seleccion-campeon{
    .dropdown-toggle{
      .clear{
        right: 12%;
      }
    }
  }
}
</style>