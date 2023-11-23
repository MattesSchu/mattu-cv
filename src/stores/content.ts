import { Category, type TimelineItem } from "@/components/TimelineItem";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";
import { v4 as uuidv4 } from "uuid";

interface ReactiveItems {
    data: TimelineItem[];
}

function serializeState(state: Record<string, any>): string {
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

        function deleteItem(uuid: string): void {
            for (let i = 0; i < items.data.length; i++) {
                if (items.data[i].uuid === uuid) {
                    items.data.splice(i, 1);
                    return;
                }
            }
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
            deleteItem,
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
