// Product type
export type Product = {
    id: number;
    title: string | null;
    description: string | null;
    category: string;
    price: number;
    quantity: number;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
  };
  
  // API request type for adding/updating a product
  export type ProductPayload = {
    title: string | null;
    category: string;
    price: number;
    quantity: number;
    description: string | null;
    imageUrl: string | null;
  };
  
  // API response type
  export type ApiResponse<T> = {
    data?: T;
    error?: string;
  };
