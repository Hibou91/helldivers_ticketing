<template>
    <div class="library-bg" :style="`background-image: url('./static/${config.model}/first.jpg');`">
        <tMenu menuName="Library">

            <RouterLink to="/castle">
                <tButton>Back</tButton>
            </RouterLink>
            <tButton @click="() => { state.openQuests = true }">Quests</tButton>
            <tButton @click="() => { state.openNewQuests = true }">New Quests</tButton>
            <tButton @click="() => { state.openKeeper = true }">Summon Keeper</tButton>
            <tButton @click="() => { state.openLocale = true }">Check Library</tButton>
        </tMenu>
        <div v-if="state.openEditQuests == false && state.openNewQuests == false" class="tCardHolder">
            <tCard>
                <tButton @click="() => { state.openNewQuests = true }">New Quests</tButton>
                <div v-for="(quest, index) in state.quests" class="scroll-main">
                    <div class="scroll-image" :class="{ 'scroll-panic': quest.priority == 2 }">
                        <img src="../../../static/icons/scrolls/scroll.png" alt="" width="100" height="100"
                            class="scroll-main">
                        <img v-if="quest.priority == 0" src="../../../static/icons/scrolls/seal blue.png" alt=""
                            width="100" height="100" class="scroll-addons">
                        <img v-if="quest.priority == 1" src="../../../static/icons/scrolls/seal green.png" alt=""
                            width="100" height="100" class="scroll-addons">
                        <img v-if="quest.priority == 2" src="../../../static/icons/scrolls/seal red.png" alt=""
                            width="100" height="100" class="scroll-addons">
                    </div>
                    <div class="scroll-data">
                        <h3 @click="() => { openQuest(index) }">{{ quest.title }}</h3>
                        <p>{{ quest.progressName }}</p>
                        <p>{{ quest.id }}</p>
                        <p v-if="quest.progress == 3">{{ quest.waitingFor }}</p>

                    </div>

                </div>
            </tCard>
            <div class="tCardHolderRow">
                <tCard>
                    <h2>{{ config.namel }}</h2>

                    <h3>Level: 0</h3>
                </tCard>

                <tCard>

                    <h2>Keeper:</h2>

                    <h3>Level: 0</h3>
                </tCard>

            </div>


        </div>

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

                <p>Priority</p>
                <select name="" id="" v-model="state.new.priority">
                    <option value="0">Who Cares</option>
                    <option value="1">Should be done</option>
                    <option value="2">PANIC</option>
                </select>
                
            </div>


            <tButton @click="postQuests">Save</tButton>
        </modal>
        <modal v-if="state.openEditQuests == true" v-model:modalOpen="state.openEditQuests">
            <div class="modal-form">
                <p>Title</p>
                <input type="text" v-model="state.editable.title">
                <p>Category</p>
                <input type="text" v-model="state.editable.category">
                <p>Description</p>
                <textarea type="text" v-model="state.editable.description"></textarea>
                <p>Progress</p>
                <select name="" id="" v-model="state.editable.progress">
                    <option value="0">New</option>
                    <option value="1">In Progress</option>
                    <option value="2">Pending</option>
                    <option value="3">Fed Up</option>
                    <option value="4">Finished</option>
                </select>
                <p>Priority</p>
                <select name="" id="" v-model="state.new.editable">
                    <option value="0">Who Cares</option>
                    <option value="1">Should be done</option>
                    <option value="2">PANIC</option>
                </select>
            </div>


            <tButton @click="putQuests">Save</tButton>
            <tButton @click="deleteQuests">Delete</tButton>
        </modal>

        <BottomMenu name="library" v-model:onHover="state.hover"></BottomMenu>
    </div>

</template>

<script setup>

import tButton from './tButton.vue';
import tMenu from './tMenu.vue';
import modal from './modal.vue';
import tCard from './tCard.vue';
import BottomMenu from './BottomMenu.vue';


import { ref, onMounted } from 'vue';

const props = defineProps(['config'])

const state = ref({
    openNewQuests: false,
    openEditQuests: false,
    openKeeper: true,
    openLocale: true
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

state.value.editable = {
    title: "test01",
    category: 0,
    description: "test",
    progress: "1",
    priority: "1",
    waitingFor: "",
}

onMounted(() => {

    getAllQuests()
})

//methods

const openQuest = (index) => {
    state.value.editable = state.value.quests[index]
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

const putQuests = async () => {
    //state.value.quests.push(state.value.new)

    const response = await window.questUtils.putQuest(props.config.category, JSON.stringify(state.value.editable))
    if (response != false) {

        state.value.openEditQuests = false
    }

}

const deleteQuests = async () => {
    //state.value.quests.push(state.value.new)

    const response = await window.questUtils.deleteQuest(props.config.category, JSON.stringify(state.value.editable))
    if (response != false) {
        state.value.quests.forEach((element, index) => {
            if (element.id == state.value.editable.id) {
                state.value.quests.splice(index, 1)
            }
        });
        state.value.openEditQuests = false
    }

}



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
    display: flex;
    flex-direction: column;
}

.modal-form {
    margin-bottom: 20px;
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
    padding-left: 10px;
}
</style>