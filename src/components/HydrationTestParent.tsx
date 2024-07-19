import React, { useEffect, useState } from 'react';
import HydrationTestChild from './HydrationTestChild';

type Props = {
  text: string;
};

const HydrationTestParent = (props: Props) => {
  const [text, setText] = useState(props.text);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setText(props.text); // Ensure client-side rehydration consistency
    }
  }, [props.text]);

  return (
    <div className="p-20 text-4xl w-full bg-green-400">
      Parent : {text}
      <HydrationTestChild text={text} />
    </div>
  );
};

export default HydrationTestParent;