import { Switch } from '@headlessui/react';
import { ClassNames } from 'types';
import { classes } from 'utils';

interface Props$SwitchComponent {
  label: string;
  enabled: boolean;
  setEnabled: (checked: boolean) => void;
  classNames?: ClassNames<'label'>;
}

const SwitchComponent = ({ label, enabled, classNames, setEnabled }: Props$SwitchComponent) => {
  return (
    <Switch.Group>
      <div className="flex items-center">
        <Switch.Label className={classes('mr-2 text-[#767676] text-sm', classNames?.label)}>
          {label}
        </Switch.Label>
        <Switch
          checked={enabled}
          onChange={setEnabled}
          className="bg-white relative inline-flex h-6 w-11 items-center p-0.5"
        >
          <div
            className={`${
              enabled ? 'translate-x-5  border-[#524FEF]' : 'translate-x-0  border-[#666666]'
            }  h-5 w-5 transform transition border p-[1px]`}
          >
            <div className={`${enabled ? 'bg-[#524FEF] ' : 'bg-[#666666]'} h-4 w-4 `} />
          </div>
        </Switch>
      </div>
    </Switch.Group>
  );
};

export { SwitchComponent as Switch };
