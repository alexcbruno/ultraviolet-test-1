import { Meta, Story } from '@storybook/react'
import React from 'react'
import Separator, { SeparatorProps } from '..'
import FlexBox from '../../FlexBox'

export default {
  component: Separator,
  parameters: {
    docs: {
      description: {
        component: 'A horizontal or vertical separator.',
      },
    },
  },
  title: 'Components/Data Display/Separator',
} as Meta

const Template: Story<SeparatorProps> = args => <Separator {...args} />

export const Default = Template.bind({})

export const Thickness = Template.bind({})

Thickness.args = {
  thickness: 3,
}

Thickness.parameters = {
  docs: {
    description: {
      story: 'Set thickness using `thickness` prop.',
    },
  },
}

export const Direction: Story<SeparatorProps> = args => (
  <FlexBox inline>
    <div>left part</div>
    <Separator {...args} />
    <div>right part</div>
  </FlexBox>
)

Direction.args = {
  direction: 'vertical',
  mx: 1,
}

Direction.parameters = {
  docs: {
    description: {
      story: 'Set direction using `direction` prop.',
    },
  },
}

export const Color: Story<SeparatorProps> = Template.bind({})

Color.args = {
  color: 'primary',
}

Color.parameters = {
  docs: {
    description: {
      story: 'Set color using `color` prop.',
    },
  },
}

export const Icon: Story<SeparatorProps> = ({ icon }) => (
  <>
    <div>
      <div>horizontal start</div>
      <Separator my={1} icon={icon} />
      <div>horizontal end</div>
    </div>
    <FlexBox alignItems="center">
      <div>vertical start</div>
      <Separator direction="vertical" mx={1} icon={icon} />
      <div>vertical end</div>
    </FlexBox>
  </>
)

Icon.args = {
  icon: 'ray-top-arrow',
}

Icon.parameters = {
  docs: {
    description: {
      story: 'Set icon using `icon` prop.',
    },
  },
}
