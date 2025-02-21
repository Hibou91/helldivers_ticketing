<template>
    <div class="tCardHolder">

        <TCardClosable v-if="state.openEditQuests == true" v-model:modalOpen="state.openEditQuests"
            :closeMethod="cardCloseMethod">
            <div class="modal-form">
                <p>Title</p>
                <input type="text" v-model="state.editable.title">
                <p>Category</p>
                <select v-model="state.editable.questCategory">
                    <option v-for="cat in questCategories" :value="cat.id">{{ cat.name }}</option>
                </select>
                <p>Description</p>
                <textarea type="text" v-model="state.editable.description"></textarea>
                <p>Progress</p>
                <select v-model="state.editable.progress">
                    <option v-for="(value, key) in questConfig.progress" :value="key">{{value}}</option>
                </select>
                <div v-if="state.editable.progress == 2">
                    <p>Waiting for</p>
                    <input type="text" v-model="state.editable.waitingFor">
                </div>

                <p>Priority</p>
                <select v-model="state.editable.priority">
                    <option v-for="(value, key) in questConfig.priority" :value="key">{{value}}</option>
                </select>
            </div>


            <tButton @click="putQuests">Save</tButton>
            <tButton @click="getNotifications">Notifications</tButton>
            <tButton @click="getSubQuests">Sub Quests</tButton>
            <tButton color="RED" @click="deleteQuests">Delete</tButton>
        </TCardClosable>

        <div class="tCardHolderRow"
            v-if="state.openSubQuests == false && (state.openNotifications == true || state.openEditNotifications == true)">
            <TCardClosable v-if="state.openNotifications == true" v-model:modalOpen="state.openNotifications"
                :closeMethod="cardCloseMethod">
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
                    <div v-for="notification in state.notifications" v-bind:key="notification.id"
                        class="pointer-link mt-10"
                        @click="state.openEditNotifications = true; state.editNotification = notification">
                        <span>{{ notification.id }} {{ notification.title }} {{ notification.time }}</span>
                    </div>
                </div>

            </TCardClosable>

            <TCardClosable v-if="state.openEditNotifications == true" v-model:modalOpen="state.openEditNotifications"
                :closeMethod="cardCloseMethod">
                <div class="modal-form">
                    <p>Title</p>
                    <input type="text" v-model="state.editNotification.title">
                    <p>Message</p>
                    <input type="text" v-model="state.editNotification.body">
                    <p>Time</p>
                    <input type="datetime-local" v-model="state.editNotification.time">
                </div>

                <tButton @click="putNotification">Save</tButton>
                <tButton color="RED" @click="deleteNotification">Delete</tButton>

            </TCardClosable>

        </div>

        <div class="tCardHolderRow"
            v-if="state.openSubQuests == true && (state.openNotifications == false || state.openEditNotifications == false)">
            <TCardClosable v-model:modalOpen="state.openSubQuests"
                :closeMethod="cardCloseMethod">

                <div>
                    <div v-for="subquest in state.editable.subQuests" v-bind:key="subquest.id"
                        class="mt-10">
                        <div class="flex-row">
                            <input type="text" v-model="subquest.name" class="mr-20">
                            <input type="checkbox" v-model="subquest.done" class="mr-20" style="margin-right:15px; ">
                            <tButtonRoundSmall color="YELLOW" @click="deleteSubQuests" >Delete</tButtonRoundSmall>
                        </div>
                    </div>
                </div>
                <div class="mt-10">
                    <div class="flex-row">
                        <input type="text" v-model="state.newSubQuest.name" class="mr-20">
                        <tButtonRoundSmall color="YELLOW" @click="addSubQuests">Add</tButtonRoundSmall>
                    </div>
                </div>

            </TCardClosable>

        </div>



    </div>
</template>

<script setup>
import TCardClosable from './tCardClosable.vue'
import tButton from './tButton.vue'
import tButtonRoundSmall from './tButtonRoundSmall.vue'


import { ref, onMounted } from 'vue'
import toast from '../misc/toast'

const openPanel = defineModel('openPanel')
const questId = defineModel('questId')
const props = defineProps(['category', 'questCategories', "questConfig"])

const state = ref({
    openEditQuests: true,
    openNotifications: false,
    openNewNotifications: false,
    openEditNotifications: false,
    openSubQuests: false
})

state.value.editable = {
    title: "test01",
    questCategory: 0,
    description: "test",
    progress: "1",
    priority: "1",
    waitingFor: "",
    subQuests:[]
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

state.value.newSubQuest = {
    name: '',
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
        toast.toast('Not only you change with the journey. Sometimes the journey changes too...')
    }

}

const deleteQuests = async () => {


    const response = await window.questUtils.deleteQuest(props.category, JSON.stringify(state.value.editable))
    if (response != false) {
        state.value.openEditQuests = false;
        state.value.openNotifications = false;
        state.value.openSubQuests = false;
        openPanel.value = false;
        toast.toast("As the road ends, it's time to say goodbye.")
    }

}

const getNotifications = async () => {
    const response = await window.questUtils.getNotificationsForQuest(state.value.editable.id, props.category)

    state.value.notifications = response;
    state.value.openNotifications = true;
    state.value.openSubQuests = false;
}

const postNotification = async () => {

    const response = await window.questUtils.postNotification(state.value.editable.id, props.category, JSON.stringify(state.value.newNotification))
    if (response != false) {
        state.value.notifications.push(response)
        toast.toast('Words whispered to the wind may come back later...')
    }
   

}

const putNotification = async () => {
    const response = await window.questUtils.putNotification(state.value.editNotification.id, JSON.stringify(state.value.editNotification))
    toast.toast('The message is the same, only the words are different')

}

const deleteNotification = async () => {
    //state.value.quests.push(state.value.new)

    const response = await window.questUtils.deleteNotification(state.value.editNotification.id)
    if (response != false) {
        state.value.notifications.forEach((element, index) => {
            if (element.id == id) {
                state.value.editNotification = {}
                state.value.openEditNotifications = false
                state.value.notifications.splice(index, 1)

            }
        });
        toast.toast("A message from the past... silenced..")
    }

}

const getSubQuests = () => {
    state.value.openEditNotifications = false;
    state.value.openNotifications = false;
    state.value.openSubQuests = true;
}

const addSubQuests = () => {
    let temp = {
        name: state.value.newSubQuest.name,
        done: false
    }
    state.value.editable.subQuests.push(temp)
    state.value.newSubQuest.name = ''
}

const deleteSubQuests = (index) => {
    state.value.editable.subQuests.splice(index,1)
    
}

const cardCloseMethod = () => {

    const varArray = ['openSubQuests', 'openEditQuests', 'openNotifications', 'openEditNotifications']
    let lever = 0
    for (let i = 0; i < varArray.length; i++) {
        if (state.value[varArray[i]] == false) {
            lever++;
        }
    }

    if (lever >= varArray.length) {
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

.mr-20{
    margin-right: 15px;
}
</style>