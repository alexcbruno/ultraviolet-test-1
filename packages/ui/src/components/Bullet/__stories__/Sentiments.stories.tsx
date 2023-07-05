import type { StoryFn } from '@storybook/react'
import { Bullet } from '..'
import { SENTIMENTS } from '../../../theme'
import { Stack } from '../../Stack'
import { Text } from '../../Text'

export const Sentiments: StoryFn = props => (
  <Stack gap={1}>
    <Stack direction="row" gap={1} alignItems="center">
      <Text as="span" variant="bodyStrong">
        Prominence default:
      </Text>
      {SENTIMENTS.map(sentiment => (
        <Bullet {...props} key={sentiment} sentiment={sentiment} text="1" />
      ))}
    </Stack>
    <Stack direction="row" gap={1} alignItems="center">
      <Text as="span" variant="bodyStrong">
        Prominence strong:
      </Text>
      {SENTIMENTS.map(sentiment => (
        <Bullet
          {...props}
          key={sentiment}
          sentiment={sentiment}
          prominence="strong"
          text="1"
        />
      ))}
    </Stack>
  </Stack>
)

Sentiments.parameters = {
  docs: {
    storyDescription:
      'Sentiment defines different colors of your component. You can define it using `Sentiment` property.',
  },
}

Sentiments.decorators = [
  StoryComponent => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
      <StoryComponent />
    </div>
  ),
]
