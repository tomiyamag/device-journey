import dayjs from "dayjs";

// 発売日データをフォーマットする
export const formatReleaseDate = (dateString: string) => {
  if (!dateString) return "";

  const cleanedDate = dateString.replace("Released ", "");
  const parsed = dayjs(cleanedDate, "YYYY, MMMM D", true);

  if (parsed.isValid()) {
    return parsed.format("YYYY年MM月DD日");
  }

  // フォーマットに失敗した場合は cleanedDate をそのまま返す
  return cleanedDate;
};
