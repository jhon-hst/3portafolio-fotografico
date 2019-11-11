<template>
  <div id="app">
      <!-- <router-link to="/cms">cms</router-link> -->
  
    <router-view/>
  </div>
</template>

<style lang="scss">
  @import url('https://fonts.googleapis.com/css?family=Viga&display=swap');


body::-webkit-scrollbar {
  width: 8px;
  height: 8px;
  background-color: rgba(0, 0, 0, 0.9);
}
/* Add a thumb */
body::-webkit-scrollbar-thumb {
    background: rgb(29, 131, 131);
}


</style>
