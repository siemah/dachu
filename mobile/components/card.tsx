import Box from './box'
import Container from './container'
import TextHighlight from './text-highlight'
import Text from './text'
import CardImage from './card-image'
import { CardProps } from '../types/ui'
import { Link, router } from 'expo-router'
import tailwind from 'twrnc'
import Button from './button'
import { GestureResponderEvent } from 'react-native'

export default function Card({ title, subtitle, image, preview, href, className = '', imageClassName = '', children, onPress: onClick, ...props }: CardProps) {
  const onPress = (event: GestureResponderEvent) => {
    router.push(href);
    onClick && onClick(event);
  }

  return (
    <Button
      style={tailwind`gap-8 ${className}`}
      onPress={onPress}
      {...props}
    >
      <Container childrenClassName='gap-4'>
        <Box className='flex-row flex-wrap pt-4'>
          <TextHighlight
            highlightColor='#77f5c3'
          >
            {subtitle}
          </TextHighlight>
        </Box>
        <Text
          className={`text-3xl font-bold text-slate-900`}
          numberOfLines={2}
        >
          {title}
        </Text>
        <CardImage
          className={`min-h-56 h-full ${imageClassName}`}
          contentFit='cover'
          source={image}
        />
        {
          !!preview && (
            <Text className='mt-2'>
              <Text className={`mt-2 text-slate-700`}>
                {preview}{`..`}
              </Text>
              <Text className='font-bold text-slate-800 underline'>More</Text>
            </Text>
          )
        }
        {children}
      </Container>
      <Box className='border-t border-slate-600' />
    </Button>
  );
}