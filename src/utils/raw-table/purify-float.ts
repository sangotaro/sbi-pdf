// 文字列内に半角スペースが入ることがある
export function purifyFloat(str: string): string {
  return str.trim().replace(",", "").replace(/\s+/g, "");
}
