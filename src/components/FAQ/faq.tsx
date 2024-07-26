import React from 'react';

interface DataItem {
  id: number;
  name: string;
  data?: {
    color?: string;
    capacity?: string;
    price?: string;
    generation?: string;
    'CPU model'?: string;
  };
}

interface FAQProps {
  data: DataItem[] | null;
}

const FAQ: React.FC<FAQProps> = ({ data }) => {

  if (!data) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-white rounded-xl shadow-md mb-3 p-5">
      {data?.map((item: DataItem, index: number) => (
        <div key={index}>
          <h5>{item.name}</h5>
          <p className="mb-0">Color: {item.data?.color}</p>
          <p className="mb-0">Capacity: {item.data?.capacity}</p>
          <p className="mb-0">Price: {item.data?.price}</p>
          <p className="mb-0">Generation: {item.data?.generation}</p>
          <p className="mb-0">CPU model: {item.data?.['CPU model']}</p>
        </div>
      ))}
    </div>
  );
};


export default FAQ;