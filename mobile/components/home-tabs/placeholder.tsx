import React from 'react'
import Box from '../box'
import tailwind from 'twrnc'
import { Skeleton } from 'moti/skeleton'
import { ScrollView } from 'react-native';

export default function TabScreenPlaceholder() {
  const style = tailwind`w-full h-56`;

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
    >
      <Box className="my-4 gap-4">
        <Box className='gap-4'>
          <Skeleton
            width={tailwind`w-[40%]`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={["#88b", "#ccf"]}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-full`.width as number}
            height={tailwind`h-16`.height as number}
            colorMode={"light"}
            colors={["#88b", "#ccf"]}
            radius={"square"}
          />
          <Skeleton
            width={style.width as number}
            height={style.height as number}
            colorMode={"light"}
            colors={["#88b", "#ccf"]}
            radius={"square"}
          />
          <Skeleton
            width={tailwind`w-full`.width as number}
            height={tailwind`h-6`.height as number}
            colorMode={"light"}
            colors={["#88b", "#ccf"]}
            radius={"square"}
          />
          <Box className="flex-row gap-4 items-center">
            <Skeleton
              width={tailwind`w-16`.width as number}
              height={tailwind`h-16`.height as number}
              colorMode={"light"}
              colors={["#88b", "#ccf"]}
              radius={"square"}
            />
            <Box className="flex-1 gap-2">
              <Skeleton
                width={tailwind`w-[50%]`.width as number}
                height={tailwind`h-4`.height as number}
                colorMode={"light"}
                colors={["#88b", "#ccf"]}
                radius={"square"}
              />
              <Skeleton
                width={tailwind`w-[35%]`.width as number}
                height={tailwind`h-4`.height as number}
                colorMode={"light"}
                colors={["#88b", "#ccf"]}
                radius={"square"}
              />
            </Box>
          </Box>
        </Box>
        {
          Array.from("Dachu app").map((_, index) => (
            <Box
              className="flex-row gap-4 items-center"
              key={`home-tab-placeholder-item-${index}`}
            >
              <Skeleton
                width={tailwind`w-24`.width as number}
                height={tailwind`h-24`.height as number}
                colorMode={"light"}
                colors={["#88b", "#ccf"]}
                radius={"square"}
              />
              <Box className="flex-1 gap-2">
                <Skeleton
                  width={tailwind`w-[80%]`.width as number}
                  height={tailwind`h-6`.height as number}
                  colorMode={"light"}
                  colors={["#88b", "#ccf"]}
                  radius={"square"}
                />
                <Skeleton
                  width={tailwind`w-[50%]`.width as number}
                  height={tailwind`h-6`.height as number}
                  colorMode={"light"}
                  colors={["#88b", "#ccf"]}
                  radius={"square"}
                />
              </Box>
            </Box>
          ))
        }
      </Box>
    </ScrollView>
  )
}