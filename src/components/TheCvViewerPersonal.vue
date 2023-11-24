<script setup lang="ts">
import { useContentStore } from '@/stores/content';

const content = useContentStore();
</script>
<template>
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
</template>
<style scoped lang="scss">
.cvPersonal {
    position: relative;
    left: v-bind("timelinePositionX");
}

.cvPersonalItem {
}

</style>
