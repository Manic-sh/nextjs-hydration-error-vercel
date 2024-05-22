import React from 'react'

type Props = {
  text: string
}

const HydrationTestChild = (props: Props) => {
  return (
    <div className="p-20 w-full bg-red-400">
      HydrationTestChild : {props.text}
    </div>
  )
}

export default HydrationTestChild