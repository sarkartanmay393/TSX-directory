"use client";

export default function ContentBody() {
  return (
    <div
      aria-label="main user content"
      className="h-full flex flex-1 flex-col gap-y-4 items-center p-8"
    >
      <center className="text-2xl font-bold">Welcome to TSX Chats</center>
    </div>
  );
}

const Nothing = () => {
  return <></>;
};
