import React, { useMemo } from 'react';
import { Plan } from 'types';
import { classes } from 'utils';

interface Props {
  planOption: Plan;
  selected: Plan | undefined;
}

function PlanDetails({ planOption, selected: plan }: Props) {
  const planPrice = useMemo(() => {
    switch (planOption) {
      case 'standard':
        return 24;
      case 'business':
        return 48;

      default:
        return 0;
    }
  }, [planOption]);

  return (
    <div className="">
      {planOption === 'standard' && (
        <div
          className={classes(
            'text-black uppercase top-[-1px] h-5 right-0 bg-white text-center rounded-bl-[31px] rounded-tr-3xl w-[56px] absolute text-[8px] font-medium flex justify-center items-center',
            plan === planOption && 'bg-black text-white'
          )}
        >
          POPULAR
        </div>
      )}
      <div className="capitalize  text-start bg-[linear-gradient(0deg,_var(--tw-gradient-stops))] from-[#8D74F7_3%] via-[#D285F7_45%] to-[#FFAD97_95%] bg-clip-text text-transparent">
        {planOption}
      </div>

      <div className="capitalize flex text-start ">
        $<div className="text-[32px] py-[10px] ml-[2px]">{planPrice}</div>
        <div className="text-xs !self-center ml-[2px] lowercase">/mo</div>
      </div>
      <div
        className={classes(
          'text-start text-sm mt-1',
          plan === planOption ? 'text-[#3B3D4E]' : 'text-[#B2B3B8]'
        )}
      >
        Lorem ipsum dolor si amet consectetur.
      </div>
    </div>
  );
}

export default PlanDetails;
