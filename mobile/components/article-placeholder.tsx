import React from 'react'
import Box from './box'
import { Skeleton } from 'moti/skeleton'
import tailwind from 'twrnc';
import { Platform } from 'react-native';
import LoadingIndicator from './loading-indicator';

function ArticlePlaceholder({ colors = ["#cfecff", "#8fccff"], show = true }) {
  if (show === false) return null;

  return Platform.OS === "web"
    ? <LoadingIndicator color={"#7fbcff"} />
    : (
      <Box className="my-4 gap-4">
        <Box className="flex-1 gap-2">
          <Skeleton
            width={tailwind`w-[100%]`.width as number}
            height={tailwind`h-12`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-[100%]`.width as number}
            height={tailwind`h-12`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-[80%]`.width as number}
            height={tailwind`h-12`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
        </Box>
        <Box className="flex-1 gap-2">
          <Skeleton
            width={tailwind`w-[100%]`.width as number}
            height={tailwind`h-12`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-[100%]`.width as number}
            height={tailwind`h-12`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-[90%]`.width as number}
            height={tailwind`h-12`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
        </Box>
        {/* <Box className="flex-1 gap-2">
          <Skeleton
            width={tailwind`w-[100%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-[50%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-[70%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
        </Box>
        <Box className="flex-1 gap-2">
          <Skeleton
            width={tailwind`w-[100%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-[50%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-[70%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
        </Box>
        <Box className="flex-1 gap-2">
          <Skeleton
            width={tailwind`w-[100%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-[50%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-[70%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
        </Box>
        <Box className="flex-1 gap-2">
          <Skeleton
            width={tailwind`w-[100%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-[50%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-[70%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={colors}
            radius={"square"}
          />
        </Box> */}
      </Box>
    )
}

export default ArticlePlaceholder;

React.memo(ArticlePlaceholder);