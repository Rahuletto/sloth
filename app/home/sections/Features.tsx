import dynamic from "next/dynamic";

import React, { ReactNode, useState } from "react";
import { DragDropContext, Draggable, DropResult } from "react-beautiful-dnd";
import { PiVinylRecordBold, PiCardsThreeDuotone } from "react-icons/pi";
import { RiScissorsCutFill } from "react-icons/ri";
import { TbMessageQuestion } from "react-icons/tb";

const StrictModeDroppable = dynamic(
  () => import("@/components/dnd/Droppable").then((mod) => mod.default),
  { ssr: true },
);

interface Feature {
  i: number;
  icon: ReactNode;
  title: string;
  description: string;
}
const featureList = [
  {
    i: 0,
    icon: <PiVinylRecordBold />,
    title: "Record lectures",
    description: "I listen to your lectures and write well-organized notes.",
  },
  {
    i: 1,

    icon: <RiScissorsCutFill />,
    title: "Summarize",
    description:
      "I got some cool tricks up my sleeve, i can make you understand better.",
  },
  {
    i: 2,
    icon: <PiCardsThreeDuotone />,
    title: "Flash cards",
    description:
      "Shuffle some flashcards from key concepts for effective studying.",
  },
  {
    i: 3,
    icon: <TbMessageQuestion />,
    title: "Quiz",
    description:
      "I can ask some quizzes to test your understanding of my notes.",
  },
];

export default function Features() {
    const [features, setFeatures] = useState<Feature[]>(featureList);

    const onDragEnd = (result: DropResult) => {
      if (!result.destination) return;
      const items = Array.from(features);
      const [reorderedItem] = items.splice(result.source.index, 1);
      items.splice(result.destination.index, 0, reorderedItem);
  
      setFeatures(items.map((f, i) => ({ ...f, i })));
    };
  return (
    <section id="features" className="lg:mt-32 mt-24 transition-all animate-fade duration-300">
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="animate-fade scrollbar-none bg-category p-2 rounded-3xl min-h-32">
          <h2 className="p-2 mx-2 flex text-accent justify-between items-center font-semibold text-md">
            Features
          </h2>

          <StrictModeDroppable droppableId="features" direction="horizontal">
            {(provided, snapShot) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className={`overflow-x-auto scrollbar-none min-h-32 flex flex-row transition-all duration-500 rounded-2xl max-h-[600px] border-2 ${
                  snapShot.isDraggingOver
                    ? "bg-hue border-accent"
                    : "border-transparent"
                }`}
              >
                {features.map((f) => (
                  <Draggable draggableId={f.i.toString()} index={f.i}>
                    {(drag) => (
                      <div
                        ref={drag.innerRef}
                        {...drag.draggableProps}
                        {...drag.dragHandleProps}
                        className="min-w-[300px] cursor-grab select-none relative w-[385px] m-1 bg-box border-2 border-bb rounded-xl md:py-5 md:px-8 py-4 px-5"
                      >
                        <h1 className="flex gap-3 items-center select-none text-2xl font-semibold line-clamp-2 overflow-hidden text-ellipsis truncate">
                          {f.icon} {f.title}
                        </h1>
                        <p className="mt-3 text-sm select-none">
                          <span className="opacity-70">{f.description}</span>
                        </p>
                      </div>
                    )}
                  </Draggable>
                ))}

                {provided.placeholder}
              </div>
            )}
          </StrictModeDroppable>
        </div>
      </DragDropContext>
    </section>
  );
}
