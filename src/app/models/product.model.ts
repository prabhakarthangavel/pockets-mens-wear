export interface Product {
    actualPrice: number,
    category: string,
    description: string,
    discountedPrice: number,
    imageUrl: string,
    name: string,
    size: {
        small: number,
        medium: number,
        large: number,
        xlarge: number,
        xxlarge: number
    }
}