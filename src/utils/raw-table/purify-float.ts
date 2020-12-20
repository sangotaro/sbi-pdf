// 文字列内に半角スペースが入ることがある
function purifyFloatString(str: string): string {
  return str.trim().replace(",", "").replace(/\s+/g, "");
}

export function purifyFloat(str: string): number {
  return parseFloat(purifyFloatString(str));
}
