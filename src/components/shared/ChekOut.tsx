
import React, { useEffect } from 'react'
import { Button } from '../ui/button'
import { IEvent } from '@/lib/database/models/event.model'

import { loadStripe } from '@stripe/stripe-js';
import { chekOutOrder } from '@/lib/actions/order.action';

loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
);

function ChekOut({ event, userId }: { event: IEvent, userId: string }) {

    useEffect(() => {
        
        const query = new URLSearchParams(window.location.search);
        if (query.get('success')) {
            console.log('Order placed! You will receive an email confirmation.');
        }
        if (query.get('canceled')) {
            console.log('Order canceled -- continue to shop around and checkout when you’re ready.');
        }
    }, []);

    const onChekOut = async () => {
        const order = {
            eventTitle: event.title,
            eventId: event._id,
            price: event.price,
            isFree: event.isFree,
            buyerId: userId,
        }

        await chekOutOrder(order);
    }
    return (
        <form action={onChekOut}>
            <Button type='submit' role='link' className=' capitalize'>
                {event.isFree ? (
                    <span>get ticket</span>
                ) : (
                    <span>
                        buy ticket
                    </span>
                )}
            </Button>
        </form>
    )
}

export default ChekOut