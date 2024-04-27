import { useState } from "react";

export default function useStoreContext() {
  const [category, setCategory] = useState("Random");

  return { category, setCategory };
}
