'use client';

import React, { useState } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';

const initialSlams = [
  {
    id: 1,
    title: 'title 1',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,illum.',
  },
  {
    id: 2,
    title: 'title 2',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,illum.',
  },
  {
    id: 3,
    title: 'title 3',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,illum.',
  },
  {
    id: 4,
    title: 'title 4',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,illum.',
  },
  {
    id: 5,
    title: 'title 5',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,illum.',
  },
  {
    id: 6,
    title: 'title 6',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,illum.',
  },
];
export default function Slams() {
  const [sampleSlams, setSampleSlams] = useState(initialSlams);
  const handleDelete = (slamId:any) => {
    console.log('deleted-slam', slamId);
    const filteredItems = sampleSlams.filter((item) => item.id !== slamId);
    setSampleSlams(filteredItems);
    return filteredItems;
  };

  return (
    <section className="" role="dialog">
      <div className="grid grid-cols-3 gap-4">
        {sampleSlams?.map((item) => (
          <div
            key={item?.id}
            className="outline flex justify-between flex-col gap-3 rounded-md p-2"
          >
            <h1 className="text-[1.2rem] font-semibold">{item?.title}</h1>
            <p className="text-[.95rem]">{item?.description}</p>
            <div className="flex items-center gap-3">
              <RiDeleteBin6Fill
                onClick={() => handleDelete(item?.id)}
                size={25}
                color="red"
                className="cursor-pointer"
              />
              <FaEdit size={25} color="yellow" className="cursor-pointer" />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
