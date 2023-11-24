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
}

export function in_mm(dim: number): string {
    return "" + dim + "mm";
}

export const DIMENSIONS: Dimensions = {
    a4width_mm: 210,
    a4height_mm: 297,
    a4padding_l_mm: 10,
    a4padding_r_mm: 10,
    a4padding_t_mm: 10,
    a4padding_b_mm: 10,
    //
    a4footerHeight_mm: 10,
    //
    profileImageHeight_mm: 40,
    profileImageWidth_mm: 20,
    //
    timelinePosition_x_mm: 50,
    timelineMargin_mm: 10,
    timelineBorder_mm: 1,
};
