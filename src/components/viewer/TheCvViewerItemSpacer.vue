<script setup lang="ts">
interface Props {
    height_mm: number;
}

const props = defineProps<Props>();
</script>
<template>
    <div class="cvViewItemSpacer"></div>
</template>
<style scoped lang="scss">
.cvViewItemSpacer {
    height: v-bind("'' + props.height_mm + 'mm'");
    grid-column: 1 / -1;
}
</style>