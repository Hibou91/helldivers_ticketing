<template>
    <div class="tCard ">
        <div class="relative card-inner">
            <img src="../../../static/generic_ui/frame_corner.png" alt="" srcset="" width="100"
                class="absolute card-frame-topleft">
            <img src="../../../static/generic_ui/frame_corner.png" alt="" srcset="" width="100"
                class="absolute card-frame-topright">
            <img src="../../../static/generic_ui/frame_corner.png" alt="" srcset="" width="100"
                class="absolute card-frame-bottomright">
            <img src="../../../static/generic_ui/frame_corner.png" alt="" srcset="" width="100"
                class="absolute card-frame-bottomleft">
            <img src="" alt="">
            <div class="card-slot">
                <slot>

                </slot>
            </div>

        </div>


    </div>
</template>

<style scoped>
.tCard {
    margin: 20px;
    background-color: rgba(0, 0, 0, .7);
    min-width: 0;
    min-height: 0;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    max-height: calc(100% - 40px);
    transition: width 0.5 ease;

}

.card-inner {
    padding: 40px;
    padding-top: 20px;
    min-width: 100px;
    min-height: 100px;
    width: calc(100% - 80px);
    height: calc(100% - 60px);
    max-height: calc(100% - 60px);
   
}

.card-slot{
    width: 100%;
    height: 100%;
    max-height: 100%;
    max-width: 100%;
    overflow-y: auto;
    overflow-x: hidden;
}

.card-frame-topleft {
    left: 0;
    top: 0;
}

.card-frame-topright {
    transform: scaleX(-1);
    right: 0;
    top: 0;
}

.card-frame-bottomright {
    transform: scaleX(-1) scaleY(-1);
    right: 0;
    bottom: 0;
}

.card-frame-bottomleft {
    transform: scaleY(-1);
    left: 0;
    bottom: 0;
}
</style>