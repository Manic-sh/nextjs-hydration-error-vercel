import dynamic from 'next/dynamic'
import { Builder } from '@builder.io/react'
import { Input } from '@builder.io/sdk'

const DescriptionTabs = dynamic(async () => {
  return (await import('./DescriptionTabsV2')).default
})

const Tab: Input[] = [
  {
    name: 'title',
    type: 'text',
  },
  {
    name: 'content',
    type: 'code',
  },
  {
    name: 'hideOnDesktop',
    type: 'boolean',
  },
]

Builder.registerComponent(DescriptionTabs, {
  name: 'Description Tabs V2',
  inputs: [
    {
      name: 'tabs',
      type: 'list',
      subFields: Tab,
    },
    {
      name: 'topAwards',
      type: 'list',
      helperText: 'A special tab that appears after benefits',
      subFields: [
        {
          name: 'image',
          type: 'file',
        },
        {
          name: 'imageAlt',
          type: 'string',
        },
        {
          name: 'title',
          type: 'string',
        },
        {
          name: 'subtitle',
          type: 'string',
        },
      ],
    },
  ],
})
