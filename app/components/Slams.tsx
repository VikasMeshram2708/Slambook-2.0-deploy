import UserContext, { InitialSlamsType } from '@/context/UserContext';
import React, { useContext } from 'react';
import { FaEdit } from 'react-icons/fa';
import { RiDeleteBin6Fill } from 'react-icons/ri';

// type SampleSlamType = {
//   props: {
//     id: number;
//     title: string;
//     description: string;
//   };
// };
export default function Slams({ initialSlams }: any) {
  // @ts-ignore
  const { handleDelete } = useContext(UserContext);
  //   const [sampleSlams, setSampleSlams] = useState(initialSlams);

  //   const handleDelete = (slamId: any) => {
  //     console.log('deleted-slam', slamId);
  //     const filteredItems = sampleSlams.filter((item) => item.id !== slamId);
  //     setSampleSlams(filteredItems);
  //     return filteredItems;
  //   };

  return (
    <section className="" role="dialog">
      <div className="grid grid-cols-3 gap-4">
        {initialSlams?.map((item: InitialSlamsType) => (
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
              <FaEdit
                // onClick={() => handleEdit(item?.id)}
                size={25}
                color="yellow"
                className="cursor-pointer"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
