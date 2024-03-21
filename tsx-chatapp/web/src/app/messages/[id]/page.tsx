"use client";

import { useEffect, useState } from "react";
import { MessageScreen } from "~/utils/types";
import { getContent } from "../mock";
import { MessagePlayground } from "~/components/messages";

type Props = {
  params: { id: string };
};

export default function IdSpecificMessageView({ params }: Props) {
  const [data, setData] = useState<MessageScreen>();

  useEffect(() => {
    setData(getContent(params.id));
  }, []);

  return (
    <div className="w-full h-screen items-center justify-center flex flex-col">
      {data ? <MessagePlayground {...data} /> : <p>No data found!</p>}
    </div>
  );
}
