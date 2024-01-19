import Collection from '@/components/shared/Collection'
import { Button } from '@/components/ui/button'
import { getEventByUser } from '@/lib/actions/event.actions'
import { auth } from '@clerk/nextjs'
import Link from 'next/link'
import React from 'react'

async function page() {

    const { sessionClaims } = auth();
    const userId = sessionClaims?.userId as string

    const organizedEvents = await getEventByUser({userId, page :1})
    return (
        <>
            <section className=' py-6 md:py-10 bg-dotted-pattern bg-slate-50 bg-cover'>
                <div className='wrapper flex items-center sm:justify-between justify-center'>
                    <h3 className=' font-bold text-4xl text-center'>
                        My Tickets
                    </h3>
                    <Button asChild className=' hidden sm:flex'>
                        <Link href="/events">Explore More Event</Link>
                    </Button>
                </div>
            </section>
            <section className=' p-6 md:py-10'>
                <Collection
                    data={[]}
                    emptyTitle="No Tickets Purchased Yet"
                    emptyDStatusSubtext='plenty of exciting events to explore'
                    collectionType='My_Tickets'
                    limit={6}
                    page={1}
                    totalPages={2}
                />
            </section>
            <section className=' py-6 md:py-10 bg-dotted-pattern bg-slate-50 bg-cover'>
                <div className='wrapper flex items-center sm:justify-between justify-center'>
                    <h3 className=' font-bold text-4xl text-center'>
                        Events Organized
                    </h3>
                    <Button asChild className=' hidden sm:flex'>
                        <Link href="/events/create">Create New Event</Link>
                    </Button>
                </div>
            </section>
            <section className=' p-6 md:px-10'>
                <Collection
                    data={organizedEvents?.data}
                    emptyTitle="No Event Organized Yet"
                    emptyDStatusSubtext=''
                    collectionType='Event_Organized'
                    limit={6}
                    page={1}
                    totalPages={2}
                />
            </section>
        </>
    )
}

export default page