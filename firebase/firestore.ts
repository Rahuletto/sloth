import { collection, deleteDoc, doc, getDoc, getDocs, query, QueryDocumentSnapshot, setDoc } from "firebase/firestore";
import { db } from "./config";


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
    const userNotesRef = collection(db, 'users', userId, 'notes');
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