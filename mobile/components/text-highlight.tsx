import { StyleSheet, Text as RnText } from 'react-native';
import { WithClassName } from '../types/ui';
import Box from './box';
import Text from './text';

export default function TextHighlight({ style, highlightColor = "rgba(255,218,121,1)", children }: { highlightColor?: string } & WithClassName<typeof RnText>) {
  const highlight = {
    backgroundColor: highlightColor
  };

  return (
    <Box className=''>
      <Box
        className='absolute top-1/2 left-0 right-0 bottom-0'
        style={highlight}
      />
      <Text
        style={[styles.text, style]}
        className="uppercase font-bold text-black"
      >
        {children}
      </Text>
    </Box>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "#000000"
  },
})