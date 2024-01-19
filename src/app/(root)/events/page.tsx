import Collection from '@/components/shared/Collection'
import { getAllEvent } from '@/lib/actions/event.actions'
import React from 'react'

async function page() {
    const events = await getAllEvent({
        query: '',
        page: 1,
        category: '',
        limit: 0
    })
    return (
        <>
            <section className='flex flex-col gap-6'>
                <h3 className=' font-bold text-4xl md:text-left text-center p-5 py-10 md:px-10 xl:px-0 bg-dotted-pattern bg-slate-50'>Browse All Events</h3>
                <div className='wrapper '>
                    <Collection
                    data={events?.data}
                    emptyTitle="No Event Found"
                    emptyDStatusSubtext='Come back later'
                    collectionType='All_Events'
                    limit={6}
                    page={1}
                    totalPages={2}
                />
                </div>
                
            </section>
        </>
    )
}

export default page