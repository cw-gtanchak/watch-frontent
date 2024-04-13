import { Json } from 'components';
import { Skeleton, useSkeleton } from '../../components/Skeleton';

export function ContractAbi({ abi, isLoading }: { abi: string; isLoading?: boolean }) {
  return isLoading ? (
    <div>
      <Skeleton.Loader isDarkTheme className="w-4 h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="w-4 h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="ml-5 w-[139px] h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="ml-5 w-[139px] h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="ml-5 w-[65px] h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="ml-5 w-[65px] h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="ml-5 w-[67px] h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="ml-5 w-4 h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="ml-10 w-[103px] h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="ml-10 w-[143px] h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="ml-10 w-[103px] h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="w-full h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="w-full h-[15px] !rounded-full" />
      <Skeleton.Loader isDarkTheme className="w-full h-[15px] !rounded-full" />
    </div>
  ) : (
    <Json
      className="py-0 px-0 overflow-y-auto bg-black max-h-[390px] overflow-auto scrollbar-white text-sm font-normal text-[#B2B3B8]"
      value={abi}
    />
  );
}
