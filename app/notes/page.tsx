/** eslint-disable no-restricted-syntax */
/* eslint-disable react-hooks/rules-of-hooks */

"use client";

import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  DragDropContext,
  Draggable,
  type DropResult,
  Droppable,
} from "react-beautiful-dnd";

import { deleteCategory, getAllNotes, setData } from "@/firebase/firestore";
import { useAuth } from "@/provider/UserProvider";
import type { Note, NoteData } from "@/types/NoteData";

const Loader = dynamic(
  () => import("@/components/ui/Loader").then((mod) => mod.default),
  { ssr: true },
);

const Recorder = dynamic(
  () => import("./components/Recorder").then((mod) => mod.default),
  { ssr: false },
);

const AccountPill = dynamic(
  () => import("./components/AccountPill").then((mod) => mod.default),
  { ssr: false },
);

const AddCategory = dynamic(
  () => import("./components/AddCategory").then((mod) => mod.default),
  { ssr: false },
);

const Category = dynamic(
  () => import("./components/Category").then((mod) => mod.default),
  { ssr: true },
);

const GeneratingNote = dynamic(
  () => import("./components/GeneratingNote").then((mod) => mod.default),
  { ssr: false },
);

export default function Notes() {
  const user = useAuth();
  const router = useRouter();
  const [message, setMessage] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [recording, setRecording] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [genStatus, setGenStatus] = useState("Generating notes..");
  const [notes, setNotes] = useState<{ [key: string]: Note[] }>({
    Uncategorized: [],
  });
  const [categoryOrder, setCategoryOrder] = useState<string[]>([]);
  const [editMode, setEditMode] = useState(false);
  const [newCategory, setNewCategory] = useState("");

  useEffect(() => {
    if (message) setTimeout(() => setMessage(""), 6000);
  }, [message]);

  useEffect(() => {
    if (user === false) router.push("/auth");
    else if (user !== null)
      setTimeout(() => {
        navigator.permissions.query({ name: "microphone" as PermissionName });
        getAllNotes(`${user.uid}`).then((allNotes) => {
          const categorizedNotes = allNotes.reduce(
            (acc: { [key: string]: Note[] }, note: { id: string; data: NoteData }) => {
              const category = note.data?.category || "Uncategorized";
              if (!acc[category]) acc[category] = [];
              acc[category].push(note);
              return acc;
            },
            { Uncategorized: [] },
          );
          setNotes(categorizedNotes);
          setCategoryOrder([
            "Uncategorized",
            ...Object.keys(categorizedNotes).filter(
              (cat) => cat !== "Uncategorized",
            ),
          ]);
        });
      }, 200);
  }, [user, router]);

  const onDragEnd = async (result: DropResult) => {
    const { source, destination, type } = result;
    if (!user || !destination) return;

    if (type === "CATEGORY") {
      if (source.index === 0 || destination.index === 0) return; // Prevent moving Starred
      const newCategoryOrder = Array.from(categoryOrder);
      const [reorderedItem] = newCategoryOrder.splice(source.index, 1);
      newCategoryOrder.splice(destination.index, 0, reorderedItem);
      setCategoryOrder(newCategoryOrder);
      return;
    }

    if (
      source.index === destination.index &&
      source.droppableId === destination.droppableId
    )
      return;

    const newNotes = { ...notes };
    const movedNote = newNotes[source.droppableId].splice(source.index, 1)[0];
    movedNote.data.category = destination.droppableId;

    if (!newNotes[destination.droppableId]) {
      newNotes[destination.droppableId] = [];
    }
    newNotes[destination.droppableId].splice(destination.index, 0, movedNote);

    setNotes(newNotes);

    try {
      if (source.droppableId !== destination.droppableId) {
        await setData(user.uid, movedNote.data.id, movedNote.data);
      }
    } catch (error) {
      console.error("Error updating note category: ", error);
    }
  };

  const handleAddCategory = () => {
    if (newCategory && !notes[newCategory]) {
      setNotes((prevNotes) => ({
        ...prevNotes,
        [newCategory]: [],
      }));
      setCategoryOrder((prevOrder) => [...prevOrder, newCategory]);
      setNewCategory("");
    }
  };

  const handleDeleteCategory = async (categoryToDelete: string) => {
    if (categoryToDelete === "Uncategorized")
      return;

    const newNotes = { ...notes };
    const notesToMove = newNotes[categoryToDelete] || [];
    delete newNotes[categoryToDelete];

    newNotes.Uncategorized = [...newNotes.Uncategorized, ...notesToMove];
    setNotes(newNotes);

    setCategoryOrder((prevOrder) =>
      prevOrder.filter((cat) => cat !== categoryToDelete),
    );

    if (user) {
      // eslint-disable-next-line no-restricted-syntax
      for (const note of notesToMove) {
        note.data.category = "Uncategorized";
        await setData(user.uid, note.data.id, note.data);
      }
      await deleteCategory(user.uid, categoryToDelete);
    }
  };

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  if (user === null) return <Loader />;
  if (user === false) return null;

  return (
    <main className="overflow-hidden duration-300 transition-all animate-fade h-screen w-screen p-6">
      <DragDropContext onDragEnd={onDragEnd}>
        <motion.div
          className="scrollbar-none w-[92vw] md:w-[97vw] overflow-hidden px-0 py-4 md:px-12 md:py-8 overflow-y-auto fixed h-[85dvh] rounded-3xl"
          initial={{ opacity: 1 }}
          animate={{ opacity: recording || message ? 0 : 1 }}
          transition={{ duration: 0.3 }}
        >
          <div className="flex justify-between items-center">
            <h1 className="ml-4 md:ml-0 lg:text-5xl text-3xl font-semibold">
              Library
            </h1>
            <AccountPill toggleEditMode={toggleEditMode} editMode={editMode} />
          </div>

          <Droppable droppableId="categories" type="CATEGORY">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="flex flex-col flex-wrap md:flex-row gap-4 mt-8"
              >
                {categoryOrder.map((category, index) => (
                  <Draggable
                    key={category}
                    draggableId={category}
                    index={index}
                    isDragDisabled={
                      !editMode ||
                      category === "Uncategorized"
                    }
                  >
                    {(dragProvider) => (
                      <div
                        ref={dragProvider.innerRef}
                        {...dragProvider.draggableProps}
                        {...dragProvider.dragHandleProps}
                      >
                        <Category
                          title={category}
                          notes={notes[category] || []}
                          categoryId={category}
                          editMode={editMode}
                          onDelete={() => handleDeleteCategory(category)}
                          generating={
                            category === "Uncategorized" && generating ? (
                              <GeneratingNote genStatus={genStatus} />
                            ) : null
                          }
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {editMode && (
                  <AddCategory
                    newCategory={newCategory}
                    setNewCategory={setNewCategory}
                    handleAddCategory={handleAddCategory}
                  />
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </motion.div>
      </DragDropContext>

      {message && (
        <div className="flex absolute lg:w-full left-0 top-[40dvh] items-center justify-center">
          <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="w-[90%] text-2xl font-semibold text-center"
          >
            {message}
          </motion.h1>
        </div>
      )}
      <Recorder
        generating={generating}
        genStatus={genStatus}
        message={message}
        canvasRef={canvasRef}
        recording={recording}
        setRecording={setRecording}
        setGenerating={setGenerating}
        setGenStatus={setGenStatus}
        setMessage={setMessage}
        setNotes={setNotes}
      />
    </main>
  );
}
