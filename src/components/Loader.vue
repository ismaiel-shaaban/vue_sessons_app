<template>
    <div class="overlay position-fixed">
        <span class="loader"></span>
    </div>
</template>
<script setup>

</script>
<style lang="scss">
.overlay {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.527);
    display: flex;
    align-items: center;
    justify-content: center;
    top: 0;
    left: 0;
    z-index: 9000000;
}

.loader {
    width: 50px;
    height: 50px;
    border: 5px solid #FFF;
    border-bottom-color: var(--blue-color);
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
}

@keyframes rotation {
    0% {
        transform: rotate(0deg);
    }

    100% {
        transform: rotate(360deg);
    }
}
</style>