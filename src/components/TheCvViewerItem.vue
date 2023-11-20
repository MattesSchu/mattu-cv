<script setup lang="ts">
import { useContentStore } from '@/stores/content';

interface Props {
    idx: number;
}

const props = defineProps<Props>();

const content = useContentStore();
</script>
<template>
    <div class="cvViewerItem">
        <div class="cvViewerItemTime">
        </div>
        <div class="cvViewerItemContent">
            <div class="cvViewerItemTitle">{{ content.items.data[props.idx].title }}</div>
            <div class="cvViewerItemSubtitle"></div>
            <div class="cvViewerItemText">{{ content.items.data[props.idx].text }}</div>
        </div>
    </div>
</template>
<style scoped lang="sass">
</style>