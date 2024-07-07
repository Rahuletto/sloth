"use client";
import Back from "@/components/ui/Back";
import { deleteData } from "@/firebase/firestore";
import { useAuth } from "@/provider/UserProvider";
import { formatDate } from "@/utils/formatDate";
import { useRouter } from "next/navigation";
import { FaTrashCan } from "react-icons/fa6";

export default function NoteHeader({
  id,
  title,
  createdAt,
}: {
  id: string;
  title: string;
  createdAt: number;
}) {
  const router = useRouter();
  const user = useAuth();
  function del() {
    if (user) {
      const p = confirm("Are you sure you want to delete this note?");
      if (p) {
        deleteData(user.uid, id);
        router.push("/notes");
      }
    }
  }
  return (
    <div className="flex justify-between gap-4 items-center">
      <div className="flex gap-3">
        <Back href={`/notes`} />
        <div>
          <h1 className="lg:text-5xl md:text-4xl text-2xl text-color font-semibold transition-all duration-300">
            {title}
          </h1>
          <p className="text-md opacity-40 mt-3 font-medium">
            Recorded at {formatDate(createdAt)}
          </p>
        </div>
      </div>
      <button
        onClick={del}
        className="block border-2 border-transparent hover:border-accent transition-all duration-300 h-full aspect-square p-3 rounded-xl bg-hue "
      >
        <FaTrashCan className="text-accent text-xl" />
      </button>
    </div>
  );
}
