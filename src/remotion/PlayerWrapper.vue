<script lang="ts" setup>
import {onBeforeUnmount, onMounted, ref, watch} from 'vue';
import {type PlayerSchema, PlayerView} from "@/remotion/PlayerView";
import {createRoot, type Root} from "react-dom/client";
import * as React from "react";

interface PlayerData {
  data: PlayerSchema;
}

const playerRef = ref()
const reactRoot = ref();
let root: Root;
const emit = defineEmits(['paused'])

const props = defineProps<PlayerData>()

onMounted(() => {
  root = createRoot(reactRoot.value);
  render()
});

function render() {
  root.render(React.createElement(PlayerView, {
    data: props.data,
    playerRefInstance: playerRef,
    onPaused: () => emit('paused'),
  }));
}

watch(() => playerRef, () => {
  playerRef.value?.play();
}, {deep: true})

watch(() => props.data, () => {
  render()
}, {deep: true})

onBeforeUnmount(() => {
  if (root) {
    root.unmount();
  }
});

defineExpose({
  playerRef,
})
</script>

<template>
  <div ref="reactRoot"></div>
</template>

