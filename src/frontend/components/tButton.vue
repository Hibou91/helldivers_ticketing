<template>
    <div class="button-main ">
        <img src="../../../static/buttons/main_front.png" alt="" srcset="" width="60" height="60" class="automargin">
        <p class=" automargin transitionable">
            <slot>

            </slot>
        </p>
        <img src="../../../static/buttons/main_back.png" alt="" srcset="" width="30" height="30" class="automargin">
    </div>
</template>

<style scoped>
.button-main {
    height: 60px;
    display: flex;
    align-items: center;
    
}

.automargin {
    margin-top: auto;
    margin-bottom: auto;
    margin-right: 20px
}




</style>
