import { TbLayoutGridRemove } from "react-icons/tb";
import TaskDetailModel from "../models/TaskModel/TaskDetailModel";

const taskDetail: TaskDetailModel = {
  id: "08517915-4eca-4971-bec5-41ab4c11e366",
  name: "Create Odotaus for learing Nodejs",
  stage: "Doing",
  createdDate: new Date(2024, 3, 5),
  deadline: new Date(2024, 5, 17),
  description:
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
  isMyTask: true,
  labels: [
    {
      id: "9759e70d-f7e6-474a-9d8c-675a530ed469",
      name: "Bug",
      color: "#dc143c",
    },
    {
      id: "8e44543e-2f87-4cd3-8dd3-b7508c08d051",
      name: "Backend",
      color: "#d18b13",
    },
  ],
  tasks: [
    {
      id: "850ed03b-e568-4cae-a07d-1c331e5a01a4",
      name: "Create dashboard",
      deadline: new Date(2024, 3, 12),
      index: 0,
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC",
      isDone: true,
    },
    {
      id: "64e9b7d8-da24-479a-b181-e589c32f8535",
      name: "Create dashboard",
      deadline: new Date(2024, 3, 12),
      index: 0,
      description:
        "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC",
      isDone: true,
    },
  ],
  user: {
    id: "b5111b5c-7c1d-4bd9-a3f8-b758b12d7a6c",
    username: "NTSua",
    displayName: "Nguyen Thien Sua",
    avatar:
      "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-107.jpg",
  },
  isFollowing: true,
  createdBy: "Nguyen Van Admin",
  createdById: "a5111b5c-7c1d-4bd9-a3f8-b758b12d7a6c",
};

export default taskDetail;
