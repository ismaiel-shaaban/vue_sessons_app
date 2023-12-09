<template>
  <main>
    <router-view></router-view>
  </main>
</template>

<script setup>
import axios from 'axios';

      axios
        .get("https://seasonreal.seasonsge.com/appv1real/info")
        .then((data) => {
            
            localStorage.setItem('websiteInfo', JSON.stringify( data.data[0]))
          
        })

        
    // import { onMounted, onBeforeUnmount } from 'vue';
    // const preventContextMenu = (e) => {
    //   e.preventDefault();
    // };
    // window.addEventListener('contextmenu', preventContextMenu);

    // const preventDevToolsShortcuts = (e) => {
    //   if (
    //     (e.ctrlKey && e.shiftKey && e.keyCode === 73) || // Ctrl+Shift+I
    //     (e.ctrlKey && e.shiftKey && e.keyCode === 74) || // Ctrl+Shift+J
    //     e.keyCode === 123
    //   ) {
    //     // F12
    //     e.preventDefault();
    //   }
    // };
    // window.addEventListener('keydown', preventDevToolsShortcuts);

    // onBeforeUnmount(() => {
    //   // Cleanup: remove event listeners when the component is unmounted
    //   window.removeEventListener('contextmenu', preventContextMenu);
    //   window.removeEventListener('keydown', preventDevToolsShortcuts);
    // });
</script>

<style lang="scss">

* {
  box-sizing: border-box;
    
}

:root {
  --orange-color: #0f0fe7;
  --blue-color: #a3a3a3;
}
/* Hide scrollbar for Chrome, Safari, and Opera */
body::-webkit-scrollbar {
  display: none !important;
}

/* Hide scrollbar for IE, Edge, and Firefox */
body {
  scrollbar-width: thin !important;
  scrollbar-color: transparent transparent !important;
}
body {
  min-height: 100vh;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.space-pre {
  white-space: pre;
}

.butn {
  background-color: var(--blue-color);
  color: white;
  border: none;
  border-bottom: 3px solid var(--orange-color);
  transition: 0.2s;

  &:hover {
    background-color: #4343ad;
    border-color: #a3a3a3;
  }
}

.heading-text {
  text-align: center;

  h1 {
    color: var(--orange-color);
    font-weight: bold;
    text-transform: uppercase;
    position: relative;
    margin-bottom: 30px;

    &::before {
      content: '';
      position: absolute;
      bottom: -12px;
      width: 20%;
      left: 50%;
      transform: translateX(-50%);
      height: 3px;
      border-radius: 50px;
      background-color: var(--orange-color);
    }
  }
}


.alert {
  top: -15%;
  left: 50%;
  transform: translateX(-50%);
  transition: 0.3s;
  width: fit-content;
  z-index: 555555555;

  &.active {
    top: 5%;
  }

  button {
    box-shadow: none;
    outline: none;
  }

  @media (max-width: 767px) {
    width: calc(100% - 50px);
  }
}

.marked-cell {
  background-color: rgb(0, 169, 199);
  color: white !important;
  font-weight: bold;

  &:hover {
    background-color: var(--dp-primary-color) !important;
  }
}

input.dp__pointer {
  padding: 8px 40px;
  border: 1px solid darkgray;
}

button.dp__action_button {
  height: 100%;
}

// Carousel Styles
.carousel__pagination {
  left: 50%;
  transform: translateX(-50%);
  bottom: 25px;
  padding: 0;
}

select ,input{
  border: none !important;
  background: #3636A0 !important;
  color: white !important;
 
}
.dp__icon{
  fill: white !important;
}
</style>