"use client";

import { deleteData } from "@/firebase/firestore";
import { useAuth } from "@/provider/UserProvider";
import type { Note } from "@/types/NoteData";
import { formatDate } from "@/utils/formatDate";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { Draggable } from "react-beautiful-dnd";
import { FaTrashCan } from "react-icons/fa6";

const Dialog = dynamic(
  () => import("@/components/ui/Dialog").then((mod) => mod.default),
  { ssr: false },
);

export default function NoteCard({
  note,
  index,
  isDragDisabled,
  isDragging,
}: {
  note: Note;
  index: number;
  isDragDisabled: boolean;
  isDragging: boolean;
}) {
  const user = useAuth();
  const router = useRouter();
  const [dialog, setDialog] = useState(false);

  function clickHandler() {
    if (!user) return setDialog(false);
    deleteData(user.uid, note.id);
    router.push("/notes");
    return 0;
  }

  return (
    <>
      <Dialog open={dialog} clickHandler={clickHandler} setOpen={setDialog}>
        Are you sure you want to delete this note?
      </Dialog>
      <Draggable
        draggableId={note.id}
        isDragDisabled={isDragDisabled}
        index={index}
      >
        {(provided) => (
          <div
            onClick={() => isDragDisabled && router.push(`/notes/${note.id}`)}
            onKeyDown={() => { }}
            role="button"
            tabIndex={0}
            className={`${!isDragDisabled && !isDragging
              ? "animate-shake cursor-grab"
              : "cursor-pointer"
              } min-w-[250px] w-full cursor-grab select-none relative md:w-auto max-w-[480px] max-h-[165px] m-1 bg-box border-2 border-bb rounded-xl md:py-5 md:px-8 py-4 px-5`}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <h1 className="select-none transition duration-300 text-2xl text-color font-semibold line-clamp-2 overflow-hidden text-ellipsis truncate">
              {note.data.title}
            </h1>
            <h3 className="text-color transition duration-300 text-xs opacity-30 select-none">
              Recorded at {formatDate(note.data.createdAt)}
            </h3>
            <p className="text-color transition duration-300 hidden md:block mt-3 text-sm select-none">
              <span className="opacity-50">
                {note.data.description?.split(" ")?.slice(0, 25)?.join(" ")}...
              </span>
            </p>
            {!isDragDisabled && (
              <div className="z-10 absolute bottom-2 right-2 transition duration-300 animate-fade">
                <button
                  type="button"
                  title="Delete note"
                  aria-label="delete"
                  onClick={() => setDialog(true)}
                  className="text-accent p-3 bg-hue border-2 border-accent rounded-lg"
                >
                  <FaTrashCan className="text-xl" />
                </button>
              </div>
            )}
          </div>
        )}
      </Draggable>
    </>
  );
}
