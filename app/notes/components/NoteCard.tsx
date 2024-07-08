"use client";

import { Note } from "@/types/NoteData";
import { Draggable } from "react-beautiful-dnd";
import React from "react";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import { FaTrashCan } from "react-icons/fa6";
import { deleteData } from "@/firebase/firestore";
import { useAuth } from "@/provider/UserProvider";

export function NoteCard({
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
  function del() {
    if (user) {
      const p = confirm("Are you sure you want to delete this note?");
      if (p) {
        deleteData(user.uid, note.id);
        router.push("/notes");
      }
    }
  }

  return (
    <Draggable
      draggableId={note.id}
      isDragDisabled={isDragDisabled}
      index={index}
    >
      {(provided) => (
        <div
          onClick={() => isDragDisabled && router.push(`/notes/${note.id}`)}
          onKeyDown={() => {}}
          role="button"
          tabIndex={0}
          className={`md:w-fill ${
            !isDragDisabled && !isDragging
              ? `animate-shake cursor-grab`
              : "cursor-pointer"
          } select-none relative max-w-[485px] transition-all duration-300 m-1 md:w-auto bg-box border-2 border-bb rounded-xl md:py-5 md:px-8 py-4 px-5`}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <h1 className="select-none text-2xl font-semibold line-clamp-2 overflow-hidden text-ellipsis truncate">
            {note.data.title}
          </h1>
          <h3 className="text-xs opacity-30 mb-3 select-none">
            Recorded at {formatDate(note.data.createdAt)}
          </h3>
          <p className="text-sm select-none">
            <span className="opacity-50">
              {note.data.description?.split(" ")?.slice(0, 32)?.join(" ")}...
            </span>
          </p>
          {!isDragDisabled && (
            <div className="z-10 absolute bottom-2 right-2 transition-all duration-300 animate-fade">
              <button
                type="button"
                title="Delete note"
                aria-label="delete"
                onClick={del}
                className="text-accent p-3 bg-hue border-2 border-accent rounded-lg"
              >
                <FaTrashCan className="text-xl" />
              </button>
            </div>
          )}
        </div>
      )}
    </Draggable>
  );
}
