import { FlatList } from 'react-native'
import React from 'react'
import Box from '../box'
import Container from '../container'
import TextHighlight from '../text-highlight'
import CardImage from '../card-image'
import Text from '../text'
import { Ionicons } from '@expo/vector-icons'
import Button from '../button'
import { FlatListRender } from '../../types/ui'
import HorizontalCard from '../horizontal-card'
import { Article } from '../../types/data'
import tailwind from 'twrnc'

export default function RocketsHomeTab() {
  const ListHeaderComponent = () => (
    <Box className='gap-8'>
      <Container childrenClassName='gap-4'>
        <Box className='flex-row flex-wrap pt-4'>
          <TextHighlight
            highlightColor='#77f5c3'
          >
            headline
          </TextHighlight>
        </Box>
        <Text className={`text-3xl font-bold text-slate-900`}>
          —Biden vows to codify Roe “We Gotta Go“
        </Text>
        <CardImage
          className={"h-56"}
          contentFit='cover'
          source={"https://picsum.photos/seed/696/3000/2000"} />
        <Text className='mt-2'>
          <Text className={`mt-2 text-slate-700`}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas nulla expedita quidem laborum nemo similique repellendus ratione minus voluptatum adipisci, provident repellat ad, sed rerum. Officia quis eius sunt deleniti!{`....`}
          </Text>
          <Text className='font-bold text-slate-800 underline'>More</Text>
        </Text>
        <Box className='flex-row items-center gap-4'>
          <Box className='flex-1 flex-row gap-4 items-center'>
            <CardImage
              source={"https://picsum.photos/seed/150/150"}
              contentFit='cover'
              className={`h-14 w-14`}
              containerClassName={`w-14`}
              borderContainerClassName={`border-2 left-2 top-2`}
            />
            <Box className='gap-1'>
              <Text className='font-bold text-sm text-slate-600'>
                Provider Name
              </Text>
              <Box className='flex-row gap-1 items-center'>
                <Ionicons
                  size={20}
                  color={"#111111"}
                  name={'time-outline'} />
                <Text className='text-slate-600'>2 hours ago</Text>
              </Box>
            </Box>
          </Box>
          <Box className='flex-row gap-2'>
            <Button>
              <Ionicons
                name='heart-outline'
                color={'#111111'}
                size={30} />
            </Button>
            <Button>
              <Ionicons
                name='bookmark-outline'
                color={'#111111'}
                size={30} />
            </Button>
          </Box>
        </Box>
      </Container>
      <Box className='border-t border-slate-600' />
    </Box>
  );

  const renderItem = ({ item: article }: FlatListRender<Article>) => (
    <Container key={`rockets-home-tab-item-${article.id}`}>
      <HorizontalCard
        title={article.title}
        image={article.image}
        category={article.category}
      />
    </Container>
  )

  return (
    <FlatList
      data={[
        {
          id: "1212qq",
          title: "Military planes crash durin an air show in the united state of america",
          category: "national",
          image: "https://picsum.photos/id/237/200/300"
        },
        {
          id: "12q",
          title: "Military planes crash durin an air show in the united state of america",
          category: "national",
          image: "https://picsum.photos/id/27/300/200"
        }
      ]}
      renderItem={renderItem}
      ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={tailwind`gap-6 pb-8`}
    />
  );
}