export const jsonToQs = (jsonData: Record<string, any>): string => {
  const params = new URLSearchParams();

  for (const [key, value] of Object.entries(jsonData)) {
    params.append(key, value);
  }
  return params.toString();
};
