<template>
  <div>
    <h1>
      <div class="preloader">
        <div class="loader">
          <div class="loader__figure"/>
          <p class="loader__label">Loading...</p>
        </div>
      </div>
    </h1>
  </div>
</template>


<script>
  import 'bootstrap/dist/css/bootstrap.css'
  import 'bootstrap-vue/dist/bootstrap-vue.css'


  export default {
    name: 'loading-component',
  }
</script>
