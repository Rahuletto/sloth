export async function getAudioLength(url: string): Promise<number> {
  return new Promise((resolve, reject) => {
    const audioContext = new (window.AudioContext ||
      (window as any).webkitAudioContext)();
    fetch(url)
      .then((response) => response.arrayBuffer())
      .then((arrayBuffer) => audioContext.decodeAudioData(arrayBuffer))
      .then((audioBuffer) => {
        const durationInSeconds = audioBuffer.duration;
        resolve(durationInSeconds);
      })
      .catch((error) => reject(error));
  });
}
