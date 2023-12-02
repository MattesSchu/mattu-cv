<script setup lang="ts">
import { useContentStore, type PersonalInformation } from "@/stores/content";
import { ContentEntryType } from "./ContentType";
interface Props {
    labelName: string;
    contentKey: keyof PersonalInformation;
    contentType: ContentEntryType;
}

const props = defineProps<Props>();

const content = useContentStore();
</script>
<template>
    <div class="cvContentItemEntry">
        <label :for="props.labelName">{{ labelName }}</label>
        <input
            v-if="props.contentType === ContentEntryType.STRING"
            type="text"
            :id="props.labelName"
            v-model="content.personalInformation[props.contentKey]"
        />
        <input
            v-else-if="props.contentType === ContentEntryType.NUMBER"
            type="text"
            :id="props.labelName"
            v-model="content.personalInformation[props.contentKey]"
        />
        <input
            v-else-if="props.contentType === ContentEntryType.DATE"
            type="date"
            :id="props.labelName"
            v-model="content.personalInformation[props.contentKey]"
        />
        <input
            v-else-if="props.contentType === ContentEntryType.URL"
            type="url"
            :id="props.labelName"
            v-model="content.personalInformation[props.contentKey]"
        />
    </div>
</template>
<script scoped lang="scss"></script>
