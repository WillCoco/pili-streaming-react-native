export function safeParse(json: string) {
  let data;
  try {
    data = JSON.parse(json);
  } catch (err) {
    console.warn('JSON.parse error: ', json);
  }
  return data;
}

export function safeStringify(data: any) {
  let json;
  try {
    json = JSON.stringify(data);
  } catch (err) {
    console.warn('JSON.stringify error: ', data);
  }
  return json;
}