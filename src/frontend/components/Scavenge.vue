<template>



    <div class="tCardHolder" v-if="state.loaded == true">
        <TCardClosable v-model:modalOpen="openPanel" :closeMethod="() => { }">
            <div class="modal-form">


                <div class="scavenge-main scavenge-bg">
                </div>
                <Transition name="scavenge-bg">
                    <div v-if="state.hover == 'DUNGEONS'" class="scavenge-dungeons scavenge-bg" id="SCAVENGE_DUNGEONS">
                    </div>
                </Transition>
                <Transition>
                    <div v-if="state.hover == 'FOREST'" class="scavenge-forest scavenge-bg" id="SCAVENGE_FOREST">
                    </div>
                </Transition>
                <Transition>
                    <div v-if="state.hover == 'VILLAGE'" class="scavenge-village scavenge-bg" id="SCAVENGE_VILLAGE">
                    </div>
                </Transition>
            </div>

        </TCardClosable>

        <div class="tCardHolderRow">
            <TCardClosable v-model:modalOpen="state.openClaimPanel" :closeMethod="() => { }"
                v-if="state.openClaimPanel == true">
                <div class="modal-form">
                    <div v-for="loot in state.generatedScavenges[0].loot" v-bind:key="loot.name" class="flex-row">

                        <tButtonRoundSmall color="GREEN">{{ loot.name }}</tButtonRoundSmall> {{ loot.count }}
                    </div>

                    <tButton @click="() => { claimScavenge() }" color="YELLOW" class="ml-10">Claim </tButton>
                </div>

            </TCardClosable>

            <div class="scavenge-holder" v-if="state.openClaimPanel == false">
                <div v-for="scavenge in state.generatedScavenges" v-bind:key="scavenge.id"
                    @mouseover="state.hover = scavenge.typeModel" @mouseleave="state.hover = ''"
                    class="scavenge-data-main ">
                    <div class="scavenge-data-image">
                        <img src="../../../static/icons/scrolls/scroll frame.png" alt="" width="100" height="100"
                            class="scavenge-data-main">
                        <tButtonRound class="scavenge-data-addons" :color="calculateDifficulty(scavenge.successRate)">
                            {{ scavenge.successRate }} %</tButtonRound>

                    </div>
                    <div class="scavenge-data pointer-link">
                        <div class="flex-row">
                            <div>
                                <p class="scavenge-data-text">{{ scavenge.targetName }} quest in the {{
                                    scavenge.typeName }}</p>
                                <div class="tooltip flex-row">
                                    <p class="scavenge-data-text ">{{ scavenge.successRate }} %</p>
                                    <span class="tooltiptext">
                                        <p>Difficulty: {{ scavenge.difficulty }}%</p>
                                        <p>Keeper: {{ scavenge.keeperbonus }} %</p>
                                        <p>Skills: {{ scavenge.targetSkills }}</p>
                                        <p>Skill Bonus: {{ scavenge.skillBonus }}%</p>
                                    </span>
                                </div>

                            </div>
                            <tButton @click="() => { postScavenge(scavenge.id) }"
                                :color="state.action == 'ACTIVE' ? 'RED' : 'YELLOW'" class="ml-10">{{
                                    state.buttonLabel
                                }} </tButton>
                        </div>


                    </div>

                </div>


            </div>

            <tCard>
                <div class="flex-row max-h-100">
                    <div class="w-50 keeper-img-container">
                        <div class="relative max-h-100">
                            <img src="../../../static/generic ui/keepers bg.png" alt=""
                                class="keeper-img">
                            <img :src="`../../../static/${state.categoryName}/keeper/1.png`" alt=""
                                class="scavenge-data-addons keeper-img">
                        </div>

                    </div>
                    <div class="w-50 ">
                        <p><i>{{ state.keeperData.config ? `"${state.keeperData.config.description}""` : "" }}</i> </p>
                        <p>Homeland: {{ state.keeperData.config ? state.keeperData.config.homeLand : "" }}</p>
                        <p>Cunning: {{ state.keeperData.skills ? state.keeperData.skills.cunning : 0 }}</p>
                        <p>Charisma: {{ state.keeperData.skills ? state.keeperData.skills.charisma : 0 }}</p>
                        <p>Strength: {{ state.keeperData.skills ? state.keeperData.skills.strength : 0 }}</p>
                    </div>
                </div>



            </tCard>

        </div>






    </div>
</template>

<script setup>
import TCardClosable from './tCardClosable.vue'
import tCard from './tCard.vue'
import tButton from './tButton.vue'

import tButtonRound from './tButtonRound.vue'
import tButtonRoundSmall from './tButtonRoundSmall.vue'

import { ref, onMounted, watch } from 'vue'
import TButtonRound from './tButtonRound.vue'
import toast from '../misc/toast';


const openPanel = defineModel('openPanel')
const props = defineProps(['category'])

const state = ref({
    loaded: false,
    categoryName: '',
    generatedScavenges: [],
    scavengeAction: '',
    buttonLabel: '',
    hover: '',
    openClaimPanel: false,
})



