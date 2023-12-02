import { Category, type GeneralItem, type TimelineItem, type TimelineItemSub } from "@/components/TimelineItem";
import { defineStore } from "pinia";
import { reactive } from "vue";

interface ReactiveItems {
    data: TimelineItem[];
}

export interface PersonalInformation {
    name: string;
    profilePicture: string;
    address: string;
    postal: number;
    birthday: Date;
    birthplace: string;
    phone: string;
    mail: string;
    homepage: string;
    xing: string;
    family: string;
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
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(serializeState(content.$state));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "contentState.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

interface ContentState {
    personalInformation: PersonalInformation;
    items: ReactiveItems;
    getItems: (category: Category) => TimelineItem[];
    getItem: (uuid: string, items: GeneralItem[]) => GeneralItem | undefined;
    getItemIdx: (uuid: string, items: GeneralItem[]) => number;
    deleteItem: (uuid: string, items: GeneralItem[]) => void;
    moveItemUp: (uuid: string, items: GeneralItem[]) => void;
    moveItemDown: (uuid: string, items: GeneralItem[]) => void;
}

export const useContentStore = defineStore(
    "content",
    (): ContentState => {
        const personalInformation = reactive<PersonalInformation>({
            name: "",
            address: "",
            birthday: new Date(),
            birthplace: "",
            family: "",
            homepage: "",
            mail: "",
            phone: "",
            postal: -1,
            profilePicture: "",
            xing: "",
        });
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

        function getItem(
            uuid: string,
            items: TimelineItem[] | TimelineItemSub[],
        ): TimelineItem | TimelineItemSub | undefined {
            for (let i = 0; i < items.length; i++) {
                if (items[i].uuid === uuid) {
                    return items[i];
                }
            }
            return undefined;
        }

        function getItemIdx(uuid: string, items: GeneralItem[]): number {
            let idx = -1;
            for (let i = 0; i < items.length; i++) {
                if (items[i].uuid === uuid) {
                    idx = i;
                    break;
                }
            }
            return idx;
        }

        function deleteItem(uuid: string, items: GeneralItem[]): void {
            for (let i = 0; i < items.length; i++) {
                if (items[i].uuid === uuid) {
                    items.splice(i, 1);
                    return;
                }
            }
        }

        // TODO: generalize, give array
        function moveItemUp(uuid: string, items: GeneralItem[]): void {
            const idx = getItemIdx(uuid, items);
            if (idx === -1) {
                console.error("Item could not be found.");
                return;
            }
            if (idx === 0) {
                // Item at the end of bounds.
                return;
            }
            const item = items[idx];
            items.splice(idx, 1);
            items.splice(idx - 1, 0, item);
        }

        // TODO: generalize, give array
        function moveItemDown(uuid: string, items: GeneralItem[]): void {
            const idx = getItemIdx(uuid, items);
            if (idx === -1) {
                console.error("Item could not be found.");
                return;
            }
            if (idx === items.length - 1) {
                // Item at the end of bounds.
                return;
            }
            const item = items[idx];
            items.splice(idx, 1);
            items.splice(idx + 1, 0, item);
        }

        return {
            personalInformation,
            items,
            getItems,
            getItem,
            deleteItem,
            getItemIdx,
            moveItemUp,
            moveItemDown,
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
