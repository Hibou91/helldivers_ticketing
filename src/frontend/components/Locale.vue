<template>
    <div class="library-bg" :style="`background-image: url('./static/${config.model}/first.jpg');`">
        <tMenu menuName="Library">

            <RouterLink to="/castle">
                <tButton>Back</tButton>
            </RouterLink>
            <RouterLink to="/">
                <tButton>Main Menu</tButton>
            </RouterLink>

        </tMenu>
        <div v-if="state.openEditQuests == false && state.openScavenge == false && state.openNewQuests == false"
            class="tCardHolder">
            <div class="tCardHolderRow">
                <tCard>
                    <h2>{{ config.namel }}</h2>
                    <h3>Level: 0</h3>

                </tCard>

                <tCard>

                    <div class="flex-row">
                        <div class="w-50 ">
                            <div class="relative">
                                <img :src="`../../../static/buttons/round frame.png`" alt="" height="100" class="absolute">
                                <img :src="`../../../static/icons/keepers/${config.category}.png`" alt="" height="100" >
                            </div>
                            <p>"{{ state.keeperDialog }}"</p>
                            

                        </div>
                        <div class="w-50">
                            <h2>{{ state.keeper.config ? state.keeper.config.name : "" }}</h2>
                            <h3>Level: {{ state.keeper.level ? state.keeper.level : 0 }}</h3>
                            <tButton @click="state.openScavenge = true">Scavenge</tButton>

                        </div>
                    </div>
                </tCard>

            </div>
            <div class="scroll-holder">
                <div v-for="(quest, index) in state.quests" class="scroll-main scroll-main-frame">
                    <div class="scroll-image" :class="{ 'scroll-panic': quest.priority == 2 }">
                        <img src="../../../static/icons/scrolls/scroll frame.png" alt="" width="100" height="100"
                            class="scroll-main">
                        <img src="../../../static/icons/scrolls/scroll.png" alt="" width="100" height="100"
                            class="scroll-addons">
                        <img v-if="quest.priority == 0" src="../../../static/icons/scrolls/seal blue.png" alt=""
                            width="100" height="100" class="scroll-addons">
                        <img v-if="quest.priority == 1" src="../../../static/icons/scrolls/seal green.png" alt=""
                            width="100" height="100" class="scroll-addons">
                        <img v-if="quest.priority == 2" src="../../../static/icons/scrolls/seal red.png" alt=""
                            width="100" height="100" class="scroll-addons">
                    </div>
                    <div class="scroll-data pointer-link" @click="() => { openQuest(index) }">
                        <h3 >{{ quest.title }}</h3>
                        <p>{{ quest.progressName }} <span v-if="quest.progress == 2">on {{ quest.waitingFor }}</span>
                        </p>

                    </div>

                </div>
            </div>



        </div>

        <QuestEditor v-if="state.openEditQuests == true" v-model:openPanel="state.openEditQuests" v-model:questId="state.editQuest" :category="config.category"></QuestEditor>
        <Scavenge v-if="state.openScavenge == true" v-model:openPanel="state.openScavenge"  :category="config.category"></Scavenge>

        <modal v-if="state.openNewQuests == true" v-model:modalOpen="state.openNewQuests">
            <div class="modal-form">
                <p>Title</p>
                <input type="text" v-model="state.new.title">
                <p>Category</p>
                <input type="text" v-model="state.new.category">
                <p>Description</p>
                <textarea type="text" v-model="state.new.description"></textarea>
                <p>Progress</p>
                <select name="" id="" v-model="state.new.progress">
                    <option value="0">New</option>
                    <option value="1">In Progress</option>
                    <option value="2">Pending</option>
                    <option value="3">Fed Up</option>
                    <option value="4">Finished</option>
                </select>
                <div v-if="state.new.progress == 2">
                    <p>Waiting for</p>
                    <input type="text" v-model="state.new.waitingFor">
                </div>

                <p>Priority</p>
                <select name="" id="" v-model="state.new.priority">
                    <option value="0">Who Cares</option>
                    <option value="1">Should be done</option>
                    <option value="2">PANIC</option>
                </select>

            </div>


            <tButton @click="postQuests">Save</tButton>
        </modal>


        <BottomMenu name="library" v-model:onHover="state.hover" v-model:clickValue="state.menu"></BottomMenu>
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


import { ref, onMounted, watch } from 'vue';


const props = defineProps(['config'])

const state = ref({
    openNewQuests: false,
    openEditQuests: false,
    openKeeper: true,
    openLocale: true,
    openScavenge: false,
    editQuest: 0,
    keeper: {},
    menu: "",
    keeperDialog: '',
});



state.value.quests = []

state.value.new = {
    title: "test01",
    category: 0,
    description: "test",
    progress: "1",
    priority: "1",
    waitingFor: "",
}



onMounted(() => {
    getAllQuests()
    getKeeper()
})

//methods

const openQuest = (index) => {
    state.value.editQuest = state.value.quests[index].id
    state.value.openEditQuests = true
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
    }

}

const getKeeper = async () => {
    const response = await window.generic.getLocaleKeeperData(props.config.category)

    state.value.keeper = response
    console.log(state.value.keeper);
    
    state.value.keeperDialog = state.value.keeper.config.dialogs[Math.round(Math.random() * (state.value.keeper.config.dialogs.length - 1))]
    console.log(state.value.keeperDialog);
    


}


watch(() => state.value.menu, (newValue) => {

    if (newValue == "NEWQUEST") {
        state.value.openNewQuests = true;
    }
    state.value.menu=""

})

watch(() => state.value.openEditQuests, (newValue) => {

if (newValue == false) {
   getAllQuests()
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
    background-image: url("./static/icons/scrolls/scroll frame fade.png");
    background-repeat: no-repeat;
    background-size: cover;
    padding-left: 20px;
}
</style>