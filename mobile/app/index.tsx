import React from 'react'
import Box from '../components/box'
import Text from '../components/text'
import Container from '../components/container'
import { TabView, SceneMap, SceneRendererProps, NavigationState } from 'react-native-tab-view';
import { FlatList, useWindowDimensions } from 'react-native';
import Button from '../components/button';
import tailwind from 'twrnc';
import TextHighlight from '../components/text-highlight';
import CardImage from '../components/card-image';
import { Ionicons } from '@expo/vector-icons';

const FirstRoute = () => (
  <FlatList
    data={[]}
    renderItem={props => null}
    ListHeaderComponent={() => (
      <Box className='gap-8 mb-4'>
        <Container childrenClassName='gap-4'>
          <Box className='flex-row flex-wrap pt-4'>
            <TextHighlight
              highlightColor='#77f5c3'
            >
              headline
            </TextHighlight>
          </Box>
          <Text className={`text-3xl font-bold text-slate-1000`}>
            —Biden vows to codify Roe “We Gotta Go“
          </Text>
          <CardImage
            className={"h-56"}
            contentFit='cover'
            source={"https://picsum.photos/seed/696/3000/2000"}
          />
          <Text className='mt-2'>
            <Text className={`text-md mt-2 text-slate-700`}>
              Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quas nulla expedita quidem laborum nemo similique repellendus ratione minus voluptatum adipisci, provident repellat ad, sed rerum. Officia quis eius sunt deleniti!{`....`}
            </Text>
            <Text className='font-bold text-slate-800 underline'>More</Text>
          </Text>
          <Box className='flex-row justify-between items-center gap-4'>
            <Box className='flex-1 flex-row gap-4 items-center'>
              <CardImage
                source={"https://picsum.photos/seed/150/150"}
                contentFit='cover'
                className={`h-14 w-14`}
                borderContainerClassName={`border-2 left-2 top-2`}
              />
              <Box className='gap-1'>
                <Text className='font-bold text-sm'>
                  Provider Name
                </Text>
                <Box className='flex-row gap-1 items-center'>
                  <Ionicons
                    size={20}
                    color={"#111111"}
                    name={'time-outline'}
                  />
                  <Text>2 hours ago</Text>
                </Box>
              </Box>
            </Box>
            <Box>
              <Button>
                <Ionicons
                  name='heart-outline'
                  color={'#111111'}
                  size={30}
                />
              </Button>
            </Box>
          </Box>
        </Container>
        <Box className='border-t border-slate-600' />
      </Box>
    )}
  />
);

const SecondRoute = () => (
  <Box style={{ backgroundColor: '#673ab7', height: 100 }} />
);
const ThirdRoute = () => (
  <Box style={{ backgroundColor: '#67fab7', height: 100 }} />
);

const renderScene = SceneMap({
  first: FirstRoute,
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
  const layout = useWindowDimensions();
  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'Rockets' },
    { key: 'third', title: 'Celtics' },
    { key: 'second', title: 'Liverpool' },
  ]);

  return (
    <Box className='flex-1 gap-4 pt-4'>
      <Container>
        <Text className='text-4xl font-bold'>Dachu</Text>
      </Container>
      <Box className='flex-1'>
        <TabView
          navigationState={{ index, routes }}
          renderScene={renderScene}
          onIndexChange={setIndex}
          initialLayout={{ width: layout.width, }}
          renderTabBar={HomeTabBar}
          lazy
        />
      </Box>
    </Box>
  )
}