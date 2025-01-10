<template>
    <div class="tCardHolder" >

        <TCardClosable v-if="state.openEditQuests == true" v-model:modalOpen="state.openEditQuests" :closeMethod="cardCloseMethod">
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
                <select name="" id="" v-model="state.editable.priority">
                    <option value="0">Who Cares</option>
                    <option value="1">Should be done</option>
                    <option value="2">PANIC</option>
                </select>
            </div>


            <tButton @click="putQuests">Save</tButton>
            <tButtonRed @click="deleteQuests">Delete</tButtonRed>
            <tButton @click="getNotifications">Notifications</tButton>
        </TCardClosable>

        <div class="tCardHolderRow">
            <TCardClosable v-if="state.openNotifications == true" v-model:modalOpen="state.openNotifications" :closeMethod="cardCloseMethod">
                <tButton @click="state.openNewNotifications = !state.openNewNotifications">{{
                    state.openNewNotifications
                        == true ? 'Close' : 'New Notification' }}</tButton>
                <div v-if="state.openNewNotifications == true" class="modal-form">
                    <div class="modal-form">
                        <p>Title</p>
                        <input type="text" v-model="state.newNotification.title">
                        <p>Message</p>
                        <input type="text" v-model="state.newNotification.body">
                        <p>Time</p>
                        <input type="datetime-local" v-model="state.newNotification.time">
                    </div>

                    <tButton @click="postNotification">Save</tButton>
                </div>

                <div>
                    <div v-for="notification in state.notifications" v-bind:key="notification.id" class="pointer-link mt-10" @click="state.openEditNotifications = true; state.editNotification = notification" >
                        <span>{{ notification.title }} {{ notification.time }}</span>
                    </div>
                </div>

            </TCardClosable>

            <TCardClosable v-if="state.openEditNotifications == true" v-model:modalOpen="state.openEditNotifications" :closeMethod="cardCloseMethod">
                <div class="modal-form">
                    <p>Title</p>
                    <input type="text" v-model="state.editNotification.title">
                    <p>Message</p>
                    <input type="text" v-model="state.editNotification.body">
                    <p>Time</p>
                    <input type="datetime-local" v-model="state.editNotification.time">
                </div>

                <tButton @click="postNotification">Save</tButton>
                <tButtonRed @click="deleteNotification">Delete</tButtonRed>

            </TCardClosable>

        </div>



    </div>
</template>

<script setup>
import TCardClosable from './tCardClosable.vue'
import tButton from './tButton.vue'
import tButtonRed from './tButtonRed.vue'

import {ref, onMounted} from 'vue'


const openPanel = defineModel('openPanel')
const questId = defineModel('questId')
const props = defineProps(['category'])

const state = ref({
    openEditQuests: true,
    openNotifications: false,
    openNewNotifications: false,
    openEditNotifications: false,
})

state.value.editable = {
    title: "test01",
    category: 0,
    description: "test",
    progress: "1",
    priority: "1",
    waitingFor: "",
}

state.value.newNotification = {
    title: "test01 notification",
    body: 0,
    time: '',
}

state.value.editNotification = {
    id: '',
    title: "",
    body: '',
    time: '',
}

onMounted(() => {
    getQuest()
})

const getQuest = async () => {
    const response = await window.questUtils.getQuestById(props.category, questId.value)

    state.value.editable = response


}

const putQuests = async () => {
    

    const response = await window.questUtils.putQuest(props.category, JSON.stringify(state.value.editable))
    if (response != false) {

        //state.value.openEditQuests = false
    }

}

const deleteQuests = async () => {
    

    const response = await window.questUtils.deleteQuest(props.category, JSON.stringify(state.value.editable))
    if (response != false) {
        state.value.quests.forEach((element, index) => {
            if (element.id == state.value.editable.id) {
                state.value.quests.splice(index, 1)
            }
        });
        state.value.openEditQuests = false
    }

}

const getNotifications = async () => {
    const response = await window.questUtils.getNotificationsForQuest(state.value.editable.id)

    state.value.notifications = response;
    state.value.openNotifications = true;
}

const postNotification = async () => {
    console.log(state.value.newNotification)
    const response = await window.questUtils.postNotification(state.value.editable.id, JSON.stringify(state.value.newNotification))
    if (response != false) {
        state.value.notifications.push(response)
    }

}

const deleteNotification = async () => {
    //state.value.quests.push(state.value.new)

    const response = await window.questUtils.deleteNotification(state.value.editNotification.id)
    if (response != false) {
        state.value.notifications.forEach((element, index) => {
            if (element.id == id) {
                state.value.notifications.splice(index, 1)
            }
        });
    }

}

const cardCloseMethod = () => {

    const varArray = ['openEditQuests', 'openNotifications', 'openEditNotifications']
    let lever = 0
    for (let i = 0; i < varArray.length; i++) {
        if(state.value[varArray[i]] == false){
            lever++;
        }
    }

    if(lever >= varArray.length){
        openPanel.value = false
    }
}

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

</style>