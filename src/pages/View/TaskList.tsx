import { Link } from 'react-router-dom';
import { Skeleton, ViewIcon } from 'components';
import { useView } from 'contexts';
import { usePageFilter } from 'hooks/usePageFilter';
import { classes, pathTo, statusColor } from 'utils';
import { isJSONString } from 'utils/isJSONString';

function TaskRow({
  taskId,
  state,
  lastCycle,
  network,
}: {
  taskId: number;
  state: string;
  network: string;
  lastCycle: string;
}) {
  return (
    <div className="grid lg:grid-cols-[25%_25%_25%_25%] md:grid-cols-[100%] grid-cols-[100%] lg:h-[60px] md:h-full h-full bg-[#0E0E0E] items-center rounded-2xl mb-2 lg:px-2 md:px-4 px-4 lg:pl-5 md:py-[14px] py-[14px]  w-full ">
      <div className="lg:pt-0 md:pt-3 pt-3 flex items-center gap-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[113px] h-4">
          <div className="lg:hidden flex text-xs text-[#B2B3B8]">Task ID:</div>
          <Link
            to={`${import.meta.env.VITE_EXPLORER_FE_URL}/#/task/${taskId}`}
            target="_blank"
            className="text-[#B15EBE]"
          >
            {taskId}
          </Link>
        </Skeleton.Loader>
      </div>
      <div className="flex gap-2 justify-start items-center lg:pt-0 md:pt-[5px] pt-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[50px] h-4">
          <div className="lg:hidden flex text-xs text-[#B2B3B8]">Status:</div>
          <div
            className={classes(
              `rounded-3xl py-[2px] px-[7px] inline-flex text-ellipsis overflow-hidden whitespace-nowrap`,
              statusColor(isJSONString(state) ? 'failed' : state)
            )}
          >
            <span className="text-[10px] rounded-3xl uppercase leading-[18px] text-ellipsis overflow-hidden whitespace-nowrap">
              {isJSONString(state) ? 'failed' : state}
            </span>
          </div>
        </Skeleton.Loader>
      </div>
      <div className="lg:pt-0 md:pt-[5px] pt-[5px] flex items-center gap-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[63px] h-4">
          <div className="lg:hidden flex text-xs text-[#B2B3B8]">Cycle:</div>
          {lastCycle}
        </Skeleton.Loader>
      </div>
      <div className="lg:pt-0 md:pt-[5px] pt-[5px] flex items-center gap-[5px] text-sm">
        <Skeleton.Loader isDarkTheme className="w-[63px] h-4">
          <div className="lg:hidden flex text-xs text-[#B2B3B8]">Network:</div>
          <div className="h-6 w-6 flex items-center justify-center rounded-full bg-[#343434]">
            <img src={`/logos/chain/${network?.toLowerCase()}.svg`} alt={network} />
          </div>
          {network}
        </Skeleton.Loader>
      </div>
    </div>
  );
}

export function TaskLists() {
  const { resource } = useView();
  // @ts-ignore
  const { controller, currentPage } = usePageFilter(resource?.tasks);

  // @ts-ignore
  return resource?.tasks?.length !== 0 ? (
    <div className="card mb-6 sm:p-6  p-0 rounded-3xl lg:!border lg:!border-solid !border-[#1F1F1F] !border-none  bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]">
      <div className="lg:block md:hidden hidden">
        <div className="grid grid-cols-[25%_25%_25%_25%] text-white text-xs lg:px-2 md:px-4 px-4 lg:pl-5 ">
          <Skeleton.Loader isDarkTheme className="w-[81px] h-3 !rounded-full">
            <div>Task ID</div>
          </Skeleton.Loader>
          <Skeleton.Loader isDarkTheme className="w-[81px] h-3 !rounded-full">
            <div>Status</div>
          </Skeleton.Loader>
          <Skeleton.Loader isDarkTheme className="w-[81px] h-3 !rounded-full">
            <div>Cycle</div>
          </Skeleton.Loader>
          <Skeleton.Loader isDarkTheme className="w-20 h-3">
            <div>Network</div>
          </Skeleton.Loader>
        </div>
      </div>
      <div className="text-white lg:pt-[10px] md:pt-[0px] pt-0">
        {/* @ts-ignore */}
        {currentPage.map(({ id, state, cycle, definition }) => (
          <TaskRow
            key={id}
            taskId={id as number}
            state={state}
            lastCycle={cycle as string}
            network={definition?.network as string}
          />
        ))}
      </div>
      {controller}
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center pb-6">
      <div className="relative w-full py-[81px] justify-center items-center inline-flex flex-col text-center text-white border border-solid rounded-[20px] border-[#1F1F1F] bg-gradient-to-b from-[#000_20.37%] to-[#000_79.34%]">
        <div className="relative mb-4 lg:h-[108px] h-full w-full lg:w-[108px] overflow-hidden">
          <div className="absolute top-2/4 left-2/4  rounded-[59px] bg-[linear-gradient(287deg,_var(--tw-gradient-stops))] from-[#342B49_3%] via-[#342238_45%] to-[#533838_95%] filter blur-[35px] h-1/2 w-20 -translate-y-2/4 -translate-x-2/4"></div>
          <ViewIcon
            className={classes(
              'relative lg:h-[108px] md:w-[108px] lg:min-h-fit min-h-[108px] p-6 w-full bg-[#d3cccc14] md:rounded-lg rounded-[20px]'
            )}
          />
        </div>
        <div className="text-xl mb-3 text-center">
          <Skeleton.Loader className="w-[440px]">
            {"You don't have any Funded Views"}
          </Skeleton.Loader>
        </div>

        <div className="text-sm mb-3 text-[#B2B3B8]">
          <Skeleton.Loader className="w-50">Build a view to get started.</Skeleton.Loader>
        </div>
        <Skeleton.Loader className="h-12 sm:w-48">
          <Link
            className="flex items-center justify-center font-normal text-base text-black bg-white px-4 h-[40px] rounded-full  text-center normal-case m-0 w-full lg:w-auto"
            to={pathTo('ViewBuilder')}
          >
            View Builder
          </Link>
        </Skeleton.Loader>
      </div>
    </div>
  );
}
