import React from 'react'
import Card from '../card';
import Box from '../box';
import CardImage from '../card-image';
import { Ionicons } from '@expo/vector-icons';
import Text from '../text';
import Button from '../button';
import Container from '../container';
import HorizontalCard from '../horizontal-card';
import LoadingIndicator from '../loading-indicator';
import { FlatList, Platform } from 'react-native';
import tailwind from 'twrnc';
import { useQuery } from 'react-query';
import { getHomeData } from '../../services/home';
import { FlatListRender } from '../../types/ui';
import { Article } from '../../types/data';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TabScreenPlaceholder from './placeholder';
import { RefreshControl } from 'react-native-gesture-handler';

dayjs.extend(relativeTime);

export default function TabScreen({ screen }: { screen: "rockets" | "celtics" | "lfc" }) {
  const query = useQuery({
    queryKey: "home",
    queryFn: getHomeData,
  });
  const articles = query?.data?.articles?.[screen] || [];
  const renderItem = ({ item: article, index }: FlatListRender<Article>) => {
    const href = {
      pathname: `/article/${article.id}`,
      params: {
        image: article.image,
        title: article.title,
        link: article.link,
        provider: article?.provider?.name,
        providerImage: article?.provider?.image,
        providerLink: article?.provider?.link,
        originProvider: article?.provider?.origin,
        subtitle: screen,
      }
    };

    return (
      index === 0
        ? (
          <Card
            title={`—${article.title}`}
            image={article.image}
            subtitle={article?.provider?.origin || article?.provider?.name}
            preview={article?.preview || article.title}
            href={href}
          >
            <Box className='flex-row items-center gap-4'>
              <Box className='flex-1 flex-row gap-4 items-center'>
                <CardImage
                  source={article?.provider?.image}
                  contentFit='cover'
                  className={`h-14 w-14 bg-white`}
                  containerClassName={`w-14`}
                  borderContainerClassName={`border-2 left-2 top-2`}
                />
                <Box className='gap-1'>
                  <Text className='font-bold text-sm text-slate-600'>
                    {article?.provider?.origin || article?.provider?.name}
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
              subtitle={article?.provider?.origin || article?.provider?.name}
              href={href}
            />
          </Container>
        )
    );
  }

  const onRefresh = () => {
    query.refetch({
      queryKey: "home",
    });
  }

  if (query.isFetching === true && query.isRefetching === false) {
    return Platform.OS === "web"
      ? <LoadingIndicator color={"#282055"} />
      : (
        <Container>
          <TabScreenPlaceholder />
        </Container>
      )
  }

  return (
    <FlatList
      data={articles}
      renderItem={renderItem}
      contentContainerStyle={tailwind`gap-6 pb-8`}
      refreshing={query.isRefetching}
      onRefresh={onRefresh}
      refreshControl={
        <RefreshControl
          refreshing={query.isRefetching}
          onRefresh={onRefresh}
          colors={["#8080b0", "#7fbcff"]}
        />
      }
    />
  );
}