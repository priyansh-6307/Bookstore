import React from 'react'
import { Link } from 'react-router-dom'

const Mobilenav = () => {
  return (
    <div className='w-full lg:hidden flex items-center justify-between '><Link to="/profile"
    className=' text-lg font-semibold w-full py-2 text-center rounded hover:text-zinc-800 hover:bg-white transition-all duration-300'>
    Favourites
    </Link>
    <Link to="/profile/orderHistory"
    className='text-lg font-semibold w-full py-2 text-center rounded hover:text-zinc-800 hover:bg-white transition-all duration-300'>
    Order history
    </Link>
    <Link to="/profile/settings"
    className='text-lg font-semibold w-full py-2 text-center rounded hover:text-zinc-800 hover:bg-white transition-all duration-300'>
    Settings
    </Link></div>
  )
}

export default Mobilenav;