<script setup lang="ts">
import type { TimelineItem } from "./TimelineItem";
import { DIMENSIONS, in_mm } from "./cvDimensions";
import { mdiCircleSlice8 } from "@mdi/js";
import MyIcon from "@/elements/MyIcon.vue";

interface Props {
    item: TimelineItem;
}

const props = defineProps<Props>();

function getMonthStr(date: Date): string {
    return date.toLocaleString("de-DE", { month: "long" });
}

const bisWidth_mm = 3;

function getLeftWidth(): number {
    return DIMENSIONS.timelinePosition_x_mm - DIMENSIONS.a4padding_l_mm - DIMENSIONS.timelineMargin_mm;
}

function getL1Width(): number {
    let leftWidth = getLeftWidth();
    return (leftWidth - bisWidth_mm) / 2;
}

function getL3Width(): number {
    let leftWidth = getLeftWidth();
    return (leftWidth - bisWidth_mm) / 2;
}
</script>
<template>
    <div class="cvViewerItem">
        <div class="cvViewerItemTime"></div>
        <div class="cvViewerItemContent">
            <div class="cvViewerItemStart">{{ props.item.start.getFullYear() }}</div>
            <div class="cvViewerItemStartMonth">{{ getMonthStr(props.item.start) }}</div>
            <div class="cvViewerItemBis"><span>-</span></div>
            <div class="cvViewerItemEnd">{{ props.item.end ? props.item.end.getFullYear() : "heute" }}</div>
            <div class="cvViewerItemEndMonth">{{ props.item.end ? getMonthStr(props.item.start) : "" }}</div>
            <MyIcon class="cvTimelineIcon" :path="mdiCircleSlice8" :width="30" :height="30" color="black" />
            <div class="cvViewerItemTitleAndLocation">
                <span class="cvViewerItemTitle">{{ props.item.title }}</span>
                <span class="cvViewerItemLocation">/ {{ props.item.location }}</span>
            </div>
            <div class="cvViewerItemImage"><img :src="props.item.image" width="40" /></div>
            <div class="cvViewerItemSubtitle">DER FEHLT NOCH</div>
            <div class="cvViewerItemText">{{ props.item.text }}</div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.cvViewerItemContent {
    display: grid;
    grid-template-columns: [l1] v-bind("in_mm(getL1Width())") [l2] v-bind("in_mm(bisWidth_mm)") [l3] v-bind(
            "in_mm(getL3Width())"
        ) [timeline] v-bind("in_mm(DIMENSIONS.timelineMargin_mm*2)") [r1] 40mm [r2] 1fr;
    padding-right: v-bind("in_mm(DIMENSIONS.a4padding_r_mm)");
    padding-left: v-bind("in_mm(DIMENSIONS.a4padding_l_mm)");
}

.cvViewerItemStart {
    align-self: center;
    text-align: center;
    grid-column-start: l1;
}

.cvViewerItemStartMonth {
    align-self: top;
    text-align: center;
    grid-column-start: l1;
    grid-row-start: 2;
    font-size: 6pt;
}

.cvViewerItemBis {
    align-self: center;
    text-align: center;
}
.cvViewerItemEnd {
    align-self: center;
    text-align: center;
}

.cvViewerItemEndMonth {
    align-self: top;
    text-align: center;
    grid-column-start: l3;
    grid-row-start: 2;
}

.cvTimelineIcon {
    width: 100%;
    justify-content: center;
    align-self: center;
    z-index: 1;
}
.cvViewerItemLocation {
}
.cvViewerItemImage {
}
.cvViewerItemTitleAndLocation {
    grid-column-start: r1;
    grid-column-end: span end;
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
}
</style>
