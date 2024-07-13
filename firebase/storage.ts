/* eslint-disable @typescript-eslint/no-unused-vars */
import { generateId } from "@/utils/generateId";
import { deleteObject, getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "./config";

export async function uploadAudioFromDataURL(
  userId: string,
  audioDataURL: string,
) {
  try {
    const id = generateId(audioDataURL);

    const base64String = audioDataURL.split(",")[1];
    const byteArray = Uint8Array.from(atob(base64String), (c) =>
      c.charCodeAt(0),
    );
    const blob = new Blob([byteArray], { type: "audio/mp4" });

    const fileName = `audio_${id}.mp3`;
    const filePath = `audios/${userId}/${fileName}`;

    const audioRef = ref(storage, filePath);
    const snapshot = await uploadBytesResumable(audioRef, blob);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading audio:", error);
    throw error;
  }
}

export async function uploadFile(format: 'audios' | 'pdf', userId: string, file: File) {
  try {
    const id = generateId(file.name);

    const fileName = `${id}_${file.name}`;
    const filePath = `${format || "pdf"}/${userId}/${fileName}`;

    const fileRef = ref(storage, filePath);
    const snapshot = await uploadBytesResumable(fileRef, file);

    const downloadURL = await getDownloadURL(snapshot.ref);

    return downloadURL;
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
}

function getFilePathFromUrl(url: string): string {
  const decodedUrl = decodeURIComponent(url);
  const startIndex = decodedUrl.indexOf('/o/') + 3;
  const endIndex = decodedUrl.indexOf('?');
  return decodedUrl.substring(startIndex, endIndex);
}

export async function deleteFile(url: string) {
  try {
    const filePath = getFilePathFromUrl(url);
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef)
    console.log("File successfully deleted!");
  } catch (error) {
    console.error("Error deleting file:", error);
    throw error;
  }
}
