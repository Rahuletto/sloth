import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  QueryDocumentSnapshot,
  setDoc,
} from "firebase/firestore";
import { db } from "./config";
import { Note, NoteData } from "@/types/NoteData";
import { TopicData } from "@/types/Topic";
import { User } from "firebase/auth";
import { generateId } from "@/utils/generateId";

export async function setData(userId: string, noteId: string, data: any) {
  try {
    const noteRef = doc(db, "users", userId, "notes", noteId);
    await setDoc(noteRef, data);
    console.log("Document successfully written!");
  } catch (error) {
    console.error("Error writing document: ", error);
    throw error;
  }
}

// Function to delete data from Firestore
export async function deleteData(userId: string, noteId: string) {
  try {
    const noteRef = doc(db, "users", userId, "notes", noteId);
    await deleteDoc(noteRef);
    console.log("Document successfully deleted!");
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
}

// Function to get data from Firestore
export async function getData(userId: string, noteId: string) {
  try {
    const noteRef = doc(db, "users", userId, "notes", noteId);
    const docSnap = await getDoc(noteRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error getting document: ", error);
    throw error;
  }
}

export async function getAllNotes(userId: string) {
  try {
    const userNotesRef = collection(db, "users", userId, "notes");
    const q = query(userNotesRef);
    const querySnapshot = await getDocs(q);

    const notes: { id: string; data: any }[] = [];
    querySnapshot.forEach((doc: QueryDocumentSnapshot) => {
      notes.push({ id: doc.id, data: doc.data() });
    });

    return notes;
  } catch (error) {
    console.error("Error getting notes: ", error);
    throw error;
  }
}

export const saveNote = async ({
  user,
  title,
  src,
  transcript,
  topics,
  description
}: {
  user: User;
  title: string;
  src: { type: string; url: string }[];
  transcript: string;
  topics: TopicData[];
  description: string;
}): Promise<{
  [key: string]: Note[];
}> => {

  const id = generateId(src[0].url);
  await setData(`${user.uid}`, id, {
    id,
    createdAt: Date.now(),
    src,
    transcript,
    title: title,
    description: description,
    topics: topics,
    category: "Uncategorized",
  });
  const allNotes = await getAllNotes(`${user.uid}`);
  const categorizedNotes = allNotes.reduce(
    (acc: any, note: { id: string; data: NoteData }) => {
      const category = note.data?.category || "computer";
      if (!acc[category]) acc[category] = [];
      acc[category].push(note);
      return acc;
    },
    { Starred: [], Uncategorized: [] }
  );
  return categorizedNotes;
};
