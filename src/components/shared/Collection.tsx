import { IEvent } from '@/lib/database/models/event.model'
import React from 'react'
import Card from './Card'

type CollectionProps = {
  data: IEvent[],
  emptyTitle: string,
  emptyDStatusSubtext: string,
  limit: number,
  page: number | string,
  totalPages: number,
  urlParemName?: string,
  collectionType: 'All_Events' | 'My_Tickets' | 'Event_Organized'
}

function Collection(
  { data, emptyTitle, emptyDStatusSubtext, collectionType, limit, page, totalPages, urlParemName }
    : CollectionProps
) {
  return (
    <>
      {data.length > 0 ? (
        <div className=' flex flex-col items-center gap-10 mt-10'>
          <ul className='grid w-full grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-10'>

            {data.map((event) => {

              const hasOrderLink = collectionType === 'Event_Organized';
              const hidePrice = collectionType === 'My_Tickets';
              return (
                <li key={event._id} className="flex justify-center">
                  <Card event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice} />
                </li>
              )
            })}
          </ul>
        </div>
      ) :
        (
          <div className=' flex w-full justify-center items-center flex-col gap-4 bg-slate-400/10 p-16 mt-10 rounded-lg'>
            <h3 className=' font-bold text-2xl text-slate-500'>{emptyTitle}</h3>
            <p className=' text-sm'>{emptyDStatusSubtext}</p>
          </div>
        )}
    </>
  )
}

export default Collection