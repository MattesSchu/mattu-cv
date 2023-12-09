<script setup lang="ts">
// Core
import { type TimelineItemSub } from "@/components/TimelineItem";
// Elements
import MyIcon from "@/elements/MyIcon.vue";
// Store
import { useSettingsStore } from "@/stores/settings";
// Other
import { mdiCircleSlice8 } from "@mdi/js";

interface Props {
    item: TimelineItemSub;
}
const props = defineProps<Props>();
const settings = useSettingsStore();

const BULLIT_ICON_SIZE = 15;
</script>
<template>
    <div class="cvBullitContainer">
        <MyIcon class="cvTimelineIcon" :path="mdiCircleSlice8" color="black" :width="BULLIT_ICON_SIZE" :height="BULLIT_ICON_SIZE" />
        <div class="cvViewerItemSubDashes"><span>- -</span></div>
    </div>
    <div
        :class="{ cvViewerItemSubTitel: !props.item.split, cvViewerItemSubTitelSplit: props.item.split }"
        class="cvMainBullitTitle"
    >
        {{ props.item.title }}
    </div>
    <div
        v-if="props.item.text"
        :class="{ cvViewerItemSubText: !props.item.split, cvViewerItemSubTextSplit: props.item.split }"
        class="cvMainSectionText"
    >
        {{ props.item.text }}
    </div>
</template>
<style scoped lang="scss">
.cvBullitContainer {
    display: grid;
    height: 100%;
    grid-template-columns: 1fr v-bind("BULLIT_ICON_SIZE + 'px'") 1fr;
    grid-column-start: timeline;
}
.cvTimelineIcon {
    width: 100%;
    grid-column-start: 2;
    z-index: 1;
}

.cvViewerItemSubDashes {
    grid-column-start: 3;
    justify-self: center;
    align-self: start;
    font-size: var(--content-font-size);
    line-height: 1.2;
    color: v-bind("settings.color");
}
.cvViewerItemSubTitel {
    grid-column-start: r1;
    grid-column-end: span end;
}

.cvViewerItemSubTitelSplit {
    grid-column-start: r1;
}
.cvViewerItemSubText {
    grid-column-start: r1;
    grid-column-end: span end;
}

.cvViewerItemSubTextSplit {
    grid-column-start: r2;
}
</style>
