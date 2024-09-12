import { FC } from 'react'
import { Link } from 'react-router-dom'
import video from '../../../../assets/video/sneaker-review.mp4';

export const Herobanner: FC = () => {

  return (
    <div className="relative bg-transparent h-screen">
      {/* Sneaker Background */}
      <video 
        className="absolute inset-0 w-full h-screen object-cover opacity-80" 
        autoPlay 
        muted 
        loop 
        aria-hidden="true"
      >
        <source src={video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
        >
          <div
          />
        </div>
        <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 relative z-10">
          <div className="hidden sm:mb-8 sm:flex sm:justify-center">
            <div className="relative rounded-full px-3 py-1 text-sm leading-6 text-white ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Check out our latest sneaker drops!{' '}
              <Link to={'/shop/men'} className="font-semibold text-orange-600">
                <span aria-hidden="true" className="absolute inset-0" />
                Explore now <span aria-hidden="true">&rarr;</span>
              </Link>
            </div>
          </div>
          <div className="text-center">
            <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
              Welcome to KicksFactory
            </h1>
            <p className="mt-6 text-lg leading-8 text-white">
              Discover the latest sneaker trends. From timeless classics to cutting-edge designs, find the perfect pair to elevate your sneaker game.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6">
              <Link
                to={'/shop/men'}
                className="rounded-md bg-orange-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
              >
                Shop Now
              </Link>
              <Link to={'/shop/men'} className="text-sm font-semibold leading-6 text-white">
                View Collections <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
        >
        </div>
      </div>
    </div>
  )
}