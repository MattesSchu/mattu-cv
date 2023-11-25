<script setup lang="ts">
import TheCvFooter from "@/components/TheCvFooter.vue";
import VerticalLine from "@/elements/VerticalLine.vue";
import ProfilePicture from "@/elements/ProfilePicture.vue";
import { useContentStore } from "@/stores/content";
import { useSettingsStore } from "@/stores/settings";
import { DIMENSIONS, in_mm } from "./cvDimensions";
import TheCvViewerItem from "./TheCvViewerItem.vue";
import { Category } from "./TimelineItem";
import TheCvViewerSectionHeading from "./TheCvViewerSectionHeading.vue";
import { mdiCogOutline, mdiHeartOutline, mdiSchoolOutline } from "@mdi/js";
import TheCvViewerPersonal from "./TheCvViewerPersonal.vue";
import TheCvViewerItemSpacer from "./TheCvViewerItemSpacer.vue";

const settings = useSettingsStore();
const content = useContentStore();

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
    <div class="cv">
        <TheCvFooter :page="1" />
        <TheCvFooter :page="2" />
        <VerticalLine :posX="DIMENSIONS.timelinePosition_x_mm" :posY="20" />
        <ProfilePicture />
        <div class="cvPage">
            <div class="cvPageContent">
                <div class="cvTitle">{{ content.name }}</div>
                <TheCvViewerPersonal />
                <div class="pProfilePicture"></div>
                <TheCvViewerSectionHeading title="Werdegang" :path="mdiSchoolOutline" />
                <TheCvViewerItemSpacer :height_mm="10"/>
                <TheCvViewerItem v-for="(item, idx) in content.getItems(Category.WERDEGANG)" :item="item" />
            </div>
        </div>
        <div class="cvPage">
            <div class="cvPageContent">
                <TheCvViewerSectionHeading title="Erfahrung" :path="mdiCogOutline" />
                <TheCvViewerItem v-for="(item, idx) in content.getItems(Category.AUSBILDUNG)" :item="item" />
                <TheCvViewerSectionHeading title="Engagement" :path="mdiHeartOutline" />
                <TheCvViewerItem v-for="(item, idx) in content.getItems(Category.ENGAGEMENT)" :item="item" />
            </div>
        </div>
    </div>
</template>
<style scoped lang="scss">
.cv {
    width: 210mm;
    height: 100vh;
    position: relative;
    overflow: scroll;
}

.cvPage {
    height: 297mm;
    border-radius: 10px;
    background-color: white;
}

.cvPageContent {
    display: grid;
    grid-template-columns:
        [l1] v-bind("in_mm(getL1Width())")
        [l2] v-bind("in_mm(bisWidth_mm)")
        [l3] v-bind("in_mm(getL3Width())")
        [timeline] v-bind("in_mm(DIMENSIONS.timelineMargin_mm*2)")
        [r1] 40mm
        [r2] 1fr;
    padding-top: v-bind("in_mm(DIMENSIONS.a4padding_t_mm)");
    padding-right: v-bind("in_mm(DIMENSIONS.a4padding_r_mm)");
    padding-left: v-bind("in_mm(DIMENSIONS.a4padding_l_mm)");
}

.cvTitle {
    line-height: 1;
    grid-column: 1 / -1;

    font-size: var(--font-size-h1);
    text-transform: uppercase;
    margin-top: -10px;
}

@media print {
    .page {
        margin: 0px;
        background-color: white;
    }
    .cv {
        height: auto;
        overflow: visible;
    }
}
</style>
