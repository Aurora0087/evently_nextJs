import { getEventById } from '@/lib/actions/event.actions'
import { formatDateTime } from '@/lib/utils'
import { SearchParamProps } from '@/types'
import Image from 'next/image'
import React from 'react'

const EventDetails = async ({ params: { id }}:SearchParamProps) => {

    const event = await getEventById(id)
    
    return (
        <section className=' w-screen overflow-hidden p-6 md:p-10 flex flex-col items-center'>
            <div className='grid grid-cols-1 gap-4 w-full overflow-hidden md:grid-cols-2'>
                <div className=' overflow-hidden w-full h-fit rounded-lg object-cover'>
                    <Image
                    src={event.imageUrl}
                    alt='event Image'
                    width={1000}
                    height={1000}
                    className=' w-full  transition-all hover:scale-105'
                />
                </div>
                
                <div className='flex flex-col gap-6 p-6 md:p-10 text-black'>
                    <div className='flex flex-col gap-6'>
                        <h2 className=' text-4xl font-bold'>
                            {event.title}
                        </h2>
                        <div className='flex flex-col sm:flex-row sm:items-center gap-3'>
                            <p className=' px-4 py-1 font-semibold bg-green-500/10 text-green-700 rounded-full w-fit'>
                                {event.isfree ? 'FREE' : `₹${event.price}`}
                            </p>
                            <p className='px-4 py-1 font-semibold bg-gray-500/10 rounded-full text-gray-500 w-fit'>
                                {event.category.name}
                            </p>
                        </div>
                        <p className='px-4 py-1'>
                            by{` `}
                            <span className=' text-primary-500'>
                                {event.organizer.firstName}{` `}{event.organizer.lastName}
                            </span>
                        </p>
                    </div>
                    {/*chekout button */}
                    <div className='flex flex-col gap-6 '>
                        <div className='flex gap-2 md:gap-3 items-center px-4 py-1 rounded-full bg-slate-500/5'>
                            <Image
                                src='/assets/icons/calendar.svg'
                                alt='calender'
                                width={32}
                                height={32}
                            />
                            <p>
                                {formatDateTime(event.startDateTime).dateOnly}
                            </p>
                            <p>
                                {` - `}{formatDateTime(event.endDateTime).dateOnly}
                            </p>
                        </div>
                        <div className='flex gap-2 md:gap-3 items-center px-4 py-1 rounded-full bg-slate-500/5'>
                        <Image
                                src='/assets/icons/location.svg'
                                alt='calender'
                                width={32}
                                height={32}
                            />
                            <p>
                                {event.location}
                            </p>
                        </div>
                        <div className='rounded-lg bg-slate-500/5 flex flex-col gap-4'>
                            <p className='p-4'>
                                {event.description}
                            </p>
                            <a className='text-primary-500 truncate p-4 w-fit'
                            href={event.url}>
                                {event.url}
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default EventDetails