const _language = "pt-BR";
const _coin = "BRL";

/** A function to format money to local coin
 * @param value The money value in a string format that
 * will be formatted
 * @returns A formatted money value based in locale
 */
export const FormatMoney = (value: number): string => {
  return (value ?? 0).toLocaleString(_language, {
    style: "currency",
    currency: _coin,
  });
};
