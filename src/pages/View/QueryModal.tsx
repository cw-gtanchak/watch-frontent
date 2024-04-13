import { Button, Modal, ModalProps } from 'components';
import { DOCS } from 'consts';
import { Setter } from 'types';
import { classes } from 'utils';

interface Props extends ModalProps {
  isOpen: boolean;
  setIsOpen?: Setter<boolean>;
}

export function QueryModal({ isOpen, setIsOpen }: Props) {
  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      isDarkTheme
      className={classes('w-full max-w-md')}
      classNames={{
        base: 'py-7 px-8 !max-w-[560px] font-["Neue_Montreal"]',
        content: 'justify-start items-start',
        close: 'top-6 right-5 bg-transparent max-[400px]:top-[10px] max-[400px]:right-[10px]',
      }}
    >
      <h4 className="sm:text-2xl text-xl sm:leading-8 leading-6 font-normal normal-case sm:mb-2 mb-[6px]">
        Ready to start querying?
      </h4>
      <p className="text-sm leading-5 text-[#B2B3B8] mb-4">
        The Watch SDK is a versatile and unified developer toolkit to query Views. Here’s a
        breakdown of the steps involved when querying Views via the SDK
      </p>
      <iframe
        src="https://www.youtube-nocookie.com/embed/Vpqvl12ILGw?start=1227"
        title="Watch SDK Demo"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowFullScreen
        className="w-full sm:h-[279px] h-[200px] sm:mb-4 mb-2"
      ></iframe>
      <p className="text-sm leading-5 text-[#B2B3B8] sm:mb-6 mb-5">
        Learn more about querying Views by following the detailed guides in the docs.
      </p>
      <Button
        variant="darkThemeFilled"
        className="self-center"
        onClick={() =>
          window.open(`${DOCS}/developers/analog-watch/developers-guide/querying-data`, '_blank')
        }
      >
        Learn More
      </Button>
    </Modal>
  );
}

export default QueryModal;
