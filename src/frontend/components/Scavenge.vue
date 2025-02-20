<template>



    <div class="tCardHolder" v-if="state.loaded == true">
        <div class="tCardHolderRow">
            <TCardClosable v-model:modalOpen="openPanel" :closeMethod="() => { }">
                <div class="flex-col" style="overflow-y: hidden;">
                    <div style="height: 200px;">
                        <div class="relative" style="height: 100%;">
                            <div class="scavenge-main scavenge-bg">
                            </div>
                            <Transition name="scavenge-bg">
                                <div v-if="state.hover.typeModel == 'DUNGEONS'" class="scavenge-dungeons scavenge-bg"
                                    id="SCAVENGE_DUNGEONS">
                                </div>
                            </Transition>
                            <Transition>
                                <div v-if="state.hover.typeModel == 'FOREST'" class="scavenge-forest scavenge-bg"
                                    id="SCAVENGE_FOREST">
                                </div>
                            </Transition>
                            <Transition>
                                <div v-if="state.hover.typeModel == 'VILLAGE'" class="scavenge-village scavenge-bg"
                                    id="SCAVENGE_VILLAGE">
                                </div>
                            </Transition>
                        </div>

                    </div>
                    <div v-if="state.hover != ''">
                        <h3 class="scavenge-data-text">{{ state.hover.targetName }} quest in the {{
                            state.hover.typeName }}</h3>
                        <p class="scavenge-data-text">Chance: {{ state.hover.difficulty }}%</p>
                        <p class="scavenge-data-text">Keeper: {{ state.hover.keeperbonus }} %</p>
                        <p class="scavenge-data-text">Skills: {{ state.hover.targetSkills[0] }}, {{
                            state.hover.targetSkills[1] }}</p>
                        <p class="scavenge-data-text">Skill Bonus: {{ state.hover.skillBonus }}%</p>
                        <div class="flex-row">
                            <p class="scavenge-data-text">Prize:</p>
                            <img src="../../../static/icons/materials/anima.png" alt="" width="40" height="40">
                            <img src="../../../static/icons/foods/magefish.png" alt="" width="40" height="40">
                            <img src="../../../static/icons/foods/witseed.png" alt="" width="40" height="40">
                            <img src="../../../static/icons/foods/lionheart.png" alt="" width="40" height="40">
                            <img v-if="state.hover.type == 0" src="../../../static/icons/materials/paper.png" alt=""
                                width="40" height="40">
                            <img v-if="state.hover.type == 1" src="../../../static/icons/materials/silk.png" alt=""
                                width="40" height="40">
                            <img v-if="state.hover.type == 2" src="../../../static/icons/materials/wood.png" alt=""
                                width="40" height="40">

                        </div>

                    </div>
                </div>


            </TCardClosable>

        </div>


        <div class="tCardHolderRow w-50">
            <TCardClosable v-model:modalOpen="state.openClaimPanel" :closeMethod="() => { }"
                v-if="state.openClaimPanel == true">
                <div class="modal-form">
                    <div v-for="loot in state.generatedScavenges[0].loot" v-bind:key="loot.name">
                        <div v-if="loot.name == 'Magefish' || loot.name == 'Lionheart' || loot.name == 'Witseed'"
                            class="flex-row">
                            <img v-if="loot.name == 'Magefish'" src="../../../static/icons/foods/magefish.png" alt=""
                                width="50" height="50">
                            <img v-if="loot.name == 'Lionheart'" src="../../../static/icons/foods/lionheart.png" alt=""
                                width="50" height="50">
                            <img v-if="loot.name == 'Witseed'" src="../../../static/icons/foods/witseed.png" alt=""
                                width="50" height="50">
                            <p>: {{ loot.count }}</p>

                        </div>
                        <div v-else class="flex-row">
                            <img v-if="loot.name == 'Anima'" src="../../../static/icons/materials/anima.png" alt=""
                                width="50" height="50">
                            <img v-if="loot.name == 'Silk'" src="../../../static/icons/materials/silk.png" alt=""
                                width="50" height="50">
                            <img v-if="loot.name == 'Wood'" src="../../../static/icons/materials/wood.png" alt=""
                                width="50" height="50">
                            <img v-if="loot.name == 'Paper'" src="../../../static/icons/materials/paper.png" alt=""
                                width="50" height="50">
                            <p>: {{ loot.count }}</p>
                        </div>

                    </div>

                    <tButton @click="() => { claimScavenge() }" color="YELLOW" class="ml-10">Claim </tButton>
                </div>

            </TCardClosable>

            <div class="scavenge-holder" v-if="state.openClaimPanel == false">
                <div v-for="scavenge in state.generatedScavenges" v-bind:key="scavenge.id"
                    @mouseover="state.hover = scavenge" @mouseleave="state.hover = ''" class="scavenge-data-main ">
                    <div class="scavenge-data-image">

                        <img v-if="scavenge.typeName == 'Village'" src="../../../static/icons/scavenge/village.jpg"
                            alt="" width="100" height="100" class="scavenge-data-main">
                        <img v-if="scavenge.typeName == 'Dungeons'" src="../../../static/icons/scavenge/dungeons.jpg"
                            alt="" width="100" height="100" class="scavenge-data-main">
                        <img v-if="scavenge.typeName == 'Forest'" src="../../../static/icons/scavenge/forest.jpg" alt=""
                            width="100" height="100" class="scavenge-data-main">
                        <img v-if="calculateDifficulty(scavenge.successRate) == 'easy'" src="../../../static/icons/scavenge/easy.png" alt=""
                            width="100" height="100" class="scavenge-data-addons">
                        <img v-if="calculateDifficulty(scavenge.successRate) == 'medium'" src="../../../static/icons/scavenge/medium.png"
                            alt="" width="100" height="100" class="scavenge-data-addons">
                        <img v-if="calculateDifficulty(scavenge.successRate) == 'hard'" src="../../../static/icons/scavenge/hard.png" alt=""
                            width="100" height="100" class="scavenge-data-addons">


                        <img v-if="scavenge.targetName == 'Kill'" src="../../../static/icons/scavenge/kill.png" alt=""
                            width="100" height="100" class="scavenge-data-addons">
                        <img v-if="scavenge.targetName == 'Fetch'" src="../../../static/icons/scavenge/fetch.png" alt=""
                            width="100" height="100" class="scavenge-data-addons">
                        <img v-if="scavenge.targetName == 'Infiltrate'"
                            src="../../../static/icons/scavenge/infiltrate.png" alt="" width="100" height="100"
                            class="scavenge-data-addons">

                        <img src="../../../static/icons/scrolls/scroll_frame.png" alt="" width="100" height="100"
                            class="scavenge-data-addons">


                    </div>
                    <div class="scavenge-data pointer-link">
                        <div class="flex-row" style="justify-content: space-between; height: 100%;">

                            <div class="flex-col" style="justify-content: space-around; ">
                                <p style="margin: 0;">{{ scavenge.targetName }} quest in the {{
                                    scavenge.typeName }}</p>
                                <div class="flex-row">
                                    <p style="margin: 0 20px 0 0;">{{ scavenge.successRate }} %</p>
                                    <p style="margin: 0;">{{ scavenge.duration }} hours</p>

                                </div>

                            </div>
                            <tButtonRoundSmall @click="() => { postScavenge(scavenge.id) }"
                                :color="state.action == 'ACTIVE' ? 'RED' : 'YELLOW'" class="ml-10">{{
                                    state.buttonLabel
                                }} </tButtonRoundSmall>
                        </div>


                    </div>

                </div>


            </div>

            <tCard>
                <div class="flex-row max-h-100">
                    <div class="w-50 keeper-img-container">
                        <div class="relative max-h-100">
                            <img src="../../../static/generic_ui/keepers_bg.png" alt="" class="keeper-img">

                            <img v-if="state.categoryName == 'library'" src="../../../static/library/keeper/1.png"
                                alt="" class="scavenge-data-addons keeper-img" width="300px" />
                            <img v-if="state.categoryName == 'salon'" src="../../../static/salon/keeper/1.png" alt=""
                                class="scavenge-data-addons keeper-img" width="300px" />
                            <img v-if="state.categoryName == 'garden'" src="../../../static/garden/keeper/1.png" alt=""
                                class="scavenge-data-addons keeper-img" width="300px" />
                        </div>

                    </div>
                    <div class="w-50 inner-scroll">
                        <p><i>{{ state.keeperData.config ? `"${state.keeperData.config.description}""` : "" }}</i> </p>
                        <p class="scavenge-data-text">Homeland: {{ state.keeperData.config ?
                            state.keeperData.config.homeLand : "" }}</p>
                        <p class="scavenge-data-text">Cunning: {{ state.keeperData.skills ?
                            state.keeperData.skills.cunning : 0 }}</p>
                        <p class="scavenge-data-text">Charisma: {{ state.keeperData.skills ?
                            state.keeperData.skills.charisma : 0 }}</p>
                        <p class="scavenge-data-text">Strength: {{ state.keeperData.skills ?
                            state.keeperData.skills.strength : 0 }}</p>
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
import tButtonRoundTiny from './tButtonRoundTiny.vue'

