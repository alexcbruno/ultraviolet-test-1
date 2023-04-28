import { Description } from '@storybook/addon-docs'
import { useState } from 'react'
// eslint-disable-next-line import/no-relative-packages
import ChangelogMdForm from '../../../../form/CHANGELOG.md'
// eslint-disable-next-line import/no-relative-packages
import ChangelogMdThemes from '../../../../themes/CHANGELOG.md'
import ChangelogMdComponents from '../../../CHANGELOG.md'
import { Stack, Tabs } from '../../components'

export const Changelog = () => {
  const [selected, setSelected] = useState<string | number>('components')
  const onChangeHandler = (e: string | number) => setSelected(e)

  return (
    <Stack gap={2}>
      <Tabs selected={selected} onChange={onChangeHandler}>
        <Tabs.Tab value="components">Components</Tabs.Tab>
        <Tabs.Tab value="form">Form</Tabs.Tab>
        <Tabs.Tab value="themes">Themes</Tabs.Tab>
      </Tabs>

      {selected === 'components' && (
        <Description markdown={ChangelogMdComponents} />
      )}
      {selected === 'form' && <Description markdown={ChangelogMdForm} />}
      {selected === 'themes' && <Description markdown={ChangelogMdThemes} />}
    </Stack>
  )
}