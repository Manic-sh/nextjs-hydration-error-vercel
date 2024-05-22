import React from 'react'

type Props = {
  text: string
}

const HydrationTestChild = (props: Props) => {
  return (
    <div className="p-20 text-4xl mt-20 w-full bg-red-400">
      Child : {props.text}
    </div>
  )
}

export default HydrationTestChild