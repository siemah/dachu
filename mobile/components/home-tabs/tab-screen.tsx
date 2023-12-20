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
import { FlatList, Platform, View } from 'react-native';
import tailwind from 'twrnc';
import { useMutation, useQuery } from 'react-query';
import { getHomeData } from '../../services/home';
import { FlatListRender } from '../../types/ui';
import { Article } from '../../types/data';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import TabScreenPlaceholder from './placeholder';
import { RefreshControl } from 'react-native-gesture-handler';
import { decodeHTMLEntity, stringToUniqueNumber } from '../../helpers/data';
import BookmarkButton from '../bookmark-button';
import useBookmarks from '../../hook/use-bookmarks';
import { getArticle } from '../../services/article';
import globalLinks from '../../config/links';
import Head from 'expo-router/head';

dayjs.extend(relativeTime);

export default function TabScreen({ screen }: { screen: "rockets" | "celtics" | "lfc" }) {
  const [, { isBookmarked, toggleBookmark }] = useBookmarks();
  const query = useQuery({
    queryKey: "home",
    queryFn: getHomeData,
  });
  const articles = query?.data?.articles?.[screen] || [];
  const ListHeaderComponent = () => {
    const article = articles?.[0];
    if (article === undefined) return null;
    const href = {
      pathname: `/article/${article.id}`,
      params: {
        image: article.image,
        title: decodeHTMLEntity(article.title),
        link: article.link,
        provider: article?.provider?.name,
        providerImage: article?.provider?.image,
        providerLink: article?.provider?.link,
        originProvider: article?.provider?.origin,
        subtitle: screen,
      }
    };
    const articleId = stringToUniqueNumber(`${article.link}`);
    const bookmarked = isBookmarked(articleId);

    return (
      <Card
        title={decodeHTMLEntity(`—${article.title}`)}
        image={article.image}
        subtitle={article?.provider?.origin || article?.provider?.name}
        preview={decodeHTMLEntity(article?.preview || article.title)}
        href={href}
        imageClassName={`md:h-100`}
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
            <BookmarkButton
              bookmarked={bookmarked}
              onPress={onBookmark(articleId, article)}
            />
          </Box>
        </Box>
      </Card>
    );
  };
  const onBookmark = (articleId: number, article: Article) => async () => {
    try {
      const bookmarked = isBookmarked(articleId);
      const articleLink = encodeURIComponent(`${article.link}`);
      const url = `${globalLinks.article}/${article?.provider?.name}/${articleLink}`;
      const articleBody = bookmarked === false ? await getArticle(url)() : null;
      await toggleBookmark({
        id: articleId,
        title: `${article.title}`,
        link: article.link,
        image: article.image,
        subtitle: `${screen}`,
        content: articleBody?.content,
        date: articleBody?.date,
        description: article?.preview || "",
        provider: {
          name: article?.provider?.name,
          image: article?.provider?.image,
          link: article?.provider?.link,
        },
        author: articleBody?.author
      });
    } catch (error) {
      alert(`Something went wrong(${error?.message}) please try again!`)
    }
  }

  const renderItem = ({ item: article, index }: FlatListRender<Article>) => {
    const articleId = stringToUniqueNumber(`${article.link}`);
    const href = {
      pathname: `/article/${article.id}`,
      params: {
        image: article.image,
        title: decodeHTMLEntity(article.title),
        link: article.link,
        provider: article?.provider?.name,
        providerImage: article?.provider?.image,
        providerLink: article?.provider?.link,
        originProvider: article?.provider?.origin,
        subtitle: screen,
      }
    };
    const bookmarked = isBookmarked(articleId);

    return (
      index === 0
        ? null
        : (
          <Container
            key={`${screen}-home-tab-item-${article.id}`}
            className='md:flex-1 md:max-w-[33%]'
          >
            <HorizontalCard
              title={decodeHTMLEntity(article.title)}
              image={article.image}
              subtitle={article?.provider?.origin || article?.provider?.name}
              href={href}
            >
              <BookmarkButton
                bookmarked={bookmarked}
                onPress={onBookmark(articleId, article)}
                className='absolute top-0 right-0'
              />
            </HorizontalCard>
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
    <>
      <Head>
        <title>{screen}</title>
        <meta name="description" content={`Latest news about the ${screen}`} />
      </Head>
      <FlatList
        data={articles}
        ListHeaderComponent={ListHeaderComponent}
        renderItem={renderItem}
        contentContainerStyle={tailwind`gap-6 pb-8 md:flex-1`}
        refreshing={query.isRefetching}
        onRefresh={onRefresh}
        numColumns={tailwind.prefixMatch("md") ? 3 : 1}
        refreshControl={
          <RefreshControl
            refreshing={query.isRefetching}
            onRefresh={onRefresh}
            colors={["#8080b0", "#7fbcff"]}
          />
        }
      />
    </>
  );
}