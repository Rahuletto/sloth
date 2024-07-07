import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage } from "./config";
import { generateId } from "@/utils/generateId";

export async function uploadAudioFromDataURL(userId: string, audioDataURL: string) {
    try {
        const id = generateId(audioDataURL);

        const base64String = audioDataURL.split(',')[1];
        const byteArray = Uint8Array.from(atob(base64String), c => c.charCodeAt(0));
        const blob = new Blob([byteArray], { type: 'audio/mp4' });
        
        const fileName = `audio_${id}.mp3`;
        const filePath = `audios/${userId}/${fileName}`;
        
        const audioRef = ref(storage, filePath);
        const snapshot = await uploadBytesResumable(audioRef, blob);
        
        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error('Error uploading audio:', error);
        throw error;
    }
}

export async function uploadFile(userId: string, file: File) {
    try {
        const id = generateId(file.name);

        const fileName = `${id}_${file.name}`;
        const filePath = `pdf/${userId}/${fileName}`;

        const fileRef = ref(storage, filePath);
        const snapshot = await uploadBytesResumable(fileRef, file);

        const downloadURL = await getDownloadURL(snapshot.ref);

        return downloadURL;
    } catch (error) {
        console.error('Error uploading file:', error);
        throw error;
    }
}