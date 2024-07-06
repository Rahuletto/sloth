export async function blobToDataURL(url: string): Promise<string> {
    const blob = await fetch(url).then((r) => r.blob());

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (_e) => resolve(reader.result as string);
      reader.onerror = (_e) => reject(reader.error);
      reader.onabort = (_e) => reject(new Error("Read aborted"));
      reader.readAsDataURL(blob);
    });
  }
