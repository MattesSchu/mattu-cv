export enum Category {
    WERDEGANG,
    AUSBILDUNG,
    ENGAGEMENT,
}

export interface TimelineItem {
    uuid: string,
    title: string;
    category: Category;
    location: string;
    text: string;
    start: Date;
    end?: Date;
    image?: string;
    subitems: TimelineItemSub[];
}

export interface TimelineItemSub {
    title: string;
    text?: string;
    image?: string;
}