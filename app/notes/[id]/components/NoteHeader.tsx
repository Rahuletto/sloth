"use client";
import Back from "@/components/ui/Back";
import { formatDate } from "@/utils/formatDate";

export default function NoteHeader({
  id,
  title,
  createdAt,
}: {
  id: string;
  title: string;
  createdAt: number;
}) {
  return (
    <div className="flex justify-start gap-4 items-start">
      <Back href={`/notes`} />
      <div>
        <h1 className="lg:text-5xl md:text-4xl text-2xl text-color font-semibold transition-all duration-300">
          {title}
        </h1>
        <p className="text-md opacity-40 md:mt-3 mt-1 font-medium">
          Recorded at {formatDate(createdAt)}
        </p>
      </div>
    </div>
  );
}
