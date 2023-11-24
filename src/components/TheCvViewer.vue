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
import { mdiSchoolOutline } from "@mdi/js";
import TheCvViewerPersonal from "./TheCvViewerPersonal.vue";

const settings = useSettingsStore();
const content = useContentStore();

</script>
<template>
    <div class="cv">
        <TheCvFooter :page="1" />
        <TheCvFooter :page="2" />
        <VerticalLine :posX="DIMENSIONS.timelinePosition_x_mm" :posY="20" color="orange" />
        <ProfilePicture />
        <div class="cvPage">
            <div class="cvTitle">{{ content.name }}</div>
            <TheCvViewerPersonal />
            <div class="pProfilePicture"></div>
            <TheCvViewerSectionHeading title="Werdegang" :path="mdiSchoolOutline" />
            <TheCvViewerItem v-for="(item, idx) in content.getItems(Category.WERDEGANG)" :item="item" />
            <TheCvViewerSectionHeading title="Erfahrung" :path="mdiSchoolOutline" />
            <TheCvViewerItem v-for="(item, idx) in content.getItems(Category.AUSBILDUNG)" :item="item" />
            <TheCvViewerSectionHeading title="Engagement" :path="mdiSchoolOutline" />
            <TheCvViewerItem v-for="(item, idx) in content.getItems(Category.ENGAGEMENT)" :item="item" />
        </div>
        <div class="cvPage"></div>
    </div>
</template>
<style scoped lang="scss">
.cv {
    position: relative;
    width: 210mm;
}

.cvPage {
    height: 297mm;
    border-radius: 10px;
    background-color: white;
}

.cvTitle {
    line-height: 1;
    font-size: var(--font-size-h1);
    text-transform: uppercase;
    padding-left: v-bind("in_mm(DIMENSIONS.a4padding_l_mm)");
    padding-top: calc(v-bind("in_mm(DIMENSIONS.a4padding_t_mm)") - 2px);
}

@media print {
    .page {
        margin: 0px;
        background-color: white;
    }
}
</style>
