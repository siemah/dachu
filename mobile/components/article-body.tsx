import React from 'react'
import Box from './box';
import Container from './container';
import CardImage from './card-image';
import dayjs from 'dayjs';
import HighlightButton from './highlight-button';
import { Ionicons } from '@expo/vector-icons';
import Text from './text';

export default function ArticleBody({ article }) {
  if (article === null) return null;
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
              source={"https://picsum.photos/1000"}
              className='rounded-full w-12 h-12'
              borderContainerClassName='border-0'
            />
            <Box className='gap-1 flex-1 justify-center'>
              <Text className='font-bold'>
                {article?.author?.name}
              </Text>
              <Text className='muted'>
                {dayjs(article.date).fromNow()}
              </Text>
            </Box>
            <HighlightButton
              className='flex-row gap-2 items-center'
            >
              <Ionicons
                size={16}
                color={"#ffffff"}
                name='person-add-sharp'
              />
              <Text className='text-white'>Follow</Text>
            </HighlightButton>
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