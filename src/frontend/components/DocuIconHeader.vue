<template>
    <div class="flex-row " style="margin-top: 30px;">
        <div class="col-menu-left">
            <div class="relative">
                <img src="../../../static/buttons/round_bg_yellow.png" alt="" srcset="" width="70" class="absolute ">

                <img :src="`../../../static/buttons/${icon}.png`" alt="" srcset="" width="70"
                    class="absolute ">

                <img src="../../../static/buttons/round_frame.png" alt="" srcset="" width="70" class="absolute ">
            </div>

        </div>
        <div class="col-menu-right">
            <h3 style="margin: 25px">{{ label }}</h3>

        </div>
    </div>
</template>

<script setup>

defineProps(['icon', 'label'])
</script>

<style scoped>

.col-menu-left {
    width: 100px;
}

.col-menu-right {
    width: calc(100% - 100px);
}

</style>