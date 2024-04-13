import { useMemo, useState } from 'react';
import { UseEditTags, useEditTags } from './useEditTags';
import { Setter } from 'types';
import { TagBasicsFragment, TagInput } from 'gql';

type TagInitial = Pick<TagBasicsFragment, 'slug' | 'name'>;

export interface Initial {
  name: string;
  description: string;
  tags: TagInitial[];
}

export interface Fields {
  name: string;
  description: string;
  tags: TagInput[];
}

export interface UseEditMetadata extends UseEditTags {
  isValid: boolean;
  name: string;
  setName: Setter<string>;
  description: string;
  setDescription: Setter<string>;
  useCases: (string | undefined)[];
  setUseCases: Setter<(string | undefined)[]>;
  useCasesOption: (string | undefined)[];
  setUseCasesOption: Setter<(string | undefined)[]>;
  submitForGame: boolean;
  setSubmitForGame: Setter<boolean>;
}

export function useEditMetadata(
  initial?: Partial<Initial>,
  validate?: (_: Fields) => boolean
): UseEditMetadata {
  const [name, setName] = useState(initial?.name || '');
  const [description, setDescription] = useState(initial?.description || '');
  const [useCases, setUseCases] = useState<(string | undefined)[]>([]);
  const [useCasesOption, setUseCasesOption] = useState<(string | undefined)[]>([
    'Liquidity Pool Optimization',
    'Rebasing Mechanism',
    'DEX Engagement Tracking',
    'Trading Strategy Optimization',
    'Collateral Value Tracking',
    'Historical Price Analysis',
    'NFT Marketplace Data',
    'Governance Analytics',
    'Cross-Chain DeFi Insights',
    'Chain Analytics',
    'User Analytics',
    'Wallet Analytics',
    'Token Analytics',
    'DAO Analytics',
    'Marketplace Insights Aggregator',
    'Portfolio Management Dashboard',
    'Decentralized Identity Verification',
    'Supply Chain Transparency Tracker',
    'Real Estate Tokenization Platform',
    'Decentralized Gaming Platform',
    'Cross-Chain Token Swap Aggregator',
    'Decentralized Social Media Analytics Platform',
    'Decentralized Content Distribution Network (CDN)',
    'Cross-Chain NFT Analytics',
    'NFT Collection Data Analytics',
    'NFT Metadata Queries',
    'Token Gate Crypto Communities',
  ]);
  const [submitForGame, setSubmitForGame] = useState(false);

  const editTags = useEditTags(initial?.tags);

  const isValid = useMemo(() => {
    return (
      !!name &&
      name.length > 0 &&
      (!validate || validate({ name, description, tags: editTags.tags }))
    );
  }, [description, editTags.tags, name, validate]);

  return useMemo(
    () => ({
      isValid,
      name,
      setName,
      description,
      setDescription,
      useCases,
      setUseCases,
      useCasesOption,
      setUseCasesOption,
      submitForGame,
      setSubmitForGame,
      ...editTags,
    }),
    [isValid, name, description, editTags, useCases, useCasesOption, submitForGame]
  );
}
