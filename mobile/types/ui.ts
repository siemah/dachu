import { ComponentProps } from "react";

export type WithClassName<T extends keyof React.JSX.IntrinsicElements | React.JSXElementConstructor<any>> = ComponentProps<T> & { className?: string }

export interface FlatListRender<T> {
  item: T;
  index: number;
}