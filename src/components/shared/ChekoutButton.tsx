'use client'

import { IEvent } from '@/lib/database/models/event.model'
import { SignedIn, SignedOut, useUser } from '@clerk/nextjs';
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import ChekOut from './ChekOut';

function ChekoutButton({ event }: { event: IEvent }) {

    const { user } = useUser();
    const userId = user?.publicMetadata.userId as string;
    const hasEventEnded = new Date(event.endDateTime) < new Date();

    return (
        <div className='flex items-center gap-4 capitalize'>
            {hasEventEnded ? (
                <p className=' text-red-400 p-4'>sorry, tickits are no longer available</p>
            ) : (
                    <>
                        <SignedOut>
                            <Button asChild>
                                <Link href="sign-in">
                                    get ticket
                                </Link>
                            </Button>
                        </SignedOut>
                        <SignedIn>
                            <ChekOut event={event} userId={userId} />
                        </SignedIn>
                    </>
            )}
        </div>
    )
}

export default ChekoutButton