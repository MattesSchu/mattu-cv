import { Category, type TimelineItem, type TimelineItemSub } from "@/components/TimelineItem";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

interface ReactiveItems {
    data: TimelineItem[];
}

export function serializeState(state: Record<string, any>): string {
    // Convert Date objects to strings
    return JSON.stringify(state, (key, value) => {
        if (value instanceof Date) {
            return value.toISOString();
        }
        return value;
    });
}

function deserializeState(value: string): Record<string, any> {
    // Convert strings back to Date objects
    return JSON.parse(value, (key, value) => {
        if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z$/.test(value)) {
            return new Date(value);
        }
        return value;
    });
}

export function saveContent(): void {
    const content = useContentStore();
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(serializeState(content.$state))
    const downloadAnchorNode = document.createElement('a')
    downloadAnchorNode.setAttribute("href", dataStr)
    downloadAnchorNode.setAttribute("download", "contentState.json")
    document.body.appendChild(downloadAnchorNode)
    downloadAnchorNode.click()
    downloadAnchorNode.remove()
}

export const useContentStore = defineStore(
    "content",
    () => {
        const name = ref("");
        const profilePicture = ref<string | null>(null);
        const address = ref("");
        const postal = ref("");
        const birthday = ref<Date>();
        const birthplace = ref("");
        const phone = ref("");
        const mail = ref("");
        const homepage = ref("");
        const xing = ref("");
        const family = ref("");
        const items = reactive<ReactiveItems>({ data: [] });

        function getItems(category: Category): TimelineItem[] {
            const res: TimelineItem[] = [];
            items.data.forEach((el) => {
                if (el.category === category) {
                    res.push(el);
                }
            });
            return res;
        }

        function getItem(uuid: string): TimelineItem | undefined {
            for (let i = 0; i < items.data.length; i++) {
                if (items.data[i].uuid === uuid) {
                    return items.data[i];
                }
            }
            return undefined;
        }

        function getSubItem(parentUuid: string, subItemUuid: string): TimelineItemSub | undefined {
            const parent = getItem(parentUuid);
            if (!parent) {
                return undefined;
            }
            for (let i = 0; i < parent.subitems.length; i++) {
                if (parent.subitems[i].uuid === subItemUuid) {
                    return parent.subitems[i];
                }
            }
            return undefined;
        }

        // TODO: generalize, give array
        function getItemIdx(uuid: string): number {
            let idx = -1;
            for (let i = 0; i < items.data.length; i++)
            {
                if (items.data[i].uuid === uuid)
                {
                    idx = i;
                    break;
                }
            }
            return idx;
        }

        // TODO: generalize, give array
        function getSubItemIdx(parentUuid: string, uuid: string): number {
            const parent = getItem(parentUuid);
            if (!parent) {
                return -1;
            }
            let idx = -1;
            for (let i = 0; i < parent.subitems.length; i++)
            {
                if (parent.subitems[i].uuid === uuid)
                {
                    idx = i;
                    break;
                }
            }
            return idx;
        }

        // TODO: generalize, give array
        function deleteItem(uuid: string): void {
            for (let i = 0; i < items.data.length; i++) {
                if (items.data[i].uuid === uuid) {
                    items.data.splice(i, 1);
                    return;
                }
            }
        }

        // TODO: generalize, give array
        function deleleSubItem(parentUuid: string, uuid: string): void {
            const parent = getItem(parentUuid);
            if (!parent) {
                return;
            }
            for (let i = 0; i < parent.subitems.length; i++) {
                if (parent.subitems[i].uuid === uuid) {
                    parent.subitems.splice(i, 1);
                    return;
                }
            }
        }

        // TODO: generalize, give array
        function moveItemUp(uuid: string): void {
            let idx = getItemIdx(uuid);
            if (idx === -1) {
                console.error("Item could not be found.");
                return;
            }
            if (idx === 0) {
                // Item at the end of bounds.
                return;
            }
            let item = items.data[idx];
            items.data.splice(idx, 1);
            items.data.splice(idx-1, 0, item);
        }

        // TODO: generalize, give array
        function moveSubItemUp(parentUuid:string, uuid: string): void {
            const parent = getItem(parentUuid);
            if (!parent) {
                return;
            }
            let idx = getSubItemIdx(parentUuid, uuid);
            if (idx === -1) {
                console.error("Item could not be found.");
                return;
            }
            if (idx === 0) {
                // Item at the end of bounds.
                return;
            }
            let subitem = parent.subitems[idx];
            parent.subitems.splice(idx, 1);
            parent.subitems.splice(idx-1, 0, subitem);
        }

        // TODO: generalize, give array
        function moveItemDown(uuid: string): void {
            let idx = getItemIdx(uuid);
            if (idx === -1) {
                console.error("Item could not be found.");
                return;
            }
            if (idx === items.data.length-1) {
                // Item at the end of bounds.
                return;
            }
            const item = items.data[idx];
            items.data.splice(idx, 1);
            items.data.splice(idx+1, 0, item);
        }

        // TODO: generalize, give array
        function moveSubItemDown(parentUuid: string, uuid: string): void {
            const parent = getItem(parentUuid);
            if (!parent) {
                return;
            }
            let idx = getSubItemIdx(parentUuid, uuid);
            if (idx === -1) {
                console.error("Item could not be found.");
                return;
            }
            if (idx === parent.subitems.length-1) {
                // Item at the end of bounds.
                return;
            }
            const subitem = parent.subitems[idx];
            parent.subitems.splice(idx, 1);
            parent.subitems.splice(idx+1, 0, subitem);
        }

        return {
            name,
            profilePicture,
            address,
            postal,
            birthday,
            birthplace,
            phone,
            mail,
            homepage,
            xing,
            family,
            items,
            getItems,
            getItem,
            getSubItem,
            deleteItem,
            deleleSubItem,
            getItemIdx,
            getSubItemIdx,
            moveItemUp,
            moveSubItemUp,
            moveItemDown,
            moveSubItemDown,
        };
    },
    {
        persist: {
            serializer: {
                serialize: serializeState,
                deserialize: deserializeState,
            },
        },
    },
);
