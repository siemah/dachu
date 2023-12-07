import { FlatList } from 'react-native'
import React, { useEffect } from 'react'
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
import { useQuery, } from 'react-query'
import { getHomeData } from '../../services/home'
import Card from '../card'
import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);

export default function RocketsHomeTab() {
  const query = useQuery({
    queryKey: ["home"],
    queryFn: getHomeData
  });

  const renderItem = ({ item: article, index }: FlatListRender<Article>) => {
    return (
      index === 0
        ? (
          <Card
            title={`—${article.title}`}
            image={article.image}
            subtitle={"Wire rockets"}
            preview={`Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore voluptate voluptates ipsam deleniti repellat natus molestias laudantium ipsa asperiores aliquid facere saepe, id labore voluptas architecto reprehenderit sapiente veniam fugiat.`}

          >
            <Box className='flex-row items-center gap-4'>
              <Box className='flex-1 flex-row gap-4 items-center'>
                <CardImage
                  source={article?.provider?.image}
                  contentFit='cover'
                  className={`h-14 w-14`}
                  containerClassName={`w-14`}
                  borderContainerClassName={`border-2 left-2 top-2`}
                />
                <Box className='gap-1'>
                  <Text className='font-bold text-sm text-slate-600'>
                    {article?.provider?.name}
                  </Text>
                  <Box className='flex-row gap-1 items-center'>
                    <Ionicons
                      size={20}
                      color={"#111111"}
                      name={'time-outline'} />
                    <Text className='text-slate-600'>
                      {dayjs(article.date).fromNow()}
                    </Text>
                  </Box>
                </Box>
              </Box>
              <Box className='flex-row gap-2'>
                <Button>
                  <Ionicons
                    name='heart-outline'
                    color={'#111111'}
                    size={30}
                  />
                </Button>
                <Button>
                  <Ionicons
                    name='bookmark-outline'
                    color={'#111111'}
                    size={30}
                  />
                </Button>
              </Box>
            </Box>
          </Card>
        )
        : (
          <Container key={`rockets-home-tab-item-${article.id}`}>
            <HorizontalCard
              title={article.title}
              image={article.image}
              subtitle={"Wire rockets"}
            />
          </Container>
        )
    );
  }

  return (
    <FlatList
      data={query?.data?.articles?.rockets || []}
      renderItem={renderItem}
      // ListHeaderComponent={ListHeaderComponent}
      contentContainerStyle={tailwind`gap-6 pb-8`}
    />
  );
}