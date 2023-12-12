import React, { useEffect, useRef, useState } from 'react'
import * as Location from 'expo-location';
import Box from '../../components/box';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import useScreenColor from '../../hook/use-screen-color';
import { Alert, FlatList, Platform } from 'react-native';
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
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
    priority: Notifications.AndroidNotificationPriority.HIGH
  }),
});

export default function Prayer() {
  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();
  const AsyncStorage = useAsyncStorage('@prayer_notification');
  const screenColor = useScreenColor();
  const { top, bottom } = useSafeAreaInsets();
  const { navigate } = useNavigation();
  const [prayerNotificationConfig, setPrayerNotificationConfig] = useState(null);
  const [gpsCoords, setGpsCoords] = useState<{
    latitude: number,
    longitude: number
  }>(undefined)
  const [prayerTimes] = usePrayerTimes(gpsCoords);
  const ListEmptyComponent = () => (
    <Container
      childrenClassName='flex-1 items-center justify-center'
      className='flex-1'
    >
      {
        prayerTimes.loading
          ? <LoadingIndicator color={"#2075f3"} size={"large"} />
          : (
            <HighlightButton
              borderContainerClassName='bg-slate-900'
              className='bg-[#ffc32a] gap-2 flex-row p-0 border border-slate-900'
              onPress={onGoHome}
            >
              <Text className='text-white text-slate-900 font-bold py-2 px-3'>
                Go home
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
          )
      }

    </Container>
  )
  const onTogglePrayerNotification = (item: Record<string, string>) => async (value: boolean) => {
    const date = new Date();
    const [hh, mm] = item.time.split(":");

    if (value === true) {
      date.setHours(parseInt(hh, 10));
      date.setMinutes(parseInt(mm, 10));
      const diff = date.getTime() - Date.now();

      if (diff > 0) {
        const notificationId = await schedulePushNotification(
          `Prayer time`,
          `It is nearly time for ${item.name}`,
          diff / 1000
        );
        const prayerConfig = {
          ...(prayerNotificationConfig || {}),
          [item.name]: {
            id: notificationId,
            timestamp: date.getTime()
          }
        };
        await AsyncStorage.setItem(JSON.stringify(prayerConfig));
        setPrayerNotificationConfig(prayerConfig);
      } else {
        Alert.alert(
          `Prayer notification`,
          `You can't schedule a notification for "${item.name}" its is already in the past`
        );
      }
    } else {
      const notificationId = prayerNotificationConfig?.[item.name]?.id;
      await Notifications.cancelScheduledNotificationAsync(notificationId);
      const prayerConfig = {
        ...(prayerNotificationConfig || {}),
        [item.name]: null
      };
      await AsyncStorage.setItem(JSON.stringify(prayerConfig));
      setPrayerNotificationConfig(prayerConfig);
    }
  };
  const ItemSeparatorComponent = () => <Box className='w-full border-b border-[#cbe7ff]' />;
  const renderItem = ({ item }: FlatListRender<Record<string, string>>) => {
    const isChecked = !!prayerNotificationConfig?.[item.name]?.id;

    return (
      <Container className='py-3'>
        <Box className='flex-row gap-2 items-center'>
          <Box className='flex-1 flex-col gap-0.5'>
            <Text className='text-4xl font-bold capitalize'>
              {item.name}
            </Text>
            <Text className='text-slate-600 text-lg font-medium'>
              {item.time}
            </Text>
          </Box>
          <RNSwitch
            value={isChecked}
            onValueChange={onTogglePrayerNotification(item)}
          />
        </Box>
      </Container>
    )
  };
  const onGoHome = () => {
    // @ts-ignore
    navigate("index");
  };
  const alertOptions = {
    onDismiss: onGoHome
  };
  const handleLocationRejection = () => {
    if (Platform.OS === "web") {
      alert("You will be redirected to home after closing this");
      onGoHome();
    } else {
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

  useEffect(() => {
    const loadPrayerNotificationSetups = async () => {
      try {
        const response = await AsyncStorage.getItem();
        setPrayerNotificationConfig(
          JSON.parse(response || "null")
        );
      } catch (error) {
      }
    }
    loadPrayerNotificationSetups();

    return () => {

    }
  }, []);

  useEffect(() => {
    const initLoad = async () => {
      try {
        let { status, } = await Location.requestForegroundPermissionsAsync();

        if (status !== Location.PermissionStatus.GRANTED) {
          handleLocationRejection();
          return;
        }

        let location = await Location.getCurrentPositionAsync();
        setGpsCoords({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });
      } catch (error) {
        alert("Something went wrong please check your network or try again after a while!")
      }
    }
    initLoad();

    registerForPushNotificationsAsync().then(token => {
    });

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
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
        // prayerTimes.loading
        //   ? 
        //   : 
        <FlatList
          keyExtractor={keyExtractor("prayer-times-item", "name")}
          ItemSeparatorComponent={ItemSeparatorComponent}
          renderItem={renderItem}
          ListEmptyComponent={ListEmptyComponent}
          data={prayerTimes.data}//prayerTimes.data
          contentContainerStyle={tailwind`flex-1`}
        />
      }
    </Box>
  );
}

async function schedulePushNotification(title: string, body: string, seconds: number) {
  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title,
      body,
      sound: "adhan.wav"
    },
    trigger: {
      seconds
    },
  });

  return notificationId;
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === 'android') {
    await Notifications.setNotificationChannelAsync('default', {
      name: 'default',
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: '#FF231F7C',
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== 'granted') {
      alert('Failed to get push token for push notification!');
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (await Notifications.getExpoPushTokenAsync({
      // projectId: 'your-project-id' 
    })).data;
  } else if (Platform.OS !== "web") {
    alert('Must use physical device for Push Notifications');
  }

  return token;
}