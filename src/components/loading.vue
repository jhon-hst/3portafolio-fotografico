<template>
    <div class="window ">
        <div class="lds-hourglass">

        </div>
    </div>
</template>

<style lang="scss" scoped>
.window{
    z-index: 9 !important;
    height: 100vh;
    background-color: rgb(29, 131, 131);
    overflow: hidden;
    display: flex;
   justify-content: center;
   align-items: center;
}
.lds-hourglass {
    line-height: 200px;
    display: inline-block;
    position: relative;
    width: 64px;
    height: 64px;
}
.lds-hourglass:after {
    content: " ";
    display: block;
    border-radius: 50%;
    width: 0;
    height: 0;
    margin: 6px;
    box-sizing: border-box;
    border: 26px solid #fff;
    border-color: #fff transparent #fff transparent;
    animation: lds-hourglass 1.2s infinite;
}
@keyframes lds-hourglass {
    0% {
        transform: rotate(0);
        animation-timing-function: cubic-bezier(0.55, 0.055, 0.675, 0.19);
    }
    50% {
        transform: rotate(900deg);
        animation-timing-function: cubic-bezier(0.215, 0.61, 0.355, 1);
    }
    100% {
        transform: rotate(1800deg);
    }
}

</style>

