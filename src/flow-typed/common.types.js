import type React from 'react';

export type CurrencyId = 'eur' | 'usd' | 'gbp';
export type OperationType = 'sender' | 'recipient';
export type ReactObjRef<ElementType: React.ElementType> = {
  current: null | React.ElementRef<ElementType>,
};
