<template>
    <div class="library-bg" :style="`background-image: url('./static/${config.model}/first.jpg');`" @update:scavenge="console.log(updated)">
        <tMenu menuName="Library">

            <RouterLink to="/castle">
                <tButton>Castle</tButton>
            </RouterLink>
            <RouterLink to="/">
                <tButton>Main Menu</tButton>
            </RouterLink>
            <RouterLink :to="`/documentation/${props.config.model}`">
                <tButton>Documentation</tButton>
            </RouterLink>

        </tMenu>
        <div v-if="state.openEditQuests == false && state.openScavenge == false && state.openNewQuests == false && state.openCategories == false && state.openKeeper == false"
            class="tCardHolder">
            <div class="tCardHolderRow">
                <tCard>
                    <h2>{{ config.name }}</h2>
                    <div class="flex-row">
                        <div class="left-col">
                            <h3>Categories</h3>
                            <div v-if="state.questCategories.length == 0">
                                <p>No categories... yet</p>
                            </div>
                            <div v-else v-for="category in state.questCategories" class="flex-row">
                                <img :src="`../../../static/buttons/round_frame.png`" alt="" height="15"
                                    style="margin: auto 20px auto 10px;">
                                <p>{{ category.name }}</p>
                            </div>
                        </div>
                        <div class="right-col">

                        </div>

                    </div>


                </tCard>

                <tCard style="height: 600px;">

                    <div class="flex-row">
                        <div class="left-col " style="text-align: center;">
                            <div class="relative">
                                <img :src="`../../../static/buttons/round_frame.png`" alt="" height="100"
                                    class="absolute">
                                <img :src="`../../../static/icons/keepers/${config.category}.png`" alt="" height="100">
                            </div>
                            <p><i>"{{ state.keeperDialog }}"</i></p>


                        </div>
                        <div class="right-col">
                            <div class="flex-row">
                                <h2>{{ state.keeper.config ? state.keeper.config.name : "" }} </h2>
                                <span style="margin-top: 27px; margin-left: 10px;">the {{ state.keeper.title }}</span>
                            </div>

                            <p>{{ state.scavengeText }}</p>


                        </div>
                    </div>

                </tCard>

            </div>
            <div class="scroll-holder">
                <div v-for="(quest, index) in state.quests" class="scroll-main scroll-main-frame">
                    <div class="scroll-image" :class="{ 'scroll-panic': quest.priority == 2 }">
                        <img src="../../../static/icons/scrolls/scroll_frame.png" alt="" width="100" height="100"
                            class="scroll-main" :style="getFrameColor(quest.questCategory)">
                        <img src="../../../static/icons/scrolls/scroll.png" alt="" width="100" height="100"
                            class="scroll-addons">
                        <img v-if="quest.priority == 0" src="../../../static/icons/scrolls/seal_blue.png" alt=""
                            width="100" height="100" class="scroll-addons">
                        <img v-if="quest.priority == 1" src="../../../static/icons/scrolls/seal_green.png" alt=""
                            width="100" height="100" class="scroll-addons">
                        <img v-if="quest.priority == 2" src="../../../static/icons/scrolls/seal_red.png" alt=""
                            width="100" height="100" class="scroll-addons">
                    </div>
                    <div class="scroll-data pointer-link" @click="() => { openQuest(index) }"
                        :style="getFrameColor(quest.questCategory)">
                        <div>
                            <h3 style="margin: 20px 0 20px 0;">{{ quest.title }}</h3>
                            <div class="flex-row" style="margin: 0;">
                                <p style="margin: 0;">{{ quest.progressName }} <span v-if="quest.progress == 2">on {{ quest.waitingFor
                                        }}</span>
                                </p>
                                <p v-if="quest.subQuests.length > 0" style="margin: 0; margin-left: 15px;">{{ Math.round (((quest.subQuests.filter( e => e.done == true).length) / quest.subQuests.length) * 100)  }} %</p>
                            </div>
                            

                        </div>


                    </div>

                </div>
            </div>



        </div>

        <QuestEditor v-if="state.openEditQuests == true" v-model:openPanel="state.openEditQuests"
            v-model:questId="state.editQuest" :category="config.category" :questCategories="state.questCategories"
            :questConfig="state.questConfig">
        </QuestEditor>
        <Scavenge v-if="state.openScavenge == true" v-model:openPanel="state.openScavenge" :category="config.category"
            :keeperData="state.keeper" :updateKey="state.updateKey">
        </Scavenge>
        <QuestCategories v-if="state.openCategories == true" v-model:openPanel="state.openCategories"
            :category="config.category"></QuestCategories>
        <Keeper v-if="state.openKeeper == true" v-model:openPanel="state.openKeeper" :category="config.category"
            :keeperData="state.keeper"></Keeper>

        <modal v-if="state.openNewQuests == true" v-model:modalOpen="state.openNewQuests">
            <div class="modal-form">
                <p>Title</p>
                <input type="text" v-model="state.new.title">
                <p>Category</p>
                <select name="" id="" v-model="state.new.questCategory">
                    <option v-for="cat in state.questCategories" :value="cat.id">{{ cat.name }}</option>
                </select>
                <p>Description</p>
                <textarea type="text" v-model="state.new.description"></textarea>
                <p>Progress</p>
                <select name="" id="" v-model="state.new.progress">
                    <option v-for="(value, key) in state.questConfig.progress" :value="key">{{ value }}</option>
                </select>
                <div v-if="state.new.progress == 2">
                    <p>Waiting for</p>
                    <input type="text" v-model="state.new.waitingFor">
                </div>

                <p>Priority</p>
                <select name="" id="" v-model="state.new.priority">
                    <option v-for="(value, key) in state.questConfig.priority" :value="key">{{ value }}</option>
                </select>

            </div>


            <tButton @click="postQuests">Save</tButton>
        </modal>


        <BottomMenu name="library" v-model:onHover="state.hover" v-model:clickValue="state.menu" :key="state.updateKey"></BottomMenu>
    </div>

