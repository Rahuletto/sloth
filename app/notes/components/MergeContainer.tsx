import React from "react";
import Dialog from "@/components/ui/Dialog";
import MergeBox from "@/components/ui/MergeBox";
import { useMergeFunction } from "@/hooks/useMerge";
import type { Note } from "@/types/NoteData";
import type { Dispatch, SetStateAction } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { LuContainer } from "react-icons/lu";

export default function MergeContainer({ notes, setNotes }: { notes: { [key: string]: Note[] }, setNotes: Dispatch<SetStateAction<{ [key: string]: Note[] }>> }) {
  const {
    handleMerge,
    showDeleteDialog,
    handleDeleteConfirm,
    setShowDeleteDialog,
    mergedContent,
  } = useMergeFunction(notes, setNotes);

  const onDragEnd = (result: any) => {
    if (!result.destination) return;
    if (result.destination.droppableId === "merge") {
      handleMerge([result.draggableId]);
    }
  };

  return (
    <MergeBox>
      <DragDropContext onDragEnd={onDragEnd} >
        <div className="pointer-events-none flex flex-col w-full justify-start items-start gap-2 transition-all duration-300 animate-fade" >
          <div className="my-2 transform-all duration-300 active:bg-[rgba(0,0,0,0.3)] active:scale-95 font-medium font-mono cursor-pointer flex gap-4 rounded-2xl border-4 max-w-[350px] px-8 py-4 border-alt text-light flex-col items-center justify-center border-dashed" >
            <span className="text-3xl text-light" >
              <LuContainer />
            </span>
            < p
              className="font-mono max-w-[350px] text-center" > Drag;
              &apos;n drop multiple notes to merge them into one.
            </p>
            < Droppable droppableId="merge"
              type="MERGE" >
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="flex flex-col flex-wrap md:flex-row items-center md:items-start md:justify-center lg:justify-start gap-4 mt-8"
                >
                  {provided.placeholder}
                </div>
              )
              }
            </Droppable>
          </div>
        </div>
      </DragDropContext>
      {mergedContent && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold mb-2">Merged Content:</h3>
          <pre className="bg-gray-100 p-4 rounded-lg overflow-x-auto">{mergedContent}</pre>
        </div>
      )}
      <Dialog
        open={showDeleteDialog}
        clickHandler={handleDeleteConfirm}
        setOpen={setShowDeleteDialog}
      >
        Are you sure you want to delete the merged notes?
      </Dialog>
    </MergeBox >
  )
}
