export interface Product {
    id: number,
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

export interface Cart {
    productId: number,
    actualPrice: number,
    category: string,
    discountedPrice: number,
    imageUrl: any,
    name: string,
    quantity: number,
    size: string
}


export interface CartItems {
    productid?: number;
    quantity?: number;
    size?: string;
}