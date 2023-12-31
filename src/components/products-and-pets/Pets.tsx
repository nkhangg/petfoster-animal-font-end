import React, {ReactNode} from 'react';
import {ContainerContent} from '../common';
import {IPet} from '@/configs/interface';
import {MainButton, Pagination, Pet} from '..';
import classNames from 'classnames';

type bottomStyle = 'load-more' | 'pagination';

export interface IPetsProps {
   data: IPet[];
   heading?: ReactNode;
   bottom?: bottomStyle;
   background?: string;
}

export default function Pets({
   data,
   heading,
   bottom = 'load-more',
   background = 'bg-[#F5FAFF]',
}: IPetsProps) {
   return (
      <ContainerContent
         classNameContainer={classNames('pt-14', {
            [background]: true,
         })}
      >
         {heading ? (
            heading
         ) : (
            <h2 className='text-black-main text-center pb-[48px] text-4xl font-semibold'>
               RECENTLY FOSTER
            </h2>
         )}

         <div className='w-full grid md:grid-cols-3 lg:grid-cols-4 gap-[20px] gap-y-9'>
            {data.map((pet) => {
               return <Pet key={pet.id} data={pet} />;
            })}
         </div>
         {bottom === 'load-more' && (
            <div className='flex items-center justify-center w-full'>
               <MainButton title='load more' className='my-11' />
            </div>
         )}

         {bottom === 'pagination' && <Pagination pages={10} />}
      </ContainerContent>
   );
}
