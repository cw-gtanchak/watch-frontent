import { Link } from 'react-router-dom';
import { ArrowRightIcon, Button, Image } from 'components';
import { pathTo } from 'utils';

export function NotFound() {
  return (
    <div className="bg-[#010101] w-screen h-screen flex justify-center items-center">
      <div className="flex items-center justify-center bg-[#010101] bg-no-repeat bg-contain md:bg-cover bg-[url('/404-background.svg')] w-[calc(100%-48px)] h-[calc(100vh-24px)] bg-top   md:bg-center mx-auto mt-6 rounded-t-3xl ">
        <div className="text-white flex flex-col items-center mx-8">
          <Image src="/not-found.svg" className="mb-8 md:w-[274px] w-[200px]" />
          <h1 className="mb-4 md:text-4xl text-[28px] text-center normal-case">
            404 Page not found
          </h1>
          <div className="mb-5 text-center text-[#FFFFFF99] md:w-[700px] md:text-2x text-[18px]">
            The Page you are looking for doesn't exist or an other error occurred. Go back, or head
            over to analogwatch.one to choose a new direction.
          </div>
          <Link to={pathTo('Library')}>
            <div className="text-lg flex">
              Go Home Page <ArrowRightIcon className="ml-1 w-5" />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
