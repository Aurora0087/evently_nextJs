import EventForm from '@/components/shared/EventForm'
import { getEventById } from '@/lib/actions/event.actions';
import { SearchParamProps } from '@/types';
import { auth } from '@clerk/nextjs'
import React from 'react'

type UpdateParamProps = {
    params: {
        id: string
    },
}

async function UpdateEvent({params:{id}}: UpdateParamProps) {

    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;

    const event = await getEventById(id);

    return (
        <>
        <section className=' bg-primary-50 bg-dotted-pattern bg-cover'>
            <h3 className='wrapper text-[2rem] font-bold text-center'>
            Update Event
            </h3>
        </section>
        <div className='wrapper'>
                <EventForm event={event} eventId={event._id} userId={userId} type = "update"/>
        </div>
        </>
    )
}

export default UpdateEvent