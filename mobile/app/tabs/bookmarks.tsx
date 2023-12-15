import React from 'react'
import Box from '../../components/box'
import useScreenColor from '../../hook/use-screen-color';
import Container from '../../components/container';
import TextHighlight from '../../components/text-highlight';
import keyExtractor from '../../helpers/ui';
import tailwind from 'twrnc';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Article } from '../../types/data';
import { FlatListRender } from '../../types/ui';
import HorizontalCard from '../../components/horizontal-card';
import useBookmarks from '../../hook/use-bookmarks';
import HighlightButton from '../../components/highlight-button';
import Text from '../../components/text';
import { Ionicons } from '@expo/vector-icons';
import { FlatList, RefreshControl } from 'react-native';
import { useNavigation } from 'expo-router';
import LoadingIndicator from '../../components/loading-indicator';
import Animated, { FadeInDown, FadeOutUp } from 'react-native-reanimated';
import { decodeHTMLEntity } from '../../helpers/data';

export default function Bookmark() {
  const { top, bottom } = useSafeAreaInsets();
  const screenColor = useScreenColor();
  const [, { listify, loading, refetch }] = useBookmarks();
  const { navigate } = useNavigation();
  const data = listify();
  const renderItem = ({ item: article }: FlatListRender<Article>) => {
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
        // @ts-ignore
        subtitle: article?.subtitle,
      }
    };

    return (
      <Container
        key={`rockets-home-tab-item-${article.id}`}
        className='md:flex-1 md:max-w-[33%]'
      >
        <HorizontalCard
          key={`rockets-home-tab-item-${article.id}`}
          title={decodeHTMLEntity(article.title)}
          image={article.image}
          subtitle={article?.provider?.origin || article?.provider?.name}
          href={href}
        />
      </Container>
    );
  };
  const onMoveHome = () => {
    // @ts-ignore
    navigate("tabs", {
      screen: "index"
    })
  };

  const ListEmptyComponent = () => {
    return (
      <Container
        childrenClassName='flex-1 items-center justify-center gap-4'
        className='flex-1'
      >
        {
          loading === true
            ? (
              <LoadingIndicator
                color={"#2075f3"}
                size={"large"}
                className={"gap-4"}
              >
                <Animated.Text
                  style={tailwind`text-slate-500 font-semibold`}
                  entering={FadeInDown}
                  exiting={FadeOutUp}
                >
                  Fetching bookmarks
                </Animated.Text>
              </LoadingIndicator>
            )
            : (
              <>
                <Text className='text-green-800 text-lg text-center'>
                  There is no bookmarks you need to add articles using the following
                </Text>
                <HighlightButton
                  borderContainerClassName='bg-slate-900'
                  className='bg-[#ffc32a] gap-2 flex-row p-0 border border-slate-900'
                  onPress={onMoveHome}
                >
                  <Text className='text-white text-slate-900 font-bold py-2 px-3'>
                    Bookmark articles
                  </Text>
                  <Box className='bg-slate-900 h-full w-0.5' />
                  <Box className='items-center justify-center pr-2'>
                    <Ionicons
                      size={20}
                      color={tailwind`text-slate-900`.color.toString()}
                      name='newspaper-outline'
                    />
                  </Box>
                </HighlightButton>
              </>
            )
        }
      </Container>
    );
  }

  const onRefresh = () => {
    refetch();
  }

  return (
    <Box className={`flex-1 gap-4 bg-[${screenColor}] pt-[${top}px] pb-[${bottom}px]`}>
      <Container className='mt-4 mb-2 flex-row'>
        <TextHighlight
          className='text-4xl font-bold capitalize'
          highlightColor='#ffc32a'
        >
          Bookmarks
        </TextHighlight>
      </Container>
      <FlatList
        keyExtractor={keyExtractor("bookmarks-item", "name")}
        renderItem={renderItem}
        ListEmptyComponent={ListEmptyComponent}
        data={data}
        contentContainerStyle={tailwind`flex-1 gap-8`}
        refreshing={loading}
        onRefresh={onRefresh}
        numColumns={tailwind.prefixMatch("md") ? 3 : 1}
        refreshControl={
          <RefreshControl
            refreshing={loading}
            onRefresh={onRefresh}
            colors={["#8080b0", "#7fbcff"]}
          />
        }
      />
    </Box>
  )
}