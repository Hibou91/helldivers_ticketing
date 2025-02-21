<template>
    <div class="castle-bg castle-main">
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
                <div>
                    <h2>Castle</h2>
                    <p>Your castle is moved a bit by the rules of physics and the rules of occult mathematics. </p>
                    <p>To reach the next level of anything think of your current level multiplied by the level multipliers.</p>
                    <p>Your storage is allways the level requirement multiplied by the storage multiplier.</p>
                    <p>Level Multiplier</p>
                    <input type="text" v-model="state.castleData.levelMultiplier">
                    <p>Anima level multiplier</p>
                    <input type="text" v-model="state.castleData.animaLevelMultiplier">
                    <p>Storage multiplier</p>
                    <input type="text" v-model="state.castleData.storageMultiplier">

                    <tButton @click="saveCastleData" style="margin: 30px 0 50px 0;">Save settings</tButton>
                </div>
                <h2>Materials</h2>

                <p></p>

                <div v-for="material in state.materialData">
                    <h3 @click="material.open = !material.open" class="pointer-link">{{ material.name }}</h3>
                    <div v-if="material.open == true">
                        <p>Occurrence</p>
                        <input type="text" v-model="material.occurrence">
                        <p>Maximum find</p>
                        <input type="text" v-model="material.countmin">
                        <p>Minimum find</p>
                        <input type="text" v-model="material.countmax">
                        <p>Category restriction</p>
                        <select  v-model="material.category">
                            <option value="0">Dungeon</option>
                            <option value="1">Village</option>
                            <option value="2">Forest</option>
                        </select>


                        <tButton @click="saveMaterialConfig" style="margin: 30px 0 50px 0;">Save settings</tButton>
                    </div>

                </div>


            </tCard>
        </div>


    </div>

</template>

<script setup>

import tButton from '../components/tButton.vue';
import tMenu from '../components/tMenu.vue';
import tCard from '../components/tCard.vue';

import { ref, onMounted } from 'vue'
import toast from '../misc/toast';

const state = ref({
    castleData: {
        levelMultiplier: 0,
        animaLevelMultiplier: 0,
        storageMultiplier: 0,
    },
    materialData: {},

})

onMounted(() => {
    setMeUp()
})

const setMeUp = async () => {
    getCastleData()
    getMaterialConfig()
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

    if (cd != false) {
        toast.toast("Your castle updated itself. Who know if for better or worse")
    } else {
        toast.toast("Ruins everywhere. The foundation of your castle is broken.")
    }

}

const getMaterialConfig = async () => {
    const mc = await window.generic.getMaterialConfig()

    
    if(mc != false){
        state.value.materialData = mc

       
    }

    

}

const saveMaterialConfig = async () => {


    const cd = await window.generic.saveMaterialConfig(JSON.parse(JSON.stringify(state.value.materialData)))

    if (cd != false) {
        toast.toast("Your castle updated itself. Who know if for better or worse")
    } else {
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