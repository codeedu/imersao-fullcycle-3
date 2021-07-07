export interface Product {
  id: string;
  name: string;
  description: string;
  image_url: string;
  slug: string;
  price: number;
  created_at: string;
}

export interface CreditCard {
  number: string;
  name: string;
  expiration_month: number;
  expiration_year: number;
  cvv: string;
}

export enum OrderStatus {
  Approved = "approved",
  Pending = "pending",
}

export interface OrderItem {
  product: Product;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  credit_card: Omit<CreditCard, "cvv" | "name">;
  items: OrderItem[];
  status: OrderStatus;
}

export const products: Product[] = [
  {
    id: "uuid",
    name: "produto teste",
    description: "muito muito texto",
    price: 50.5,
    image_url: "https://source.unsplash.com/random?product," + Math.random(),
    slug: "produto-teste",
    created_at: "2021-06-06T00:00:00",
  },
  {
    id: "uuid2",
    name: "produto teste222",
    description: "muito muito texto2222",
    price: 50.52,
    image_url: "https://source.unsplash.com/random?product" + Math.random(),
    slug: "produto-teste222",
    created_at: "2021-06-06T00:00:00",
  },
];
