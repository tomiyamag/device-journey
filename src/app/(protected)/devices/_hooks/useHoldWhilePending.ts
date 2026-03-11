import { useState } from "react";

/**
 * 送信中（isPending）に直前の入力を保持する
 */
export const useHoldWhilePending = <T>(value: T, isPending: boolean): T => {
  const [frozenValue, setFrozenValue] = useState<T>(value);

  if (!isPending && value !== frozenValue) {
    setFrozenValue(value);
  }

  return isPending ? frozenValue : value;
};
