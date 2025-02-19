<template>
    <div class="castle-bg">
        <tMenu menuName="Castle">

            <RouterLink to="/" class="fit-content">
                <tButton>Main Menu</tButton>
            </RouterLink>
            <RouterLink :to="$route.params.backto == 'mainMenu' ? '/' : `/${$route.params.backto}`" class="fit-content">
                <tButton>Return</tButton>
            </RouterLink>
        </tMenu>

        <div class="castle-card">
            <tCard>
                <h2>Castle</h2>
                <p>Level Multiplier</p>
                <input type="text" v-model="state.castleData.levelMultiplier">
                <p>Anima level multiplier</p>
                <input type="text" v-model="state.castleData.animaLevelMultiplier">
                <p>Storage multiplier</p>
                <input type="text" v-model="state.castleData.storageMultiplier">

                <tButton @click="saveCastleData">Save settings</tButton>

            </tCard>
        </div>


    </div>

</template>

<script setup>

import tButton from '../components/tButton.vue';
import tMenu from '../components/tMenu.vue';
import tCard from '../components/tCard.vue';

import {ref, onMounted} from 'vue'
import toast from '../misc/toast';

const state = ref({
    castleData:{
        levelMultiplier: 0,
        animaLevelMultiplier: 0,
        storageMultiplier: 0,
    }
})

onMounted(() => {
    setMeUp()
})

const setMeUp = async() => {
    getCastleData()
}

const getCastleData = async () => {
    const cd = await window.generic.getCastleData()

    state.value.castleData = cd.config

}

const saveCastleData = async () => {

    let config = {
        levelMultiplier: state.value.castleData.levelMultiplier,
        animaLevelMultiplier: state.value.castleData.animaLevelMultiplier,
        storageMultiplier: state.value.castleData.storageMultiplier,
    }
    const cd = await window.generic.saveCastleConfig(config)

    if(cd != false){
        toast.toast("Your castle updated itself. Who know if for better or worse")
    }else{
        toast.toast("Ruins everywhere. The foundation of your castle is broken.")
    }

}

</script>

<style scoped>
.castle-bg {
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    top: 0;
    right: 0;
    background-image: url("./static/castle/castle.jpg");
    z-index: -10;
}

.castle-card {
    margin: 40px 40px 40px 40px;
    width: calc(100% - 80px);
    max-width: calc(100% - 80px);
    height: calc(100% - 80px - 70px);
    max-height: calc(100% - 80px);
}


.title {
    padding: 20px
}

.main-menu-button {
    display: flex;
    flex-direction: row;
}

.main-menu-title {
    margin-top: auto;
    margin-bottom: auto;
}
</style>