import { ref, onMounted, watch } from 'vue'
import TButtonRound from './tButtonRound.vue'
import toast from '../misc/toast';


const openPanel = defineModel('openPanel')
const updateKey = defineModel('updateKey')
const props = defineProps(['category'])

const emit = defineEmits(['updateScavenge'])

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
        if (await window.keeperUtils.postScavenge(id) == true) {
            toast.toast(`${state.keeperData.config.name} left to the darkness. But she allways comes back, does she..?`)
            generateScavenge(props.category)
        }

    } else if (state.value.scavengeAction == "ACTIVE") {
        if (await window.keeperUtils.deleteScavenge(id) == true) {
            toast.toast('Az unsuccesfull adventure... this time')
            generateScavenge(props.category)
        }

    } else if (state.value.scavengeAction == "FINISHED") {
        state.value.openClaimPanel = true
    }
    setTimeout(() => { emit('updateScavenge'), 1000 })
}

const claimScavenge = async () => {
    await window.keeperUtils.claimScavenge(state.value.generatedScavenges[0].id)
    state.value.openClaimPanel = false
    generateScavenge(props.category)
    updateKey.value = updateKey.value + 1
}

//utils

const calculateDifficulty = (successRate) => {
    if (successRate <= 33) {
        return "hard"
    } else if (successRate > 33 && successRate < 66) {
        return "medium"
    } else {
        return "easy"
    }
}

const filcker = () => {

    if (state.value.hover == '') {
        return;
    }



    if (document.querySelector(`#SCAVENGE_${state.value.hover.typeModel}`)) {
        document.querySelector(`#SCAVENGE_${state.value.hover.typeModel}`).style.opacity = Math.random() + 0.2;
    }

    setTimeout(filcker, Math.random() * 900)
}



watch(() => state.value.hover, (newValue) => {

    if (newValue != '') {
        filcker();

    }

})

window.keeperUtils.onUpdateCounter((event, category) => {

    if (category == props.category) {
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
    width: 100%;
    ;
    height: 100%;
    background-repeat: no-repeat;
    background-size: contain;
    position: absolute;
    top: 0;
    left: 0;

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
    padding: 5px 10px 5px 0;
}

.max-h-100 {
    max-height: 100%;
    height: 100%;
}

.keeper-img-container {
    max-height: calc(100% - 10px);
    max-width: calc(50% - 10px);
}

.keeper-img {
    height: 100%;
    max-height: 100%;
    width: fit-content;
}
</style>