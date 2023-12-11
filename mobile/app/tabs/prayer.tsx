import React, { useEffect, useState } from 'react'
import * as Location from 'expo-location';
import Box from '../../components/box';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useScreenColor from '../../hook/use-screen-color';
import { Alert, FlatList, Platform, Switch } from 'react-native';
import { useNavigation } from 'expo-router';
import { usePrayerTimes } from '../../hook/use-prayer-time';
import Container from '../../components/container';
import Text from '../../components/text';
import RNSwitch from '../../components/switch';
import TextHighlight from '../../components/text-highlight';
import { FlatListRender } from '../../types/ui';
import keyExtractor from '../../helpers/ui';
import LoadingIndicator from '../../components/loading-indicator';
import HighlightButton from '../../components/highlight-button';
import { Ionicons } from '@expo/vector-icons';
import tailwind from 'twrnc';

export default function Prayer() {
  const screenColor = useScreenColor();
  const { top, bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation();
  const [gpsCoords, setGpsCoords] = useState<{
    latitude: number,
    longitude: number
  }>(undefined)
  const [prayerTimes] = usePrayerTimes(gpsCoords);
  const [isOn, setIsOn] = useState(false)
  const ListEmptyComponent = () => (
    <Container
      childrenClassName='flex-1 items-center justify-center'
      className='flex-1'
    >
      <HighlightButton
        borderContainerClassName='bg-slate-900'
        className='bg-[#ffc32a] gap-2 flex-row p-0 border border-slate-900'
      >
        <Text className='text-white text-slate-900 font-bold py-2 px-3'>
          Refresh
        </Text>
        <Box className='bg-slate-900 h-full w-0.5' />
        <Box className='items-center justify-center pr-2'>
          <Ionicons
            size={20}
            color={tailwind`text-slate-900`.color.toString()}
            name='arrow-forward-outline'
          />
        </Box>
      </HighlightButton>
    </Container>
  )
  const ItemSeparatorComponent = () => <Box className='w-full border-b border-[#bbe7ff]' />;
  const renderItem = ({ item }: FlatListRender<Record<string, string>>) => (
    <Container className='py-3'>
      <Box className='flex-row gap-2 items-center'>
        <Box className='flex-1 flex-col gap-0.5'>
          <Text className='text-4xl font-bold'>
            {item.name}
          </Text>
          <Text className='text-slate-600 text-lg font-medium'>
            {item.time}
          </Text>
        </Box>
        <RNSwitch
          value={isOn}
          onValueChange={() => setIsOn(!isOn)}
        />
      </Box>
    </Container>
  );
  const onGoHome = () => {
    // @ts-ignore
    navigate("index");
  };
  const alertOptions = {
    onDismiss: onGoHome
  };

  useEffect(() => {
    const initLoad = async () => {
      try {
        let { status, } = await Location.requestForegroundPermissionsAsync();

        if (status !== Location.PermissionStatus.GRANTED) {
          handleLocationRejection();
          return;
        }

        let location = await Location.getCurrentPositionAsync({
          accuracy: Location.LocationAccuracy.Highest
        });
        setGpsCoords({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        alert("Something went wrong please check your network or try again after a while!")
      }
    }
    initLoad();
  }, []);

  return (
    <Box className={`flex-1 gap-4 bg-[${screenColor}] pt-[${top}px] pb-[${bottom}px]`}>
      <Container className='mt-4 flex-row'>
        <TextHighlight
          className='text-4xl font-bold capitalize'
          highlightColor='#ffc32a'
        >
          Prayer Times
        </TextHighlight>
      </Container>
      {
        prayerTimes.loading
          ? <LoadingIndicator />
          : <FlatList
            keyExtractor={keyExtractor("prayer-times-item", "name")}
            ItemSeparatorComponent={ItemSeparatorComponent}
            renderItem={renderItem}
            ListEmptyComponent={ListEmptyComponent}
            data={prayerTimes.data}
            contentContainerStyle={tailwind`flex-1`}
          />
      }
    </Box>
  )

  function handleLocationRejection() {
    if (Platform.OS === "web") {
      alert("You will be redirected to home after closing this");
      onGoHome();
    }

    else
      Alert.alert(
        "Location permission are required",
        "You will be redirected to home after closing this",
        [
          {
            text: "Ok",
            onPress: onGoHome
          }
        ],
        alertOptions
      );
  }
}