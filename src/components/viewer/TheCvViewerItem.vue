<script setup lang="ts">
import TheCvViewerItemSub from "./TheCvViewerItemSub.vue";
// Core
import type { TimelineItem } from "@/components/TimelineItem";
import { DIMENSIONS, in_mm } from "@/components/cvDimensions";
import MyIcon from "@/elements/MyIcon.vue";
// Stores
import { useSettingsStore } from "@/stores/settings";
// Other
import { mdiCircleSlice8 } from "@mdi/js";
import TheCvViewerItemSpacer from "./TheCvViewerItemSpacer.vue";

interface Props {
    item: TimelineItem;
}

const props = defineProps<Props>();
const settings = useSettingsStore();

function getMonthStr(date: Date): string {
    return date.toLocaleString("de-DE", { month: "long" });
}

</script>
<template>
    <div v-if="props.item.showDates" class="cvViewerItemStart">
        {{ props.item.start.getFullYear() }}<br /><span class="cvViewerItemMonth">{{
            getMonthStr(props.item.start)
        }}</span>
    </div>
    <div v-if="props.item.showDates && props.item.showEnd" class="cvViewerItemBis">
        <span :style="{ color: settings.color }">&#x2012;</span>
    </div>
    <div v-if="props.item.showDates && props.item.showEnd" class="cvViewerItemEnd">
        <span v-if="props.item.untilToday" style="white-space: nowrap">heute</span>
        <span v-else-if="props.item.end">{{ props.item.end.getFullYear() }}</span>
        <br />
        <span v-if="!props.item.untilToday" class="cvViewerItemMonth">{{
            props.item.end ? getMonthStr(props.item.end) : ""
        }}</span>
    </div>
    <MyIcon class="cvTimelineIcon" :path="mdiCircleSlice8" :width="30" :height="30" color="black" />
    <div class="cvViewerItemTitleAndLocation">
        <span class="cvViewerItemTitle cvMainSectionSubtitle cvMainSectionSubtitle_01">{{ props.item.title }}</span>
        <span class="cvViewerItemLocation cvMainSectionSubtitle cvMainSectionSubtitle_02"
            >&hairsp;/&hairsp;{{ props.item.location }}</span
        >
    </div>
    <div class="cvViewerItemSubtitle" v-if="props.item.subtitle">{{ props.item.subtitle }}</div>
    <TheCvViewerItemSpacer v-if="props.item.subtitle" :height_mm="DIMENSIONS.itemSpacerTitle_mm" />
    <div class="cvViewerItemText cvMainSectionText">{{ props.item.text }}</div>
    <TheCvViewerItemSpacer :height_mm="DIMENSIONS.itemSpacerTitle_mm" />
    <TheCvViewerItemSub v-for="item in props.item.subitems" :key="item.uuid" :item="item" />
    <TheCvViewerItemSpacer :height_mm="DIMENSIONS.itemSpacerAfter_mm" />
</template>
<style scoped lang="scss">
.cvViewerItemStart {
    align-self: center;
    text-align: center;
    grid-column-start: l1;
}

.cvViewerItemMonth {
    align-self: top;
    text-align: center;
    font-size: 5pt;
    position: absolute;
    transform: translateX(-50%);
    line-height: 0.8;
}

.cvViewerItemBis {
    grid-column-start: l2;
    align-self: center;
    text-align: center;
}
.cvViewerItemEnd {
    grid-column-start: l3;
    align-self: center;
    text-align: center;
}

.cvTimelineIcon {
    width: 100%;
    grid-column: timeline;
    justify-content: center;
    align-self: center;
    z-index: 1;
}
.cvViewerItemLocation {
}
.cvViewerItemImage {
}
.cvViewerItemTitleAndLocation {
    grid-column: r1 / -1;
    align-self: center;
}

.cvViewerItemTitle {
}

.cvViewerItemLocation {
}
.cvViewerItemText {
    grid-column-start: r1;
    grid-column-end: span end;
}
.cvViewerItemSubtitle {
    grid-column-start: r1;
    grid-column-end: span end;
    line-height: 1em;
    transform: translateY(-1mm);
}
</style>