onMounted(() => {
    setMeUp()

})

const setMeUp = async () => {
    await generateScavenge()
    await getKeeper()

    switch (props.category) {
        case "0":
            state.value.categoryName = "library"
            break;
        case "1":
            state.value.categoryName = "salon"
            break;
        case "2":
            state.value.categoryName = "garden"
            break;
    }
    state.value.loaded = true
}

const getKeeper = async () => {
    const response = await window.generic.getLocaleKeeperData(props.category)

    state.value.keeperData = response

    

}

const generateScavenge = async () => {

    let rawData = await window.keeperUtils.generateScavenges(props.category)


    state.value.generatedScavenges = rawData.scavenges
    state.value.scavengeAction = rawData.action
    switch (state.value.scavengeAction) {
        case "GENERATE":
            state.value.buttonLabel = "Start"
            break;
        case "ACTIVE":
            state.value.buttonLabel = "Cancel"
            break;
        case "FINISHED":
            state.value.buttonLabel = "Claim"
            break;
    }



}

const postScavenge = async (id) => {
    if (state.value.scavengeAction == "GENERATE") {
        if(await window.keeperUtils.postScavenge(id) == true){
            toast.toast('Scavenge started')
            generateScavenge(props.category)
        }
        
    } else if (state.value.scavengeAction == "ACTIVE") {
        if (await window.keeperUtils.deleteScavenge(id) == true){
            toast.toast('Scavenge cancelled')
            generateScavenge(props.category)
        }
       
    } else if (state.value.scavengeAction == "FINISHED") {
        state.value.openClaimPanel = true
    }

}

const claimScavenge = async () => {
    await window.keeperUtils.claimScavenge(state.value.generatedScavenges[0].id)
    state.value.openClaimPanel = false
    generateScavenge(props.category)
}

//utils

const calculateDifficulty = (successRate) => {
    if (successRate < 33) {
        return "RED"
    } else if (successRate > 33 && successRate < 66) {
        return "YELLOW"
    } else {
        return "GREEN"
    }
}

const filcker = () => {

    if (state.value.hover == '') {
        return;
    }

    if (document.querySelector(`#SCAVENGE_${state.value.hover}`)) {
        document.querySelector(`#SCAVENGE_${state.value.hover}`).style.opacity = Math.random() + 0.2;
    }

    setTimeout(filcker, Math.random() * 900)
}



watch(() => state.value.hover, (newValue) => {

    if (newValue != '') {
        filcker();

    }

})

window.keeperUtils.onUpdateCounter((event, category) => {
    
    if(category == props.category){
        generateScavenge(props.category)
    }
  
})



</script>

<style>
.tCardHolder {
    display: flex;
    flex-direction: row;
    max-height: calc(100% - 350px);
    height: calc(100% - 350px);
    overflow-y: visible;
    min-height: 0;
}

.tCardHolderRow {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.modal-form {
    margin-bottom: 20px;
}

.scavenge-bg {
    width: calc(100% - 80px - 100px);
    ;
    height: calc(100% - 80px);
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 40px;
    left: 40px;

}

.scavenge-main {
    background-image: url("./static/scavenge/main map.png");
    z-index: 9;
}

.scavenge-dungeons {
    background-image: url("./static/scavenge/map dungeons.png");
    z-index: 10;
    transition: opacity 0.3s ease;
}

.scavenge-forest {
    background-image: url("./static/scavenge/map forest.png");
    z-index: 10;
    transition: opacity 0.3s ease;
}

.scavenge-village {
    background-image: url("./static/scavenge/map village.png");
    z-index: 10;
    transition: opacity 0.3s ease;
}

.scavenge-bg-enter-active,
.scavenge-bg-leave-active {
    transition: opacity 0.5s ease;
}

.scavenge-bg-enter-from,
.scavenge-bg-leave-to {
    opacity: 0;
}

.scavenge-holder {
    margin: 20px;
    background-color: rgba(0, 0, 0, .7);
    min-width: 0;
    min-height: 0;
    max-width: calc(100% - 40px);
    width: 100%;
    height: calc(100% - 40px);
    max-height: calc(100% - 40px);
    transition: width 0.5 ease;
    overflow-y: auto;
}

.scavenge-data {
    height: 60px;
    width: calc(100% - 40px);
    background-image: url("./static/icons/scrolls/scroll frame fade.png");
    background-repeat: no-repeat;
    background-size: 600px 100px;
    padding: 20px;
}

.scavenge-data-main {

    display: flex;
    flex-direction: row;

}

.scavenge-data-image {
    position: relative;
    width: fit-content;

}

.scavenge-data-addons {
    position: absolute;
    top: 0;
    left: 0;
}

.ml-10 {
    margin: auto 0 auto 20px;
}

.scavenge-data-text {
    margin: 0;
    padding: 5px 0 5px 0;
}

.max-h-100 {
    max-height: 100%;
    height: 100%;
}

.keeper-img-container {
    max-height: calc(100% - 10px);
}

.keeper-img {
    height: 100%;
    max-height: 100%;
    width: fit-content;
}
</style>