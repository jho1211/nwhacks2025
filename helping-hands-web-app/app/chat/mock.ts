export const CONNECTIONS = [
  {
    id: "1",
    participants: ["1", "2"],
    status: "accepted",
    messages_id: "1",
  },
  {
    id: "2",
    participants: ["1", "3"],
    status: "pending",
    messages_id: "2",
  },
  {
    id: "3",
    participants: ["1", "4"],
    status: "rejected",
    messages_id: "3",
  },
];
export const MESSAGES_1 = {
  id: "1",
  messages: [
    {
      id: "1",
      sender_id: "1",
      status: "seen",
      content: "test",
      timestamp: new Date(),
      receiver_id: "2",
    },
    {
      id: "2",
      sender_id: "2",
      status: "seen",
      content: "test 2",
      timestamp: new Date(),
      receiver_id: "1",
    },
    {
      id: "1",
      sender_id: "1",
      status: "delivered",
      content: "test 3",
      timestamp: new Date(),
      receiver_id: "2",
    },
  ],
};

export const USERS = [
  //   {
  //     uid: "1",
  //     first_name: "First1",
  //     last_name: "Last1",
  //     bio: "foo",
  //     profile_img: "https://placehold.co/100/100",
  //     role: "mentee",
  //   },
  {
    uid: "2",
    first_name: "First2",
    last_name: "Last2",
    bio: "foo2",
    profile_img: "https://placehold.co/100/100",
    role: "mentor",
  },
  {
    uid: "3",
    first_name: "First3",
    last_name: "Last3",
    bio: "foo3",
    profile_img: "https://placehold.co/100/100",
    role: "mentor",
  },
  {
    uid: "4",
    first_name: "First4",
    last_name: "Last4",
    bio: "foo4",
    profile_img: "https://placehold.co/100/100",
    role: "mentor",
  },
];
