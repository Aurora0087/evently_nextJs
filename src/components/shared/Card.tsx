import { IEvent } from '@/lib/database/models/event.model'
import { formatDateTime } from '@/lib/utils'
import { auth } from '@clerk/nextjs'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import DeleteConfig from './DeleteConfig'

type CardProps = {
    event: IEvent,
    hidePrice?: boolean,
    hasOrderLink?: boolean
}

function Card({ event, hidePrice, hasOrderLink }
    : CardProps) {

    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;

    const isEventCreator = userId === event.organizer._id.toString()
    return (
        <div className='group relative flex min-h-[380px] w-full max-w-[480px] flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all hover:shadow-lg md:min-h-[438px]'>
            <Link
                href={`/events/${event._id}`}
                style={{ backgroundImage: `url(${event.imageUrl})` }}
                className='flex flex-grow items-center justify-center bg-gray-50 bg-cover text-gray-600'
            />
            {isEventCreator && !hidePrice && (
                <div className=' absolute top-2 right-2 p-2 bg-slate-800/80 flex gap-2 rounded-full'>
                    <Link href={`/events/${event._id}/update`}>
                        <Image
                            src="/assets/icons/edit.svg"
                            alt='edit'
                            width={20}
                            height={20}
                        />
                    </Link>
                    <DeleteConfig eventId={event._id} />
                </div>
            )}
            <Link
                href={`/events/${event._id}`}
                className='flex min-h-[230px] flex-col gap-3 p-6 md:gap-4
                '
            >
                {!hidePrice && <div className='flex gap-2 items-center'>
                    <span className=' bg-green-400/10 p-4 py-1 rounded-full text-green-600'>
                        {event.isFree ? 'Free' : `₹${event.price}`}
                    </span>
                    <p className=' font-semibold p-4 py-1 rounded-full bg-slate-900/5 text-slate-500 line-clamp-1'>
                        {event.category.name}
                    </p>
                </div>}
                <p className=' w-fit p-4 py-1 rounded-full bg-slate-900/5 text-slate-500'>
                    {formatDateTime(event.startDateTime).dateTime}
                </p>
                <p className='px-2 font-semibold text-xl line-clamp-2 w-fit'>
                    {event.title}
                </p>
                <div className='px-2 flex justify-between w-full text-slate-500'>
                    <p>
                        {event.organizer.firstName + ` `}{event.organizer.lastName}
                    </p>
                    {/*hasOrderLink && (
                        <Link href={`/orders?eventId=${event._id}`} className="flex gap-2">
                            <p className="text-primary-500">Order Details</p>
                            <Image src="/assets/icons/arrow.svg" alt="search" width={10} height={10} />
                        </Link>
                    )*/}
                </div>
            </Link>
        </div>
    )
}

export default Card