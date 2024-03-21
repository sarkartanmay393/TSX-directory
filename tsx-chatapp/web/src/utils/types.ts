export type MessageScreen = {
  id: string;
  title: string;
  icon?: any;
  messages: Message[];
  status: string;
};

export type Message = {
  id: string;
  text: string;
  sender: string;
  receiver: string;
  sentOn: string;
  read: boolean;
  groupId?: string;
};

// acceptable paths, rest to 404 page
export const GrandSidebarPaths = [
  "/messages",
  "/groups",
  "/explore",
];
