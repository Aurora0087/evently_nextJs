import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <>
      <section className='capitalize bg-dotted-pattern py-5 md:py-10'>
        <div className='wrapper grid grid-cols-1 gap-6 md:grid-cols-2'>
          <div className=' flex justify-center flex-col gap-8 '>
            <h1 className=' font-bold text-[40px] '>host, connect, celebrate: your event, our platform!</h1>
            <p >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit, quam officia cupiditate eaque velit provident omnis labore aperiam quasi eveniet.</p>
              <Link className=' w-fit' href='#events'>
                <Button>
                Explore now
                </Button>
              </Link>
          </div>
          <Image
            src='/assets/images/hero.png'
            alt='Hero image'
            width={500}
            height={500}
          />
        </div>
      </section>
      <section id='events' className='wrapper capitalize'>
        <h2 className='text-[32px] font-bold'>trust by <br /> thousand of event</h2>
        <div className=' flex w-full flex-col gap-6 md:flex-row'>
          search catagoryFilter
        </div>
      </section>
    </>
  )
}
