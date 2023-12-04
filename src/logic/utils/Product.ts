/**
 * Generates an array of products by combining verbs and adjectives.
 * 
 * @param verbs - An array of verbs to be used in the product names.
 * @param adjectives - An array of adjectives to be used in the product names.
 * @returns An array of products.
 */
export const generateRandomProductsNames = (
  verbs: string[],
  adjectives: string[]
): string[] => {
  const usedVerbsIndexes: number[] = [];
  const usedAdjectivesIndexes: number[] = [];
  const productsNames: string[] = [];

  while (usedVerbsIndexes.length < verbs.length) {
    const randomVerbsIndex = Math.floor(Math.random() * verbs.length);
    const randomAdjectiveIndex = Math.floor(Math.random() * adjectives.length);

    if (
      !usedVerbsIndexes.includes(randomVerbsIndex) &&
      !usedAdjectivesIndexes.includes(randomAdjectiveIndex)
    ) {
      usedVerbsIndexes.push(randomVerbsIndex);
      usedAdjectivesIndexes.push(randomAdjectiveIndex);
      const elemento = `${verbs[randomVerbsIndex]} ${adjectives[randomAdjectiveIndex]}`;
      productsNames.push(elemento);
    }
  }

  return productsNames;
};
