'use client'

import { BuilderContent, useIsPreviewing } from '@builder.io/react'
import { builder } from '@builder.io/sdk'


builder.init(process.env.NEXT_PUBLIC_BUILDER_API_KEY!);

interface EventProps {
  content: any
}

const Event: React.FC<EventProps> = ({ content }) => {
  const isPreviewing = useIsPreviewing()

  return (
    <BuilderContent model="page" content={content} options={{query: {id: 234 }}}>
      {(data, loading, content) => {
        if (!isPreviewing && content?.data?.title) {
          console.log(window.location.href);
        }

        return (
          <section className="relative bg-lavender-tint-1 pt-4xl pb-xl">
            <div className="container">
              <div className="flex gap-md tablet:gap-xl flex-col desktop-s:flex-row">
                <h5>{content?.data?.title}</h5>
              </div>
            </div>
          </section>
        )
      }}
    </BuilderContent>
  )
}

export default Event
