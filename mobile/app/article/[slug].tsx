import Container from '../../components/container'
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Box from '../../components/box';
import { ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Button from '../../components/button';
import { useGlobalSearchParams, useNavigation } from 'expo-router';
import { openURL } from '../../helpers/linking';
import TextHighlight from '../../components/text-highlight';
import CardImage from '../../components/card-image';
import Text from '../../components/text';
import ArticlePlaceholder from '../../components/article-placeholder';
import { useArticle } from '../../hook/use-article';
import ArticleBody from '../../components/article-body';
import { stringToUniqueNumber } from '../../helpers/data';
import useBookmarks from '../../hook/use-bookmarks';
import Animated, { ZoomIn, useAnimatedStyle, withSpring, withTiming } from 'react-native-reanimated';

export default function Article() {
  const [, { loading: loadingBookmarks, toggleBookmark, isBookmarked, getArticle }] = useBookmarks();
  const { top, bottom } = useSafeAreaInsets();
  const { canGoBack, goBack, navigate } = useNavigation();
  const params = useGlobalSearchParams();
  const articleId = stringToUniqueNumber(`${params.link}`);
  const fromBookmark = getArticle(articleId)
  const [{ loading, data: article }] = useArticle({
    link: `${params.link}`,
    provider: `${params.provider}`,
    fromBookmark: loadingBookmarks ? {} : fromBookmark
  });
  const bookmarked = isBookmarked(articleId);
  const animatedStyles = useAnimatedStyle(() => {
    return ({
      transform: [{
        scale: withSpring(bookmarked ? 1 : 0)
      }],
    })
  });
  const exiting = () => {
    'worklet';
    const animations = {
      transform: [{
        scale: withTiming(0)
      }],
      opacity: withTiming(0.5),
    };
    const initialValues = {
      transform: [{
        scale: 1
      }],
      opacity: 1,
    };
    return {
      initialValues,
      animations,
    };
  };
  const outlineExiting = () => {
    'worklet';
    const animations = {
      transform: [{
        scale: withTiming(0, { duration: 200 })
      }],
      opacity: withTiming(0, { duration: 100 }),
    };
    const initialValues = {
      transform: [{
        scale: 1
      }],
      opacity: 1,
    };
    return {
      initialValues,
      animations,
    };
  };

  const provider = {
    name: `${params?.originProvider || params?.provider || "N/A"}`,
    image: `${params?.providerImage}`,
    link: `${params?.providerLink || params?.link}`,
  };

  const onGoBack = () => {
    if (canGoBack()) {
      goBack()
    } else {
      // @ts-ignore
      navigate("index");
    }
  }

  const onOpenUrl = async () => {
    if (typeof params?.link === "string") {
      await openURL(params?.link)
    }
  }

  const onBookmark = async () => {
    try {
      console.log(`bookmarking..`, article?.content.length, `<[[[[<<<<<<bookmarking>>>>>>]]]]>`)
      await toggleBookmark({
        id: articleId,
        title: `${params.title}`,
        link: params.link,
        image: params.image,
        subtitle: `${params.subtitle}`,
        description: article?.description || "",
        content: article?.content,
        provider,
        author: article?.author
      });
    } catch (error) {
      alert(`Something went wrong(${error?.message}) please try again!`)
    }
  }
  // todo: no idea what to put here
  const onLike = async () => {

  }

  return (
    <Box className={`flex-1 bg-[#bfecff] pt-4 pt-[${top}px] pb-[${bottom}px]`}>
      <Container className='border-b border-slate-400'>
        <Box className='flex-row justify-between gap-3 py-4'>
          <Button onPress={onGoBack}>
            <Ionicons
              size={25}
              color={"#111111"}
              name='arrow-back-outline'
            />
          </Button>
          <Box className='flex-row gap-3'>
            <Button>
              <Ionicons
                size={25}
                color={"#111111"}
                name='heart-outline'
              />
            </Button>
            <Button onPress={onBookmark}>
              {
                bookmarked && (
                  <Animated.View
                    style={[animatedStyles]}
                    exiting={exiting}
                  >
                    <Ionicons
                      size={25}
                      color={'#ffa32a'}
                      name={'bookmark-sharp'}
                    />
                  </Animated.View>
                )
              }
              {
                !bookmarked && (
                  <Animated.View
                    entering={ZoomIn.springify()}
                    exiting={outlineExiting}
                  >
                    <Ionicons
                      size={25}
                      color={'#111111'}
                      name={'bookmark-outline'}
                    />
                  </Animated.View>
                )
              }
            </Button>
            <Button onPress={onOpenUrl}>
              <Ionicons
                size={25}
                color={"#111111"}
                name='open-outline'
              />
            </Button>
          </Box>
        </Box>
      </Container>
      <ScrollView
        showsVerticalScrollIndicator={false}
        bounces={false}
      >
        <Container childrenClassName='gap-4 py-4'>
          <Box className='flex-row'>
            <TextHighlight highlightColor='#77f5c3'>
              {params.subtitle}
            </TextHighlight>
          </Box>
          <Text className={`text-3xl font-bold text-slate-900`}>
            —{params.title}
          </Text>
          <CardImage
            className={"min-h-56 h-full"}
            contentFit='cover'
            source={params.image}
            containerClassName='mb-2 md:h-100'
          />
          <Box className='flex-row'>
            <TextHighlight>
              Key points
            </TextHighlight>
          </Box>
        </Container>
        <Container>
          <ArticlePlaceholder show={loading} />
        </Container>
        <ArticleBody
          article={article}
          provider={provider}
          author={article?.author}
        />
      </ScrollView>
    </Box>
  );
}