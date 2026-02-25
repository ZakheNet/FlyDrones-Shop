import ItemPreview from "../Components/ItemCard";

export type DataType =
  | {
      featuredDrones: string[];
      accessories: any;
      drones: ItemType[];
    }
  | undefined;

export type ItemType = {
  name: string;
  model: string;
  size: string;
  id: string;
  price: number;
  images: string[];
  sale: number;
  remaining: number;
  colors: string[];
  description: string;
  features: string[];
  reviews: { by: string; userID: string; stars: number; comment: string }[];
};

export type userType = {
  email?: string;
  email_verified?: boolean;
  family_name?: string;
  given_name?: string;
  name?: string;
  nickname?: string;
  picture?: string;
  sub?: string;
  updated_at?: string;
};

export type PreviewType = "FeaturedDrone" | "AllDrones" | "OnSale" | "Search";
