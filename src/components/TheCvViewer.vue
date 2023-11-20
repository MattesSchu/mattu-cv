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

const settings = useSettingsStore();
const content = useContentStore();

const timelinePositionX = "" + DIMENSIONS.timelinePosition_x_mm + "mm";
</script>
<template>
    <div class="cv">
        <TheCvFooter :page="1" />
        <TheCvFooter :page="2" />
        <VerticalLine :posX="DIMENSIONS.timelinePosition_x_mm" :posY="20" color="orange" />
        <ProfilePicture />
        <div class="cvPage">
            <div class="cvTitle">{{ content.name }}</div>
            <div class="cvPersonal">
                <div class="cvPersonalItem">
                    <div>Anschrift</div>
                    <ul>
                        <li>{{ content.address }}</li>
                        <li>{{ content.postal }}</li>
                    </ul>
                </div>
                <div class="pPersonalItem">
                    <div>Telefon</div>
                    <div>{{ content.phone }}</div>
                </div>
                <div class="pPersonalItem">
                    <div>E-Mail</div>
                    <div>{{ content.mail }}</div>
                </div>
                <div class="pPersonalItem">
                    <div>Xing</div>
                    <div>{{ content.xing }}</div>
                </div>
                <div class="pPersonalItem">
                    <div>Familienstand</div>
                    <div>{{ content.family }}</div>
                </div>
                <div class="pPersonalItem">
                    <div>Geburt</div>
                    <div>{{ content.birthday }} in {{ content.birthplace }}</div>
                </div>
            </div>
            <div class="pProfilePicture"></div>
            <TheCvViewerSectionHeading title="Werdegang" :path="mdiSchoolOutline" />
            <TheCvViewerItem v-for="(item, idx) in content.getItems(Category.WERDEGANG)" :item="item" />
            <TheCvViewerSectionHeading title="Ausbildung" :path="mdiSchoolOutline" />
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

.cvPersonal {
    position: relative;
    left: v-bind("timelinePositionX");
}

.cvPersonalItem {
}

@media print {
    .page {
        margin: 0px;
        background-color: white;
    }
}
</style>
