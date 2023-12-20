import React from 'react'
import MainLayout from '../../components/layout/main'
import { FlatList, RefreshControl } from 'react-native'
import { useQuery } from 'react-query';
import keyExtractor from '../../helpers/ui';
import tailwind from 'twrnc';
import { FlatListRender } from '../../types/ui';
import Box from '../../components/box';
import Text from '../../components/text';
import CardImage from '../../components/card-image';
import Container from '../../components/container';
import { Game } from '../../types/data';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import HighlightButton from '../../components/highlight-button';
import LoadingIndicator from '../../components/loading-indicator';
import Animated, { FadeInDown, FadeOutDown } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';
import { getGames } from '../../services/games';
import { getRemainingGames } from '../../helpers/games';

dayjs.extend(relativeTime);
export default function Games() {
  const query = useQuery({
    queryKey: "games",
    queryFn: getGames,
  });
  const onRefresh = async () => {
    await query.refetch();
  };
  const ItemSeparatorComponent = () => <Box className='w-full mt-4 md:mt-4 border-b border-[#ffc32a99]' />;
  const ListEmptyComponent = () => {
    return (
      <Container
        childrenClassName='flex-1 items-center justify-center'
        className='flex-1'
      >
        {
          query.isFetching
            ? (
              <LoadingIndicator
                color={"#ffc32a"}
                size={"large"}
                className={"gap-4"}
              >
                <Animated.Text
                  style={tailwind`text-slate-500 font-semibold`}
                  entering={FadeInDown}
                  exiting={FadeOutDown}
                >
                  Fetching games...
                </Animated.Text>
              </LoadingIndicator>
            )
            : (
              <HighlightButton
                borderContainerClassName='bg-slate-900'
                className='bg-[#ffc32a] gap-2 flex-row p-0 border border-slate-900'
                onPress={onRefresh}
              >
                <Text className='text-white text-slate-900 font-bold py-2 px-3'>
                  Refresh
                </Text>
                <Box className='bg-slate-900 h-full w-0.5' />
                <Box className='items-center justify-center pr-2'>
                  <Ionicons
                    size={20}
                    color={tailwind`text-slate-900`.color.toString()}
                    name='refresh-outline'
                  />
                </Box>
              </HighlightButton>
            )
        }

      </Container>
    );
  }
  const games = getRemainingGames([
    ...(query.data?.rockets || []),
    ...(query.data?.celtics || [])
  ]);
  const renderItem = ({ item }: FlatListRender<Game>) => {
    const gameTime = new Date(item.kickoff.global);
    gameTime.setHours(gameTime.getHours() + 1);

    return (
      <Container>
        <Box className='flex-row gap-4 md:gap-6 items-center'>
          <Box>
            <CardImage
              source={item.homeTeam.image}
              className='bg-white'
              containerClassName='h-12 w-12 md:h-24 md:w-24'
              borderContainerClassName='left-2 top-2'
              contentFit={tailwind.prefixMatch("md") ? "none" : "cover"}
            />
          </Box>
          <Box className='flex-1 flex-col items-center gap-2 justify-center'>
            <Box className={`bg-[#969694] w-22 md:w-26 p-1 items-center`}>
              <Text className='text-white uppercase text-[10px] md:text-sm'>
                {dayjs(gameTime).fromNow()}
              </Text>
            </Box>
            <Box className='flex-row gap-2 md:gap-4'>
              <Box className='max-w-24 flex-1 md:max-w-48 items-end'>
                <Text className='font-bold text-2xl md:text-5xl'>
                  {`${item.homeTeam.score || "-"}`}
                </Text>
                <Text
                  className='font-semibold text-sm md:text-xl text-right'
                  numberOfLines={2}
                >
                  {item.homeTeam.name}
                </Text>
              </Box>
              <Text className='font-bold text-2xl md:text-4xl'>
                &times;
              </Text>
              <Box className='max-w-24 flex-1 md:max-w-48 items-start'>
                <Text className='font-bold text-2xl md:text-5xl'>
                  {`${item.awayTeam.score || "-"}`}
                </Text>
                <Text
                  className='font-semibold text-sm md:text-xl text-left'
                  numberOfLines={2}
                >
                  {item.awayTeam.name || "-"}
                </Text>
              </Box>
            </Box>
          </Box>
          <Box>
            <CardImage
              source={item.awayTeam.image}
              className='bg-white'
              containerClassName='h-12 w-12 md:h-24 md:w-24'
              borderContainerClassName='left-2 top-2'
              contentFit={tailwind.prefixMatch("md") ? "none" : "cover"}
            />
          </Box>
        </Box>
      </Container>
    )
  };

  return (
    <MainLayout title={"Games"}>
      <Box className='flex-1'>
        <FlatList
          keyExtractor={keyExtractor("games-item", "id")}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
          data={games}
          contentContainerStyle={tailwind.style(`gap-4 md:gap-6 pt-4 md:pt-8`, query.isFetching ? "flex-1" : "")}
          style={tailwind`flex-1`}
          refreshing={query.isRefetching}
          onRefresh={onRefresh}
          refreshControl={
            <RefreshControl
              refreshing={query.isRefetching}
              onRefresh={onRefresh}
              colors={["#ffc32a", "#7fbcff"]}
            />
          }
        />
      </Box>
    </MainLayout>
  )
}