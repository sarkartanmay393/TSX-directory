"use client";

// import { useEffect, useState } from "react";
// import { MessageScreen } from "~/utils/types";
// import { getContent } from "../mock";

type Props = {
  params: { id: string };
};

export default function IdSpecificAnyView({ params }: Props) {
  // const [data, setData] = useState<MessageScreen>();

  // useEffect(() => {
  //   setData(getContent(params.id));
  // }, []);

  return (
    <div className="w-full h-screen items-center justify-center flex flex-col">
      <p>No data found!</p>
    </div>
  );
}
