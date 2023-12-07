import React from 'react'
import Box from '../components/box'
import Text from '../components/text'
import Container from '../components/container'
import { TabView, SceneMap, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import { useWindowDimensions } from 'react-native';
import Button from '../components/button';
import tailwind from 'twrnc';
import { SplashScreen } from 'expo-router';
import RocketsHomeTab from '../components/home-tabs/rockets';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

SplashScreen.preventAutoHideAsync();

const SecondRoute = () => (
  <Box style={{ backgroundColor: '#673ab7', height: 100 }} />
);
const ThirdRoute = () => (
  <Box style={{ backgroundColor: '#67fab7', height: 100 }} />
);

const renderScene = SceneMap({
  first: RocketsHomeTab,
  second: SecondRoute,
  third: ThirdRoute,
});

const HomeTabBar = (props: SceneRendererProps & { navigationState: NavigationState<any>; }) => (
  <Container
    className='border-t border-b border-slate-600'
    childrenClassName='flex-row gap-4'
  >
    {
      props.navigationState.routes.map((route, indx) => {
        const isActive = props.navigationState.index === indx;
        const onPress = () => {
          props.jumpTo(route.key)
        };
        return (
          <Button
            key={`home-tab-item-${route.key}`}
            onPress={onPress}
            className='py-3'
          >
            <Text
              className='text-sm text-slate-600 uppercase'
              style={tailwind.style({
                "font-bold": isActive,
                "text-slate-900": isActive
              })}>
              {route.title}
            </Text>
          </Button>
        );
      })
    }
  </Container>
);

export default function Index() {
  const { top } = useSafeAreaInsets();
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Rockets' },
    { key: 'third', title: 'Celtics' },
    { key: 'second', title: 'Liverpool' },
  ]);
  const [isReady, setReady] = React.useState(false);
  const navigationState = {
    index, routes
  };
  const initialLayout = {
    width: layout.width,
  };
  React.useEffect(() => {
    // Perform some sort of async data or asset fetching.
    setTimeout(() => {
      // When all loading is setup, unmount the splash screen component.
      SplashScreen.hideAsync();
      setReady(true);
    }, 1000);
  }, []);

  return (
    <Box className={`flex-1 gap-4 pt-4 mt-[${top}px]`}>
      <Container>
        <Text className='text-4xl font-bold'>Dachu</Text>
      </Container>
      <Box className='flex-1'>
        <TabView
          navigationState={navigationState}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={initialLayout}
          renderTabBar={HomeTabBar}
          lazy
        />
      </Box>
    </Box>
  )
}