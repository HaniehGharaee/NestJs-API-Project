export declare enum categoryStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}
export declare class CreateCategoryDto {
    categoryName: string;
    type: string;
    code: number;
    status: categoryStatus;
}
