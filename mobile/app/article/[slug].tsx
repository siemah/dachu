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

export default function Article() {
  const { top, bottom } = useSafeAreaInsets();
  const { canGoBack, goBack, navigate } = useNavigation();
  const params = useGlobalSearchParams();
  const [{ loading, data: article }] = useArticle({
    link: `${params.link}`,
    provider: `${params.provider}`
  });

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

  return (
    <Box className={`flex-1 bg-[#bfecff] pt-4 pt-[${top}px] pb-[${bottom}px]`}    >
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
            <Button>
              <Ionicons
                size={25}
                color={"#111111"}
                name='bookmark-outline'
              />
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
            className={"h-56"}
            contentFit='cover'
            source={params.image}
            containerClassName='mb-2'
          />
          <Box className='flex-row'>
            <TextHighlight>
              Key points
            </TextHighlight>
          </Box>
        </Container>
        <ArticlePlaceholder show={loading} />
        <ArticleBody article={article} />
      </ScrollView>
    </Box>
  );
}