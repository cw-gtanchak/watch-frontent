import { Link } from 'react-router-dom';
import { Button } from './Button';
import { Image } from './Image';
import { Modal, ModalProps } from './Modal';
import { classes } from 'utils';
import { StarGroup } from './svg';

interface Props extends ModalProps {
  submitTo: string;
  labels: {
    header?: string;
    text: string;
    button: string;
  };
  isModal?: boolean;
  renderContent?: React.ReactElement;
}

export function DeploySuccess({
  labels,
  isOpen,
  setIsOpen,
  isDarkTheme,
  isModal = true,
  submitTo,
  renderContent,
}: Props) {
  const content = (
    <>
      {!isDarkTheme ? <Image src="/deploy-success.png" className="w-[200px]" /> : <StarGroup />}
      <div>
        {isDarkTheme ? (
          <p className="text-2xl mt-4">{labels.header || 'Congratulations!'}</p>
        ) : (
          <h4>{labels.header || 'Congratulations!'}</h4>
        )}
        <div
          className={classes('mt-1 text-sm text-neutral-500', isDarkTheme && 'mt-3 text-[#B2B3B8]')}
        >
          {labels.text}
        </div>
      </div>
      {renderContent}
      <Link to={submitTo} className="!mt-0">
        <Button
          className={classes(
            'w-full',
            isDarkTheme && 'px-5 rounded-full h-12 mx-auto block mt-5 text-black text-base bg-white'
          )}
          onClick={() => {
            if (setIsOpen) setIsOpen(false);
          }}
          variant={isDarkTheme ? 'plain' : 'primary'}
        >
          {labels.button}
        </Button>
      </Link>
    </>
  );

  if (isModal) {
    return (
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        classNames={{
          base: 'w-[560px]',
          content: 'space-between flex flex-col items-center justify-between space-y-2 text-center',
        }}
        isDarkTheme={isDarkTheme}
      >
        {content}
      </Modal>
    );
  }

  return (
    <div className="space-between flex flex-col items-center justify-between space-y-2 text-center pt-8">
      {content}
    </div>
  );
}
