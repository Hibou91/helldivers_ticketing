<template>
    <div class="library-bg">
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
            <div class="tCard ">
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
                        <h3 @click="() => {openQuest(index)}">{{ quest.title }}</h3>
                        <p>{{ quest.progressName }}</p>
                        <p v-if=" quest.progress == 3">{{ quest.waitingFor }}</p>

                    </div>

                </div>
            </div>
            <div class="tCardHolderRow">
                <div class="tCard" >
                    <h2>Library</h2>
                    
                    <h3>Level: 0</h3>
                </div>
                
                <div class="tCard">
                   
                    <h2>Keeper:</h2>
                    
                    <h3>Level: 0</h3>
                </div>

            </div>


        </div>

        <modal v-model:modalOpen="state.openNewQuests">
            <input type="text" v-model="state.new.title">
            <input type="text" v-model="state.new.category">
            <input type="text" v-model="state.new.description">
            <input type="text" v-model="state.new.progress">
            <input type="text" v-model="state.new.priority">

            <button @click="postQuests">post</button>
        </modal>
        <modal v-model:modalOpen="state.openEditQuests">
            <input type="text" v-model="state.editable.title">
            <input type="text" v-model="state.editable.category">
            <input type="text" v-model="state.editable.description">
            <input type="text" v-model="state.editable.progress">
            <input type="text" v-model="state.editable.priority">

            <button @click="putQuests">post</button>
        </modal>


    </div>

</template>

<script setup>

import tButton from '../components/tButton.vue';
import tMenu from '../components/tMenu.vue';
import modal from '../components/modal.vue';


import { ref, onMounted } from 'vue';


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
    const response = await window.questUtils.getAllQuests("0")
    console.log(response);

    state.value.quests = response


}

const postQuests = async () => {
    state.value.quests.push(state.value.new)

    const response = await window.questUtils.postQuest("0", JSON.stringify(state.value.new))
    alert(response)
}

const putQuests = async () => {
    //state.value.quests.push(state.value.new)

    const response = await window.questUtils.putQuest("0", JSON.stringify(state.value.editable))
    alert(response)
}



</script>

<style scoped>
.library-bg {
    width: 100vw;
    height: 100vh;
    background-repeat: no-repeat;
    background-size: cover;

    background-image: url("./static/library/first.jpg");
}

.tCard {
    margin: 20px;
    background-color: rgba(0, 0, 0, .7);
    padding: 20px;
    border-radius: 20px;
    width: calc(100% - 80px);
    transition: width 0.5 ease;
    flex-direction: column;
    overflow-y: auto;
}

.tCardHolder {
    display: flex;
    flex-direction: row;
}

.tCardHolderRow {
    display: flex;
    flex-direction: column;
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

.scroll-data{
    padding-left: 10px;
}
</style>