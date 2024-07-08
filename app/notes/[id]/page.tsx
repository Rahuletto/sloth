import React from "react";
import NotePage from "./components/NotePage";

export default function Page({ params }: { params: { id: string } }) {

  return <NotePage id={params.id} />;
}
