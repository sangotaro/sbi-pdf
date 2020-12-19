// 文字列内に半角スペースが入ることがある
export function purifyIntString(str: string): string {
  return str.trim().replace(",", "").replace(/\s+/g, "");
}

export function purifyInt(str: string): number {
  return parseInt(purifyIntString(str));
}
