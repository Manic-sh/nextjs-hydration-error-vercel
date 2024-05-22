import React from 'react'
import HydrationTestChild from './HydrationTestChild'

type Props = {
  text: string
}

const HydrationTestParent = (props: Props) => {
  return (
    <div className="p-20 w-full bg-green-400">HydrationTestParent : {props.text}
      <HydrationTestChild text={props.text} />
    </div>
  )
}

export default HydrationTestParent