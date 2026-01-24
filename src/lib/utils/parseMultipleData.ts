// "," で区切られた文字列を配列に変換
export const parseMultipleData = (multipleDataString: string): string[] => {
  if (!multipleDataString) {
    return [];
  }

  return multipleDataString
    .split(",")
    .map((c) => c.trim()) // 半角スペース削除
    .filter((c) => c.length > 0); // 空文字を除外
};
