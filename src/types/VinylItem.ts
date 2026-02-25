export type VinylItem = {
  id: string;
  title: string;
  artist: string;
  year: number;
  status: "wishlist" | "owned" | "none";
};
