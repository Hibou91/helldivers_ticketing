<template>
    <div class="bottom-menu-main">
        <div class="menu-frame">
            <div>
                <img src="../../../static/generic_ui/bottom_menu_panel.png" class="menu-panel" alt="" srcset=""
                    width="250">
            </div>
            <div v-for="(button, index) in bottomMenuConfig[props.name].buttons" class="menu-long-frame-img"
                :style="`rotate: ${state.maxAngle - (index * state.distance)}deg; animation-duration: ${(index + 1) * 0.5}s;`"
                @mouseover="onHover = button.name" @mouseleave="onHover = ''">
                <div v-if="button.isRouterLink == true">
                    <RouterLink :to="button.to" class="relative ">
                        <img src="../../../static/buttons/eye_button_long_bg_yellow.png" alt="" srcset="" width="70"
                            :class="{ 'menu-long-frame-img-bg': onHover == button.name }"
                            class="menu-long-frame-img-bg-default absolute">
                            <img v-if="button.icon == 'castle'" src="../../../static/buttons/eye_button_long_castle.png" alt=""
                        srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'garden'" src="../../../static/buttons/eye_button_long_garden.png" alt=""
                        srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'keeper'" src="../../../static/buttons/eye_button_long_keeper.png" alt=""
                        srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'library'" src="../../../static/buttons/eye_button_long_library.png"
                        alt="" srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'loot'" src="../../../static/buttons/eye_button_long_loot.png" alt=""
                        srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'necategory'" src="../../../static/buttons/eye_button_long_necategory.png"
                        alt="" srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'newquest'" src="../../../static/buttons/eye_button_long_newquest.png"
                        alt="" srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'questcategory'"
                        src="../../../static/buttons/eye_button_long_questcategory.png" alt="" srcset="" width="70"
                        class="absolute">
                    <img v-if="button.icon == 'salon'" src="../../../static/buttons/eye_button_long_salon.png" alt=""
                        srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'scavenge'" src="../../../static/buttons/eye_button_long_scavenge.png"
                        alt="" srcset="" width="70" class="absolute">
                        <img src="../../../static/buttons/eye_button_long_frame.png" alt="" srcset="" width="70">
                    </RouterLink>
                </div>
                <div v-else @click="clickValue = button.name">
                    <img src="../../../static/buttons/eye_button_long_bg_yellow.png" alt="" srcset="" width="70"
                        :class="{ 'menu-long-frame-img-bg': onHover == button.name }"
                        class="menu-long-frame-img-bg-default absolute">
                    <img v-if="button.icon == 'castle'" src="../../../static/buttons/eye_button_long_castle.png" alt=""
                        srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'garden'" src="../../../static/buttons/eye_button_long_garden.png" alt=""
                        srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'keeper'" src="../../../static/buttons/eye_button_long_keeper.png" alt=""
                        srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'library'" src="../../../static/buttons/eye_button_long_library.png"
                        alt="" srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'loot'" src="../../../static/buttons/eye_button_long_loot.png" alt=""
                        srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'necategory'" src="../../../static/buttons/eye_button_long_necategory.png"
                        alt="" srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'newquest'" src="../../../static/buttons/eye_button_long_newquest.png"
                        alt="" srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'questcategory'"
                        src="../../../static/buttons/eye_button_long_questcategory.png" alt="" srcset="" width="70"
                        class="absolute">
                    <img v-if="button.icon == 'salon'" src="../../../static/buttons/eye_button_long_salon.png" alt=""
                        srcset="" width="70" class="absolute">
                    <img v-if="button.icon == 'scavenge'" src="../../../static/buttons/eye_button_long_scavenge.png"
                        alt="" srcset="" width="70" class="absolute">
                    <img src="../../../static/buttons/eye_button_long_frame.png" alt="" srcset="" width="70">

                </div>


            </div>
            <div>
                <img src="../../../static/generic_ui/bottom_menu_panel_middle.png" class="menu-panel-middle" alt=""
                    srcset="" width="105">
                <img src="../../../static/generic_ui/bottom_menu_anima.png" class="menu-panel-middle menu-panel-anima"
                    alt="" ref="menuPanelAnima" width="105"
                    :style="state.animaY != undefined ? `top:${state.animaY - 149}px;mask-position: 0 ${(state.animaY) * -1}px;` : ''">
                <!--mask-position: 0 ${state.animaY * -1}px;-->
            </div>


        </div>

    </div>
</template>

<script setup>


import bottomMenuConfig from '../misc/bottomMenuConfig';
import { ref, onMounted, useTemplateRef } from 'vue'

const props = defineProps(['name'])
const onHover = defineModel('onHover')
const clickValue = defineModel('clickValue')

const minAnima = 80

const state = ref({
    distance: 25,
    animaY: 0,
    anima: 0,
    castleLevel: 0
})

state.value.maxAngle = (bottomMenuConfig[props.name + ''].buttons.length * state.value.distance) / 2 - 11

const anima = useTemplateRef("menuPanelAnima")

onMounted(() => {
    setMeUp()

})

const setMeUp = async () => {
    const cf = await window.generic.getCastleConfig();

    state.value.castleConfig = cf;



    if (state.value.castleConfig.materials && state.value.castleConfig.materials.anima) {
        state.value.anima = state.value.castleConfig.materials.anima
    }
    if (state.value.castleConfig.castleLevel) {
        state.value.castleLevel = state.value.castleConfig.castleLevel
    }

    state.value.animaY = minAnima
    if (state.value.anima == 0) {
        return;
    }
    let maxAnima = state.value.castleConfig.config.animaLevelMultiplier * state.value.castleConfig.config.storageMultiplier

    state.value.animaY = minAnima - (((state.value.anima / maxAnima) * minAnima))

}


</script>

<style scoped>
.bottom-menu-main {
    position: fixed;
    width: 100Vw;
    bottom: 0;
}

.menu-frame {
    position: relative;
    width: 100%;
    height: 100%;
}

.menu-long-frame-img {
    position: absolute;
    left: calc(50% - 38px);
    bottom: 0;
    transform-origin: 50% 100%;
    animation: rotateIn 1.5s ease-in-out;
    height: 200px;
    overflow: hidden;
}

.menu-long-frame-img-bg-default {
    z-index: -10;
    filter: brightness(0.7);

}

.bottom-menu-main:hover .menu-long-frame-img-bg {

    filter: brightness(1);

}

.bottom-menu-main:active .menu-long-frame-img-bg {

    filter: brightness(1.3);

}

.menu-panel {
    position: absolute;
    left: calc(50% - 125px);
    bottom: 0;
}

.menu-panel-middle {
    position: absolute;
    left: calc(50% - 52px);
    bottom: 0;
}

.menu-panel-anima {
    mask-image: url("../../../static/generic_ui/bottom_menu_anima_mask.png");
    mask-mode: alpha;
    mask-size: cover;
    mask-repeat: no-repeat;
}

@keyframes rotateIn {
    0% {
        transform: rotate(180deg);
    }
}

/* The element to apply the animation to */
</style>