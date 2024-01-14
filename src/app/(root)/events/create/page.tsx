import EventForm from '@/components/shared/EventForm'
import { auth } from '@clerk/nextjs'
import React from 'react'

function CreateEvent() {

    const { sessionClaims } = auth();

    const userId = sessionClaims?.userId as string;

    return (
        <>
        <section className=' bg-primary-50 bg-dotted-pattern bg-cover'>
            <h3 className='wrapper text-[2rem] font-bold text-center sm:text-left'>
                Create Event
            </h3>
        </section>
        <div className='wrapper'>
                <EventForm userId={userId} type = "create"/>
        </div>
        </>
    )
}

export default CreateEvent