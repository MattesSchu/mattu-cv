// TODO: make this a store
export interface Dimensions {
    a4width_mm: number;
    a4height_mm: number;
    a4padding_l_mm: number;
    a4padding_r_mm: number;
    a4padding_t_mm: number;
    a4padding_b_mm: number;
    a4footerHeight_mm: number;

    profileImageHeight_mm: number;
    profileImageWidth_mm: number;

    timelinePosition_x_mm: number;
    timelineMargin_mm: number;
    timelineBorder_mm: number;

    itemBullitWidth_mm: number;

    sectionSpacerTitle_mm: number;
    itemSpacerTitle_mm: number;
    itemSpacerAfter_mm: number;
}

export function in_mm(dim: number): string {
    return "" + dim + "mm";
}

export const DIMENSIONS: Dimensions = {
    a4width_mm: 210,
    a4height_mm: 297,
    a4padding_l_mm: 15,
    a4padding_r_mm: 15,
    a4padding_t_mm: 10,
    a4padding_b_mm: 5,
    //
    a4footerHeight_mm: 8,
    //
    profileImageHeight_mm: 40,
    profileImageWidth_mm: 20,
    //
    timelinePosition_x_mm: 45,
    timelineMargin_mm: 10,
    timelineBorder_mm: 1,
    //
    itemBullitWidth_mm: 28,
    //
    sectionSpacerTitle_mm: 4,
    itemSpacerTitle_mm: 2,
    itemSpacerAfter_mm: 2,
};
