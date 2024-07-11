import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { PiVinylRecordBold, PiCardsThreeDuotone } from "react-icons/pi";
import { RiScissorsCutFill } from "react-icons/ri";
import { TbMessageQuestion } from "react-icons/tb";
import { Feature } from "@/types/Features";
import { FeatureDropper } from "./components/FeatureDropper";

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
    <section
      id="features"
      className="z-10 lg:mt-32 mt-24 transition-all animate-fade duration-300"
    >
      <DragDropContext onDragEnd={onDragEnd}>
          <FeatureDropper features={features} />
      </DragDropContext>
    </section>
  );
}
