import ItemPreview from "../Components/ItemPreview";

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
  colors: string[];
  description: string;
  features: string[];
  reviews: { by: string; userID: string; stars: number; comment: string }[];
};
