function convertHexRGBA(hex: string, opacity?: number): string {
  const aux: string[] = hex.split("#")[1].match(/.{1,2}/g) as string[];
  const r = parseInt(aux[0], 16);
  const g = parseInt(aux[1], 16);
  const b = parseInt(aux[2], 16);
  const result = `${r},${g},${b}`;
  return `rgba(${result}, ${opacity ? opacity : 1})`;
}

export default convertHexRGBA;
