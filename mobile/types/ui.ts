import { ComponentProps } from "react";
import { Article } from "./data";
import Box from "../components/box";

export type WithClassName<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>> = ComponentProps<T> & { className?: string }

export interface FlatListRender<T> {
  item: T;
  index: number;
}

export type CardProps =
  WithClassName<typeof Box> &
  Omit<Article, "id" | "category"> &
  {
    subtitle?: string;
    preview?: string;
  }