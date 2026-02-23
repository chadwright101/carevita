export function serializeFirestoreData(data: any): any {
  if (data === null || data === undefined) {
    return data;
  }

  if (data.toDate && typeof data.toDate === "function") {
    return data.toDate().getTime();
  }

  if (Array.isArray(data)) {
    return data.map((item) => serializeFirestoreData(item));
  }

  if (typeof data === "object") {
    const serialized: any = {};
    for (const [key, value] of Object.entries(data)) {
      serialized[key] = serializeFirestoreData(value);
    }
    return serialized;
  }

  return data;
}
