import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs'
import React from 'react'

function UpdateEvent() {

    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;

    return (
        <>
        <section className=' bg-primary-50 bg-dotted-pattern bg-cover'>
            <h3 className='wrapper text-[2rem] font-bold text-center sm:text-left'>
            Update Event
            </h3>
        </section>
        <div className='wrapper'>
                <EventForm userId={userId} type = "update"/>
        </div>
        </>
    )
}

export default UpdateEvent