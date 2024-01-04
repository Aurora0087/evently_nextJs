'use client'

import React from 'react'
import { headerLinks } from '../../constants'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export const Navitems = () => {
  const pathName = usePathname();

  return (
    <ul className=' md:flex-between md:flex-row flex gap-6 flex-col w-full'>
      {headerLinks.map((links) => {
        const isActive = pathName == links.route;
        return (
          <li
            key={links.label}
            className={`${isActive && 'text-primary'}`}
          >
            <Link href={links.route}>
              {links.label}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
