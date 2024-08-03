import { deleteData, saveNote } from "@/firebase/firestore";
import { useAuth } from "@/provider/UserProvider";
import type { Note, NoteData } from "@/types/NoteData";
import type { TopicData } from "@/types/Topic";
import type React from "react";
import { useState } from "react";

interface NotesState {
  [key: string]: Note[];
}

export function useMergeFunction(
  notes: NotesState,
  setNotes: React.Dispatch<React.SetStateAction<NotesState>>,
) {
  const user = useAuth();
  const [mergedContent, setMergedContent] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [notesToDelete, setNotesToDelete] = useState<string[]>([]);

  async function handleMerge(droppedNoteIds: string[]) {
    if (!user) return;
    const allNotes = Object.values(notes).flat();
    const notesToMerge = allNotes.filter((note) =>
      droppedNoteIds.includes(note.id),
    );
    const mergedText = notesToMerge
      .map((note) => note.data.transcript || "")
      .join("\n\n");
    const mergedSrc = notesToMerge.flatMap((note) => note.data.src || []);

    setMergedContent(mergedText);

    const topicsRes = await fetch("/api/google/topics", {
      method: "POST",
      body: JSON.stringify({ prompt: mergedText.trim() }),
    });
    const topics = await topicsRes.json();
    const { title, description } = topics.result;

    const mergedNote: NoteData = {
      id: Date.now().toString(),
      topics: topics.result as TopicData,
      title,
      description,
      createdAt: Date.now(),
      src: mergedSrc,
      transcript: mergedText,
      category: "Uncategorized", // Or decide on a category
    };

    saveNote({ user, ...mergedNote, transcript: mergedText || "" })
      .then(() => {
        setNotesToDelete(droppedNoteIds);
        setShowDeleteDialog(true);
      })
      .catch((error) => {
        console.error("Error saving merged note:", error);
        // Handle error (e.g., show an error message to the user)
      });
  }

  function handleDeleteConfirm() {
    if (!user) return;

    Promise.all(notesToDelete.map((id) => deleteData(user.uid, id)))
      .then(() => {
        setNotes((prevNotes) => {
          const newNotes = { ...prevNotes };
          Object.keys(newNotes).forEach((category) => {
            newNotes[category] = newNotes[category].filter(
              (note) => !notesToDelete.includes(note.id),
            );
          });
          return newNotes;
        });
        setShowDeleteDialog(false);
        setNotesToDelete([]);
      })
      .catch((error) => {
        console.error("Error deleting notes:", error);
        // Handle error (e.g., show an error message to the user)
      });
  }

  function handleDeleteCancel() {
    setShowDeleteDialog(false);
    setNotesToDelete([]);
  }

  return {
    handleMerge,
    showDeleteDialog,
    handleDeleteConfirm,
    handleDeleteCancel,
    setShowDeleteDialog,
    mergedContent,
  };
}
