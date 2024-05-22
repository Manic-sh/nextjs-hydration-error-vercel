import React from 'react'
import HydrationTestChild from './HydrationTestChild'

type Props = {
  text: string
}

const HydrationTestParent = (props: Props) => {
  return (
    <div className="p-20 text-4xl w-full bg-green-400">Parent : {props.text}
      <HydrationTestChild text={props.text} />
    </div>
  )
}

export default HydrationTestParent