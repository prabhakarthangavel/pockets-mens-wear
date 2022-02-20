export interface Product {
    id?: number,
    actualPrice: number,
    category: string,
    description: string,
    discountedPrice: number,
    imageUrls: string[],
    name: string,
    size: {
        small: number,
        medium: number,
        large: number,
        xlarge: number,
        xxlarge: number
    }
}