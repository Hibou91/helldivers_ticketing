<template>
    <div>
        <div class="castle-main castle-bg">
        </div>
        <Transition name="castle-bg">
            <div v-if="state.hover == 'LIBRARY'" class="castle-library castle-bg" id="CASTLE_LIBRARY">
            </div>
        </Transition>
        <Transition>
            <div v-if="state.hover == 'SALON'" class="castle-salon castle-bg" id="CASTLE_SALON">
            </div>
        </Transition>
        <Transition>
            <div v-if="state.hover == 'GARDEN'" class="castle-garden castle-bg" id="CASTLE_GARDEN">
            </div>
        </Transition>



        <tMenu menuName="Castle">

            <RouterLink to="/" class="fit-content">
                <tButton>Main Menu</tButton>
            </RouterLink>
        </tMenu>

        <div v-if="(state.hover == 'GARDEN' || state.hover == 'SALON' || state.hover == 'LIBRARY') && state.openCastlePanel == false"
            class="label-card">

            <tCard>
                <h2>{{ state.hoveredLocale.name }}</h2>
                <p>{{ state.hoveredLocale.description }}</p>
            </tCard>
        </div>
        <div v-if="state.openCastlePanel == true" class="label-card">

            <tCardClosable v-model:modalOpen="state.openCastlePanel" :closeMethod="() => { }">
                <h2>Castle</h2>
                <div class="flex-row">
                    <div class="flex-col material-col">
                        <div class="flex-row">
                            <img src="../../../static/icons/materials/paper.png" alt="" width="50" height="50"
                                >
                            <p>: {{ state.castleData.materials.paper ? state.castleData.materials.paper : 0 }}</p>
                        </div>
                        <div class="flex-row">
                            <img src="../../../static/icons/materials/silk.png" alt="" width="50" height="50"
                                >
                            <p>: {{ state.castleData.materials.silk ? state.castleData.materials.silk : 0 }}</p>
                        </div>
                        <div class="flex-row">
                            <img src="../../../static/icons/materials/wood.png" alt="" width="50" height="50"
                                >
                            <p>: {{ state.castleData.materials.wood ? state.castleData.materials.wood : 0 }}</p>
                        </div>
                    </div>

                    <div class="flex-col">
                        <div class="flex-row">
                            <img src="../../../static/icons/foods/magefish.png" alt="" width="50" height="50"
                                >
                            <p>: {{ state.castleData.materials.magefish ? state.castleData.materials.magefish : 0 }}</p>
                        </div>
                        <div class="flex-row">
                            <img src="../../../static/icons/foods/witseed.png" alt="" width="50" height="50"
                                >
                            <p>: {{ state.castleData.materials.witseed ? state.castleData.materials.witseed : 0 }}</p>
                        </div>
                        <div class="flex-row">
                            <img src="../../../static/icons/foods/lionheart.png" alt="" width="50" height="50"
                                >
                            <p>: {{ state.castleData.materials.lionheart ? state.castleData.materials.lionheart : 0 }}
                            </p>
                        </div>
                    </div>
                </div>



                <tButton @click="toast.toast('Level up messager')">Level up</tButton>
            </tCardClosable>
        </div>


        <BottomMenu name="castle" v-model:onHover="state.hover" v-model:clickValue="state.menu"></BottomMenu>


    </div>





</template>

<script setup>

import tButton from '../components/tButton.vue';
import tMenu from '../components/tMenu.vue';
import BottomMenu from '../components/BottomMenu.vue';
import tCard from '../components/tCard.vue';
import tCardClosable from '../components/tCardClosable.vue';

import { ref, watch, onMounted } from 'vue'
import { onBeforeRouteLeave } from 'vue-router'
import toast from '../misc/toast';

const state = ref({
    hover: '',
    menuOpen: false,
    castleData: {},
    hoveredLocale: {
        name: "",
        description: ''
    },
    menu: "",
    openCastlePanel: false,
    openCastleLevelup: false,
})

onMounted(() => {

    getCastleData()
})

const getCastleData = async () => {
    const response = await window.generic.getCastleData()

    state.value.castleData = response
    console.log(response);



}

const filcker = () => {

    if (state.value.hover == '') {
        return;
    }

    if (document.querySelector(`#CASTLE_${state.value.hover}`)) {
        document.querySelector(`#CASTLE_${state.value.hover}`).style.opacity = Math.random() + 0.2;
    }

    setTimeout(filcker, Math.random() * 900)
}

onBeforeRouteLeave((to, from) => {
    state.value.hover = '';
})

watch(() => state.value.hover, (newValue) => {

    if (newValue != '') {
        filcker();


        state.value.hoveredLocale = state.value.castleData.locales[newValue.toLowerCase()] ? state.value.castleData.locales[newValue.toLowerCase()] : {
            name: "",
            description: ''
        }


    }

})

watch(() => state.value.menu, (newValue) => {

    if (newValue == 'CASTLE') {
        state.value.openCastlePanel = true
    }
    state.value.menu = ''

})



</script>

<style scoped>
.label-card {
    width: 30vW;
    min-width: 400px;
}

.castle-bg {
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;

}

.castle-main {
    background-image: url("./static/castle/castle.jpg");
    z-index: -10;
}

.castle-library {
    background-image: url("./static/castle/castle library.png");
    z-index: -9;
    transition: opacity 0.3s ease;
}

.castle-salon {
    background-image: url("./static/castle/castle salon.png");
    z-index: -9;
    transition: opacity 0.3s ease;
}

.castle-garden {
    background-image: url("./static/castle/castle garden.png");
    z-index: -9;
    transition: opacity 0.3s ease;
}

.castle-bg-enter-active,
.castle-bg-leave-active {
    transition: opacity 0.5s ease;
}

.castle-bg-enter-from,
.castle-bg-leave-to {
    opacity: 0;
}

.material-col{
    margin-right: 40px;
}
</style>