import { MessageScreen } from "~/utils/types";

export const getContent = (id: string) => {
  const data = _data.find((d) => d.id === id);
  return data;
};

const _data: MessageScreen[] = [
  {
    id: "asdBishnu",
    title: "Bishnu",
    icon: undefined,
    status: "Last seen decade ago",
    messages: [
      {
        id: "m1",
        text: "Hi Peter asdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdfasdflihasdlfhalskdjflkjasdlfjaklsjdfkjasdlkfjlksajdfkljasljdflkasjdfjaskljdf",
        sender: "tanmay",
        receiver: "jack",
        sentOn: "15:27::30:01:2024",
        read: false,
      },
      {
        id: "m2",
        text: "Hi Tanmay",
        sender: "jack",
        receiver: "tanmay",
        sentOn: "15:28::30:01:2024",
        read: false,
      },
      {
        id: "m3",
        text: "Hi Tanmay",
        sender: "jack",
        receiver: "tanmay",
        sentOn: "15:28::30:01:2024",
        read: false,
      },
      {
        id: "m4",
        text: "Hi Tanmay",
        sender: "jack",
        receiver: "tanmay",
        sentOn: "15:28::30:01:2024",
        read: false,
      },
      {
        id: "m5",
        text: "Hi Tanmay",
        sender: "jack",
        receiver: "tanmay",
        sentOn: "15:28::30:01:2024",
        read: false,
      },
      {
        id: "m6",
        text: "Hi Tanmay",
        sender: "jack",
        receiver: "tanmay",
        sentOn: "15:28::30:01:2024",
        read: false,
      },
      {
        id: "m7",
        text: "Hi Tanmay",
        sender: "tanmay",
        receiver: "jack",
        sentOn: "15:28::30:01:2024",
        read: false,
      },
      {
        id: "m8",
        text: "Hi Tanmay",
        sender: "tanmay",
        receiver: "jack",
        sentOn: "15:28::30:01:2024",
        read: false,
      },
      {
        id: "m9",
        text: "Hi Tanmay",
        sender: "jack",
        receiver: "tanmay",
        sentOn: "15:28::30:01:2024",
        read: false,
      },
      {
        id: "m10",
        text: "Hi Tanmay",
        sender: "jack",
        receiver: "tanmay",
        sentOn: "15:28::30:01:2024",
        read: false,
      },
      {
        id: "m11",
        text: "Hi Tanmay",
        sender: "jack",
        receiver: "tanmay",
        sentOn: "15:28::30:01:2024",
        read: false,
      },
      {
        id: "m12",
        text: "Hi Tanmay",
        sender: "jack",
        receiver: "tanmay",
        sentOn: "05:28",
        read: false,
      },
    ],
  },
];
