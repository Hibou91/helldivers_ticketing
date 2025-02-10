<template>
    <div class="tCardHolder">
        <TCardClosable v-model:modalOpen="openPanel" :closeMethod="() => { }" v-if="state.loaded == true">
            <div class="flex-row max-h-100">
                <div class="w-50 keeper-img-container">
                    <div class="relative max-h-100 keeper-img">
                        <img src="../../../static/generic ui/keepers bg.png" alt="" class="" width="300px" />
                        <img :src="`../../../static/${state.categoryName}/keeper/1.png`" alt=""
                            class="scavenge-data-addons" width="300px" />
                    </div>
                </div>
                <div class="w-50">
                    <h2>
                        {{ state.keeperData.config ? state.keeperData.config.name : "" }}
                    </h2>
                    <p>
                        <i>{{
                            state.keeperData.config
                                ? `"${state.keeperData.config.description}""`
                                : ""
                        }}</i>
                    </p>

                    <div class="flex-row">
                        <h2>Cunning:</h2>
                        <tButtonRoundTiny @click="() => {
                            addSkill(0, 'cunning');
                        }
                            " color="RED" class="skillButton">-</tButtonRoundTiny>
                        <h2>{{ state.keeperData.skills.cunning }}</h2>
                        <div class="tooltip skillButton">
                            <tButtonRoundTiny @click="() => {
                                addSkill(1, 'cunning');
                            }
                                " color="GREEN" class="">+</tButtonRoundTiny>
                            <span class="tooltiptext">
                                <div class="flex-row">
                                    <span> {{ (state.keeperData.skills.cunning *
                                        state.castleConfig.castleConfig.levelMultiplier) +
                                        state.castleConfig.castleConfig.levelMultiplier }} / {{
                                            state.castleConfig.materials.witseed ? state.castleConfig.materials.witseed : 0
                                        }}</span>
                                    <img src="../../../static/icons/foods/witseed.png" alt="" width="20" height="20">
                                </div>

                            </span>
                        </div>

                    </div>
                    <h2>
                        Cunning:
                        {{ state.keeperData.skills ? state.keeperData.skills.cunning : 0 }}
                    </h2>
                    <h2>
                        Charisma:
                        {{ state.keeperData.skills ? state.keeperData.skills.charisma : 0 }}
                    </h2>
                    <h2>
                        Strength:
                        {{ state.keeperData.skills ? state.keeperData.skills.strength : 0 }}
                    </h2>
                </div>
            </div>
        </TCardClosable>
    </div>
</template>

<script setup>
import TCardClosable from "./tCardClosable.vue";
import tButtonRoundTiny from "./tButtonRoundTiny.vue";
import tButton from "./tButton.vue";

import { ref, onMounted } from "vue";

const openPanel = defineModel("openPanel");
const props = defineProps(["category"]);

const state = ref({
    categoryname: "",
    keeperData: {},
    loaded: false
});

onMounted(() => {
    setMeUp()

    switch (props.category) {
        case "0":
            state.value.categoryName = "library";
            break;
        case "1":
            state.value.categoryName = "salon";
            break;
        case "2":
            state.value.categoryName = "garden";
            break;
    }

});

const setMeUp = async () => {
    await getKeeper();
    await getCastleData();
    state.value.loaded = true
}

const addSkill = async (upOrDown, skill) => {
    const response = await window.localeUtils.levelKeeper(props.category, skill, upOrDown);
    console.log(response);

};

const getKeeper = async () => {
    const response = await window.generic.getLocaleKeeperData(props.category);

    state.value.keeperData = response;

    console.log(state.value.keeperData);

};

const getCastleData = async () => {
    const response = await window.generic.getCastleConfig();

    state.value.castleConfig = response;
    if (!state.value.castleConfig.materials) {
        state.value.castleConfig.materials = {}
    }
    console.log('castle', response);
};
</script>

<style scoped>
.tCardHolder {
    display: flex;
    flex-direction: row;
    max-height: calc(100% - 350px);
    height: calc(100% - 350px);
    overflow-y: visible;
    min-height: 0;
}

.max-h-100 {
    max-height: calc(100% - 110px);
    height: calc(100% - 110px);
}

.keeper-img-container {
    max-height: calc(100% - 110px);
    height: calc(100% - 110px);
}

.keeper-img {
    margin: auto 15px;
}

.scavenge-data-addons {
    position: absolute;
    top: 0;
    left: 0;
}

.skillButton {
    margin: auto 15px;
}
</style>
