import { ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { InputTags } from './InputTags';
import {
  Button,
  CheckBox,
  CheckIcon,
  Error,
  Form,
  GradientCircle,
  Input,
  Loader,
  Modal,
  ModalProps,
  PlusGradientIcon,
  QuestionIcon,
  UsecaseIcon,
} from 'components';
import { classes } from 'utils';
import { HTMLAttributes, VoidFn } from 'types';
import { UseEditMetadata } from 'hooks';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { Tooltip } from '@mui/material';

interface Props extends HTMLAttributes<HTMLDivElement>, ModalProps, UseEditMetadata {
  foo?: 'bar';
  isLoading?: boolean;
  onSubmit: VoidFn;
  link?: string;
  labels: {
    title: string;
    nameLabel: string;
    namePlaceholder: string;
    tagLabel?: string;
    tagPlaceholder?: string;
    descriptionLabel: string;
    descriptionPlaceholder: string;
    submitButton: string;
    helpLabel?: JSX.Element | string;
    error?: ReactNode;
  };
}

export function EditMetadata({
  isLoading,
  labels,
  isOpen,
  setIsOpen,
  name,
  link,
  setName,
  description,
  setDescription,
  useCases,
  setUseCases,
  useCasesOption,
  setUseCasesOption,
  submitForGame,
  setSubmitForGame,
  onSubmit,
  isValid,
  ...editTags
}: Props) {
  const [step, setStep] = useState(1);
  const [newUsecase, setNewUsecase] = useState('');
  const [searchString, setSearchString] = useState('');
  const [isError, setIsError] = useState(false);
  const filteredUsecases = useMemo(
    () => useCasesOption.filter((item) => item?.includes(searchString)),
    [useCasesOption, searchString]
  );

  const handleSelect = useCallback(
    (name: string) => {
      if (useCases.includes(name)) {
        setUseCases((prev) => prev.filter((item) => item !== name));
      } else if (useCases.length < 10) {
        setUseCases((prev) => [...prev, name]);
      }
    },
    [useCases]
  );

  useEffect(() => {
    if (labels.error) setIsError(true);
  }, [labels.error]);

  useEffect(() => {
    editTags.resetTags();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, editTags.resetTags]);

  useEffect(() => {
    newUsecase && setNewUsecase('');
    if (step == 1 && isError) {
      setIsError(false);
    }
  }, [step]);

  const formContent = useMemo(() => {
    switch (step) {
      case 1:
        return (
          <div className="py-6 sm:px-6 px-4 border border-x-0 border-solid border-[#1C1C1C]">
            <div className="text-xl">{labels.title}</div>
            <div className="flex-1 mt-4">
              <label htmlFor="view-name" className="text-white text-sm">
                {labels.nameLabel}
              </label>
              <Input
                classNames={{ base: 'mt-2 h-12', input: 'pl-6' }}
                id={'view-name'}
                placeholder={labels.namePlaceholder}
                value={name}
                filter={/^[^a-zA-z]/}
                onChange={(text) => {
                  if (text.length < 31) setName(text);
                }}
                isDarkTheme
              />
              <div className="mb-4 mt-4">
                <label htmlFor="view-name" className="text-white text-sm">
                  {labels.tagLabel || 'Please Type Tags'}
                </label>
                <InputTags
                  classNames={{
                    base: 'h-12 !mt-2 pl-0',
                    options: '-left-0',
                    input: 'md:pl-6 pl-3',
                    tags: 'max-h-[58px] h-fit min-h-8 overflow-y-scroll scrollbar-white',
                    tag: 'normal-case',
                  }}
                  {...editTags}
                  placeholder={labels.tagPlaceholder}
                  withCreate
                  onFocus={() => {
                    editTags.setIsFocused(true);
                  }}
                  limit={20}
                />
              </div>
              <div>
                <label htmlFor="view-name" className="text-white text-sm">
                  {labels.descriptionLabel}
                </label>
                <Input
                  type="textarea"
                  className="relative mt-2 px-1.5 pl-6 py-[13px] h-[87px] rounded-2xl resize-none items-start pb-[22px]"
                  classNames={{
                    input: 'dark resize-none  scrollbar-white p-0 h-full break-all',
                  }}
                  placeholder={labels.descriptionPlaceholder}
                  value={description}
                  onChange={(text) => {
                    if (text.length <= 273) setDescription(text);
                  }}
                  isDarkTheme
                >
                  <div className="absolute right-[32px] bottom-[1px] w-[23px] h-4 text-xs leading-4 text-[#666666] ">
                    {description.length}/273
                  </div>
                </Input>
              </div>
            </div>
          </div>
        );
      case 2:
        return (
          <div className="py-6 sm:px-6 px-4 border border-x-0 border-solid border-[#1C1C1C]">
            <div className="text-xl">Add Use Cases for this View</div>
            {isError && labels.error && (
              <Error error={labels.error} className="mt-3 mb-0 bg-transparent" />
            )}
            <div className="flex flex-col mt-4 gap-2">
              <p className="text-xs text-[#808080]">{`Selected: ${useCases.length} / 10`}</p>
              <Input
                className="relative px-5"
                classNames={{ input: 'dark' }}
                isDarkTheme
                isClearable
                placeholder="Search names"
                value={searchString}
                onChange={setSearchString}
              >
                <MagnifyingGlassIcon className="absolute left-2 top-2 h-5 w-5 text-neutral-400" />
              </Input>
              <div className="flex flex-col gap-2 max-h-[180px] overflow-y-auto scrollbar-white">
                {filteredUsecases.map((option) => {
                  return (
                    <button
                      className={classes(
                        'flex items-center border border-solid border-[#1F1F1F] rounded-2xl p-[14px_16px] gap-3'
                      )}
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        option && handleSelect(option);
                      }}
                    >
                      <CheckBox
                        isChecked={useCases.includes(option)}
                        isDarkTheme
                        className="rounded-sm"
                      />
                      <div className="w-full flex gap-2 items-center">
                        <UsecaseIcon className="h-6 w-6 shrink-0" color="grey" />
                        <div className="break-words text-sm text-white break-all">{option}</div>
                      </div>
                    </button>
                  );
                })}
              </div>
              <Button
                variant="plain"
                classNames={{
                  base: 'h-[53px] border border-solid border-[#1F1F1F] rounded-2xl p-[14px]',
                  container: 'flex gap-1 justify-start',
                }}
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  setStep(3);
                }}
              >
                <PlusGradientIcon className="h-6 w-6" />
                <div className="text-sm bg-[linear-gradient(0deg,_#8D74F7_3%,_#D285F7_45%,_#FFAD97_95%)] bg-clip-text text-transparent">
                  Add new Use cases
                </div>
              </Button>
              <div className="flex items-center text-xs mt-[18px] gap-2">
                <CheckBox
                  isChecked={submitForGame}
                  isDarkTheme
                  className="rounded-sm"
                  onClick={() => setSubmitForGame((prev) => !prev)}
                />
                <div className="text-sm">
                  Submit for{' '}
                  <a
                    target="_blank"
                    className="bg-[linear-gradient(0deg,_#8D74F7_3%,_#D285F7_45%,_#FFAD97_95%)] bg-clip-text text-transparent cursor-pointer"
                    href="https://testnet.analog.one/"
                  >
                    Watch Game
                  </a>{' '}
                  shortlisting
                </div>{' '}
                <Tooltip
                  placement="top"
                  classes={{ tooltip: '!max-w-[360px]' }}
                  title={
                    <div className="text-sm font-['Neue_Montreal'] text-center text-[#F7F8F8] font-normal">
                      Checking this box means you're submitting your View for review to be
                      shortlisted in a Voting Session on the Watch Game. If your View meets the
                      guidelines, you'll stand the chance of earning rewards. Read more about our
                      incentivized testnet here.
                    </div>
                  }
                  arrow
                  children={
                    <div>
                      <QuestionIcon />
                    </div>
                  }
                />
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="py-6 sm:px-6 px-4 border border-x-0 border-solid border-[#1C1C1C]">
            <div className="text-xl">Add New Use Cases</div>
            <div className="flex-1 mt-4">
              <label htmlFor="usecase-name" className="text-white text-sm">
                Name of Use Case
              </label>
              <Input
                classNames={{ base: 'mt-2 h-12', input: 'pl-6' }}
                id={'usecase-name'}
                placeholder={'Please insert the name of use case'}
                value={newUsecase}
                filter={/^[^a-zA-z]/}
                onChange={(str) => {
                  if (str.length < 30) setNewUsecase(str);
                }}
                isDarkTheme
              />
            </div>
          </div>
        );
    }
  }, [step, { ...labels }, name, { ...editTags }, description, useCasesOption]);

  const handleSubmitActions = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      switch (step) {
        case 1:
          setStep((prev) => prev + 1);
          break;
        case 3:
          newUsecase.length &&
            setUseCasesOption((prev) => {
              if (!prev.includes(newUsecase)) {
                return [newUsecase, ...prev];
              } else {
                return [...prev];
              }
            });
          setStep((prev) => prev - 1);
          break;
      }
    },
    [step, newUsecase]
  );

  useEffect(() => {
    if (!isOpen) {
      setStep(1);
      setIsError(false);
      setNewUsecase('');
      setSearchString('');
    }
  }, [isOpen]);

  return (
    <Modal
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      className="sm:py-6 py-6 px-0 max-w-[560px] max-[400px]:max-h-[90%]"
      classNames={{
        close: 'md:-top-12 -top-11',
        dialog: 'z-[100]',
      }}
      isDarkTheme
    >
      <div className="w-full !font-['Neue_Montreal'] overflow-y-auto max-h-[75vh] scrollbar-white">
        <div className="flex items-center sm:px-6 px-4 mb-6">
          <div
            className={classes(
              'relative flex items-center justify-center text-sm h-8 min-w-8 rounded-full py-[4px] px-[8px]'
            )}
          >
            <GradientCircle className="absolute h-full w-full" />
            {step == 2 ? <CheckIcon /> : '01'}
          </div>
          <div
            className={classes(
              'h-[1px] w-full bg-[#1C1C1C]',
              step == 2 && 'bg-[linear-gradient(0deg,_#8D74F7_3%,_#D285F7_45%,_#FFAD97_95%)]'
            )}
          />
          <div
            className={classes(
              'relative flex items-center justify-center text-sm h-8 min-w-8 rounded-full py-[4px] px-[8px]',
              step == 1 && 'border border-solid border-[#1F1F1F]'
            )}
          >
            {step == 2 && <GradientCircle className="absolute h-full w-full" />}
            02
          </div>
        </div>
        <Form className="flex w-full flex-1 flex-col" onSubmit={onSubmit}>
          {isLoading ? (
            <Loader className="flex h-[400px] items-center text-white" />
          ) : (
            <div className="flex flex-col gap-6">
              {formContent}
              <div className="flex items-center gap-[19px] sm:px-6 px-4 flex-row max-[400px]:flex-col justify-between">
                {labels.helpLabel}
                <div className={classes('flex items-center gap-4 w-fit max-[400px]:w-full')}>
                  {step > 1 && (
                    <Button
                      variant="darkThemeOutlined"
                      className="text-base h-12 px-6 rounded-full w-fit max-[400px]:w-full"
                      onClick={(e: React.MouseEvent) => {
                        e.preventDefault();
                        setStep((prev) => prev - 1);
                      }}
                    >
                      Back
                    </Button>
                  )}
                  {step == 2 ? (
                    <Button
                      variant="darkThemeFilled"
                      isSubmit
                      className="text-base h-12 px-6 rounded-full w-fit max-[400px]:w-full"
                    >
                      {labels.submitButton}
                    </Button>
                  ) : (
                    <Button
                      variant="darkThemeFilled"
                      isDisabled={(step == 1 && !isValid) || (step == 3 && !newUsecase.length)}
                      className="text-base h-12 px-6 rounded-full w-fit max-[400px]:w-full"
                      onClick={handleSubmitActions}
                    >
                      {step === 3 ? 'Save' : 'Next'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </Form>
      </div>
    </Modal>
  );
}
