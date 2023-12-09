export type Article = {
  id: string;
  title: string;
  image: string;
  category?: string;
  preview?: string;
  date?: string;
  link?: string;
  provider?: {
    name?: string;
    image?: string;
    link?: string;
  }
};