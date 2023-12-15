import { ComponentProps } from "react";
import { Article } from "./data";
import Box from "../components/box";
import { LinkProps } from "expo-router/build/link/Link";
import Button from "../components/button";

export type WithClassName<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>> = ComponentProps<T> & { className?: string }

export interface FlatListRender<T> {
  item: T;
  index: number;
}

export type CardProps =
  WithClassName<typeof Button> &
  Pick<LinkProps, "href"> &
  Omit<Article, "id" | "category"> &
  {
    subtitle?: string;
    preview?: string;
    imageClassName?: string;
  }