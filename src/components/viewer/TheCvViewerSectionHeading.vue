<script setup lang="ts">
import TheCvViewerItemSpacer from './TheCvViewerItemSpacer.vue';
// Core
import { DIMENSIONS, in_mm } from '@/components/cvDimensions';
// Elements
import MyIcon from '@/elements/MyIcon.vue';
interface Props {
    title: string;
    path: string;
}

const props = defineProps<Props>();
const imageWidth = 50;
</script>
<template>
    <MyIcon class="cvViewerSectionHeaderImage" :path="path" :width="60" :height="60" />
    <div class="cvViewerSectionHeaderTitle">{{ props.title }}</div>
    <TheCvViewerItemSpacer :height_mm="DIMENSIONS.sectionSpacerTitle_mm" />
</template>
<style scoped lang="scss">
.cvViewerSectionHeaderImage {
    padding: 8px;
    border-radius: 50%;
    grid-column-start: timeline;
    align-self: center;
    justify-self: center;
    background-color: var(--vt-c-black-soft);
    z-index: 1;
}

.cvViewerSectionHeaderTitle {
    grid-column-start: r1;
    align-self: center;
    font-size: var(--font-size-h2);
    text-transform: uppercase;
}
</style>