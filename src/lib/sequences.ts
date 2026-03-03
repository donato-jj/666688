import { BaseType } from '@/types';

export const BASES: BaseType[] = ['A', 'T', 'C', 'G'];

export const COMPLEMENT: Record<BaseType, BaseType> = {
  A: 'T', T: 'A', C: 'G', G: 'C',
};

export function generateSequence(length: number): BaseType[] {
  return Array.from({ length }, () => BASES[Math.floor(Math.random() * 4)]);
}

export function getComplement(base: BaseType): BaseType {
  return COMPLEMENT[base];
}

export function mutateBase(base: BaseType): BaseType {
  const others = BASES.filter(b => b !== base);
  return others[Math.floor(Math.random() * others.length)];
}

export function validateWatsonCrick(base1: BaseType, base2: BaseType): boolean {
  return COMPLEMENT[base1] === base2;
}
