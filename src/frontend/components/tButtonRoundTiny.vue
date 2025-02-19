<template>
  <div
    class="br-button-main relative"
    :class="{ 'br-button-main-hover': !(icon == true) }"
    @mouseover="onHover = true"
    @mouseleave="onHover = false"
  >
    <img
      v-if="color == 'GREEN'"
      src="../../../static/buttons/round_bg_green.png"
      alt=""
      srcset=""
      width="35"
      class="absolute button-image button-image-bg"
    />
    <img
      v-if="color == 'RED'"
      src="../../../static/buttons/round_bg_red.png"
      alt=""
      srcset=""
      width="35"
      class="absolute button-image button-image-bg"
    />
    <img
      v-if="color == 'YELLOW'"
      src="../../../static/buttons/round_bg_yellow.png"
      alt=""
      srcset=""
      width="35"
      class="absolute button-image button-image-bg"
    />

    <div class="absolute transitionable wh-full">
      <p class="auto-margin br-button-text">
        <slot> </slot>
      </p>
    </div>

    <img
      src="../../../static/buttons/round_frame.png"
      alt=""
      srcset=""
      width="35"
      class="absolute button-image"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";

defineProps(["color", "icon"]);

const onHover = ref(false);
</script>

<style scoped>
.br-button-main {
  height: 35px;
  display: flex;
  align-items: center;
  width: 35px;
}

.button-image {
  top: 0;
  left: 0;
}

.br-button-main-hover .button-image-bg {
  filter: brightness(0.7);
}

.br-button-main-hover:hover .button-image-bg {
  filter: none;
}

.br-button-main-hover:active .button-image-bg {
  filter: brightness(1.3);
}

.br-button-text {
    margin: 0;
    font-size: 1.6rem;
}

.auto-margin {
  width: fit-content;
  height: fit-content;
  max-height: fit-content;
  margin: 0 auto;

}

.wh-full {
  width: 100%;
  height: 35px;
}

.visible {
  visibility: visible;
}

.invisible {
  visibility: hidden;
}
</style>
