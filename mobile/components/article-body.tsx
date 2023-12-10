import React from 'react'
import Box from './box';
import Container from './container';
import CardImage from './card-image';
import dayjs from 'dayjs';
import HighlightButton from './highlight-button';
import { Ionicons } from '@expo/vector-icons';
import Text from './text';
import { openURL } from '../helpers/linking';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

export default function ArticleBody({ article, provider, author }) {
  const onOpenURL = async () => {
    await openURL(author?.link || provider?.link);
  }

  if (article === null || article === undefined) return null;
  return (
    <Box className='gap-4'>
      <Container>
        <Text className='text-black'>
          {article?.description}
        </Text>
      </Container>
      <Box className='border-t border-b border-slate-600 py-2'>
        <Container>
          <Box className='flex-row gap-2 items-center'>
            <CardImage
              source={provider?.image}
              className='rounded-full w-12 h-12 bg-white'
              borderContainerClassName='border-0'
              containerClassName='flex-col web:flex-row'
            />
            <Box className='gap-1 flex-1 justify-center'>
              <Text className='text-slate-900 font-bold'>
                {article?.author?.name || provider?.name || "N/A"}
              </Text>
              <Text className='text-slate-500'>
                {dayjs(article.date).fromNow()}
              </Text>
            </Box>
            <Box>
              <HighlightButton
                className='flex-row gap-2 items-center'
                onPress={onOpenURL}
              >
                <Ionicons
                  size={16}
                  color={"#ffffff"}
                  name='person-add-sharp'
                />
                <Text className='text-white'>Follow</Text>
              </HighlightButton>
            </Box>
          </Box>
        </Container>
      </Box>
      <Container className='pb-4'>
        <Text className='text-slate-900 leading-5'>
          {`${article?.content?.split(`\n`)?.join(`\n\n`)}`}
        </Text>
      </Container>
    </Box>
  );
}