</template>

<script setup>

import tButton from './tButton.vue';
import tMenu from './tMenu.vue';
import modal from './modal.vue';
import tCard from './tCard.vue';
import BottomMenu from './BottomMenu.vue';
import QuestEditor from './QuestEditor.vue';
import Scavenge from './Scavenge.vue';
import QuestCategories from './QuestCategories.vue';


import { ref, onMounted, watch } from 'vue';
import Keeper from './Keeper.vue';
import toast from '../misc/toast'

const props = defineProps(['config'])

console.log(props.config);


const state = ref({
    openNewQuests: false,
    openEditQuests: false,
    openKeeper: false,
    openLocale: true,
    openScavenge: false,
    openCategories: false,
    editQuest: 0,
    keeper: {},
    menu: "",
    keeperDialog: '',
    questCategories: [],
    questConfig: {},
    scavengeText: "",
    updateKey: 0
});



state.value.quests = []

state.value.new = {
    title: "test01",
    questCategory: 0,
    description: "test",
    progress: "1",
    priority: "1",
    waitingFor: "",
    subQuests: []
}



onMounted(() => {
    getAllQuests()
    getQuestConfig()
    getKeeper()
    getLocale()
    getScavenge()
})

//methods

const openQuest = (index) => {
    state.value.editQuest = state.value.quests[index].id
    state.value.openEditQuests
    switchPanels('openEditQuests')
}

const getFrameColor = (questCategory) => {
    if (!questCategory) {
        return `filter:hue-rotate(0deg);`
    }

    const category = state.value.questCategories.find((e) => e.id == questCategory)
    if (category) {

        return `filter:hue-rotate(${category.color}deg);`
    }
    return `filter:hue-rotate(0deg);`
}

//backend

