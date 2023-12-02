<script setup lang="ts">
import { useContentStore } from "@/stores/content";
import { useSettingsStore } from "@/stores/settings";
import { DIMENSIONS, in_mm } from "@/components/cvDimensions";

const content = useContentStore();
const settings = useSettingsStore();
</script>
<template>
    <img v-if="content.personalInformation.profilePicture" class="profilePicture" :src="content.personalInformation.profilePicture" />
</template>
<style scoped lang="scss">
.profilePicture {
    position: absolute;
    right: v-bind("in_mm(DIMENSIONS.a4padding_r_mm)");
    top: v-bind("in_mm(DIMENSIONS.a4padding_t_mm)");

    border: v-bind("in_mm(settings.profilePictureBorder_mm)") solid;
    color: v-bind("settings.color");
    width: v-bind("in_mm(settings.profilePictureWidth_mm)");
}
</style>
