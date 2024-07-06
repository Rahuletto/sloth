import { generateId } from "@/utils/generateId";
import { Draggable } from "react-beautiful-dnd";
import { RiLoaderLine } from "react-icons/ri";

export const GeneratingNote = ({ genStatus }: { genStatus: string }) => (
  <Draggable draggableId={generateId("sloth.")} index={0}>
      {(provided) => (
<div
ref={provided.innerRef}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
    className="w-[89vw] md:w-auto cursor-grab bg-box border-2 border-bb rounded-2xl md:py-5 md:px-8 py-4 px-5"
  >
    <div className="flex items-center gap-4">
      <RiLoaderLine className="animate-spin duration-1000 transition-all" />
      <h1 className="text-xl font-semibold">{genStatus}</h1>
    </div>
  </div>
      )}
      </Draggable>
);