const getAllQuests = async () => {
    const response = await window.questUtils.getAllQuests(props.config.category)

    state.value.quests = response

}

const postQuests = async () => {


    const response = await window.questUtils.postQuest(props.config.category, JSON.stringify(state.value.new))
    if (response != false) {
        state.value.quests.push(response)
        state.value.openNewQuests = false
        toast.toast('A new journey begins...')
    }

}

const getKeeper = async () => {
    const response = await window.generic.getLocaleKeeperData(props.config.category)

    state.value.keeper = response

    state.value.keeperDialog = state.value.keeper.config.dialogs[Math.round(Math.random() * (state.value.keeper.config.dialogs.length - 1))]

}

const getLocale = async () => {
    const rawData = await window.generic.getLocaleData(props.config.category)
    if (rawData.questCategories) {
        state.value.questCategories = rawData.questCategories

    }

}
const getQuestConfig = async () => {
    const rawData = await window.questUtils.getQuestConfig()
    if (rawData) {
        state.value.questConfig = rawData

    }

}

const getScavenge = async () => {

    let rawData = await window.keeperUtils.generateScavenges(props.category)

    switch (rawData.action) {
        case "GENERATE":
            state.value.scavengeText = `${state.value.keeper.config.name} is planning on a scavenge. You should check`
            break;
        case "ACTIVE":
            state.value.scavengeText = `${state.value.keeper.config.name} is out on scavenge trough darkness and danger..`
            break;
        case "FINISHED":
            state.value.scavengeText = `${state.value.keeper.config.name} returned home with the prize. Ot did the prize return with her...?`
            break;
    }



}

const switchPanels = (panel) => {

    const panelArray = ['openNewQuests', 'openEditQuests', 'openKeeper', 'openLocale', 'openScavenge', 'openCategories', 'openKeeper']
    panelArray.forEach((e) => {
        state.value[e] = false
    })
    state.value[panel] = true
    //panel = true
}

//watchers

watch(() => state.value.menu, (newValue) => {

    if (newValue == "NEWQUEST") {
        switchPanels('openNewQuests')

    }
    if (newValue == "QUESTCATEGORY") {
        switchPanels('openCategories')
    }
    if (newValue == "KEEPER") {
        switchPanels('openKeeper')
    }
    if (newValue == "SCAVENGE") {
        switchPanels('openScavenge')
    }
    state.value.menu = ""

})

watch(() => state.value.openEditQuests, (newValue) => {

    if (newValue == false) {
        getAllQuests()
    }

})

watch(() => state.value.openKeeper, (newValue) => {

    if (newValue == false) {
        getKeeper()
    }

})

watch(() => state.value.openScavenge, (newValue) => {

    if (newValue == false) {
        getScavenge()
    }

})


</script>

<style scoped>
.library-bg {
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;


}



.tCardHolder {
    display: flex;
    flex-direction: row;
    max-height: calc(100% - 250px);
    height: calc(100% - 250px);
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

.scroll-holder {
    margin: 20px;
    background-color: rgba(0, 0, 0, .7);
    min-width: 0;
    min-height: 0;
    max-width: 600px;
    width: calc(100% - 40px);
    height: calc(100% - 40px);
    max-height: calc(100% - 40px);
    transition: width 0.5 ease;
    overflow-y: auto;
}

.scroll-panic {
    background: linear-gradient(rgba(56, 3, 3, 0), rgba(56, 3, 3, 0.5));
}

.scroll-main {

    display: flex;
    flex-direction: row;

}

.scroll-image {
    position: relative;
    width: fit-content;

}

.scroll-addons {
    position: absolute;
    top: 0;
    left: 0;
}

.scroll-data {
    height: 100px;
    width: 100%;
    background-image: url("../static/icons/scrolls/scroll_frame_fade.png");
    background-repeat: no-repeat;
    background-size: cover;
    padding-left: 20px;
}
</style>