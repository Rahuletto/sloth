/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import Loader from "@/components/ui/Loader";
import { getAllNotes, setData, deleteCategory } from "@/firebase/firestore";
import { useAuth } from "@/provider/UserProvider";
import { Note, NoteData } from "@/types/NoteData";
import { motion } from "framer-motion";
import { Link } from "next-view-transitions";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useEffect, useRef, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { BiPencil } from "react-icons/bi";
import { GrPowerShutdown } from "react-icons/gr";
import { AddCategory } from "./components/AddCategory";

const Recorder = dynamic(
  () => import("./components/Recorder").then((mod) => mod.default),
  { ssr: false }
);

const Category = dynamic(
  () => import("./components/Category").then((mod) => mod.Category),
  { ssr: true }
);

const GeneratingNote = dynamic(
  () => import("./components/GeneratingNote").then((mod) => mod.GeneratingNote),
  { ssr: false }
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
    Starred: [],
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
        navigator.permissions.query({ name: "microphone" as any });
        getAllNotes(`${user.uid}`).then((allNotes) => {
          const categorizedNotes = allNotes.reduce(
            (acc: any, note: { id: string; data: NoteData }) => {
              const category = note.data?.category || "Uncategorized";
              if (!acc[category]) acc[category] = [];
              acc[category].push(note);
              return acc;
            },
            { Starred: [], Uncategorized: [] }
          );
          setNotes(categorizedNotes);
          setCategoryOrder([
            "Starred",
            "Uncategorized",
            ...Object.keys(categorizedNotes).filter(
              (cat) => cat !== "Starred" && cat !== "Uncategorized"
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
    if (categoryToDelete === "Starred" || categoryToDelete === "Uncategorized")
      return;

    const newNotes = { ...notes };
    const notesToMove = newNotes[categoryToDelete] || [];
    delete newNotes[categoryToDelete];

    newNotes.Uncategorized = [...newNotes.Uncategorized, ...notesToMove];
    setNotes(newNotes);

    setCategoryOrder((prevOrder) =>
      prevOrder.filter((cat) => cat !== categoryToDelete)
    );

    if (user) {
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
            <div className="flex gap-2 rounded-full bg-box border-2 border-bb p-1 items-center justify-between">
              <button
                className={`hover:bg-alt p-2 rounded-full duration-150 ${
                  editMode ? "bg-alt" : ""
                }`}
                onClick={toggleEditMode}
              >
                <BiPencil className="text-2xl" />
              </button>

              <Link
                href="/auth/logout"
                className="bg-accent hover:px-3 text-bg p-2 rounded-full duration-150"
              >
                <GrPowerShutdown className="text-2xl" />
              </Link>
            </div>
          </div>
          <Droppable droppableId="categories" type="CATEGORY">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4 auto-rows-auto mt-8"
                style={{ gridAutoFlow: 'dense' }}
              >
                {categoryOrder.map((category, index) => (
                  <Draggable
                    key={category}
                    draggableId={category}
                    index={index}
                    isDragDisabled={
                      !editMode ||
                      category === "Starred" ||
                      category === "Uncategorized"
                    }
                  >
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`
                          ${notes[category]?.length >= 4 ? "sm:col-span-2 sm:row-span-2" : ""}
                          ${notes[category]?.length >= 8 ? "lg:col-span-2 lg:row-span-2" : ""}
                          ${notes[category]?.length >= 12 ? "xl:col-span-2 xl:row-span-2" : ""}
                        `}
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
