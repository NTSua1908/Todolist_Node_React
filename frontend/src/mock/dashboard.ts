import ColumnDashboardModel from "../models/ColumnsModel/ColumnsDashboardModel";
import UserShortModel from "../models/User/UserShortModel";

export const users: UserShortModel[] = [
  {
    id: "b5111b5c-7c1d-4bd9-a3f8-b758b12d7a6c",
    username: "NTSua",
    avatar:
      "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-107.jpg",
  },
  {
    id: "94c84df6-580a-4898-8ac6-fb554244cf0f",
    username: "smith",
    avatar:
      "https://i.pinimg.com/236x/12/37/b3/1237b30268db9ee0c9cbe3a79b1ff8fa.jpg",
  },
  {
    id: "de7b4bcf-7fb7-4a04-b76c-5851fbb7ecd6",
    username: "john",
    avatar: "https://i.9mobi.vn/cf/Images/tt/2021/8/20/anh-avatar-dep-61.jpg",
  },
];

export const dashboard: ColumnDashboardModel[] = [
  {
    id: "b9fd94b7-c7de-4302-81bd-40fac3ab0c2b",
    name: "Open",
    tasks: [
      {
        id: "fecb332f-b580-4f45-8968-761312bff30d",
        name: "Create Dashboard",
        index: 10,
        labels: [
          {
            id: "f114be37-f091-4080-96d7-8c8412be6ee4",
            name: "Frontend",
            color: "#6699cc",
          },
        ],
        user: users[0],
        taskDoneCount: 8,
        taskTotalCount: 10,
      },
      {
        id: "e7f0ca27-eebe-4226-ac54-e3caed4a6cee",
        name: "Create Task Component",
        index: 10,
        labels: [
          {
            id: "f114be37-f091-4080-96d7-8c8412be6ee4",
            name: "Frontend",
            color: "#6699cc",
          },
        ],
        user: users[1],
        taskDoneCount: 9,
        taskTotalCount: 10,
      },
    ],
  },
  {
    id: "b908b0ce-c8e8-4590-b110-1f2be72f555e",
    name: "Todo",
    tasks: [
      {
        id: "0e8c2b59-c4c9-45ef-b42b-06114a0f2f73",
        name: "Create Table Columns, Label",
        index: 10,
        labels: [
          {
            id: "8e44543e-2f87-4cd3-8dd3-b7508c08d051",
            name: "Backend",
            color: "#d18b13",
          },
        ],
        user: users[2],
        taskDoneCount: 2,
        taskTotalCount: 10,
      },
      {
        id: "45c541f5-3911-44a0-9968-596b58ea2740",
        name: "Bug login",
        index: 10,
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
        user: users[2],
        taskDoneCount: 4,
        taskTotalCount: 10,
      },
    ],
  },
  {
    id: "d1e8bcb8-71d5-4548-9eb7-5956f8d390ca",
    name: "Review",
    tasks: [
      {
        id: "5388b868-21d9-48e7-804f-bbc904560655",
        name: "Create Table Columns, Label",
        index: 10,
        labels: [
          {
            id: "8e44543e-2f87-4cd3-8dd3-b7508c08d051",
            name: "Backend",
            color: "#d18b13",
          },
        ],
        user: users[2],
        taskDoneCount: 6,
        taskTotalCount: 10,
      },
      {
        id: "b0228da0-32d1-4eba-979f-f505d4a6d002",
        name: "Bug login",
        index: 10,
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
        user: users[2],
        taskDoneCount: 10,
        taskTotalCount: 10,
      },
      {
        id: "cd8db224-0c4a-42d5-9c45-6be9fd0fe5ac",
        name: "Create Table Columns, Label Create Table Columns, Label, Create Table Columns, Label Create Table Columns, Label",
        index: 10,
        labels: [
          {
            id: "8e44543e-2f87-4cd3-8dd3-b7508c08d051",
            name: "Backend",
            color: "#d18b13",
          },
        ],
        user: users[2],
        taskDoneCount: 4,
        taskTotalCount: 10,
      },
      {
        id: "e5932ef3-595e-4537-8836-8df688f76c4a",
        name: "Bug login",
        index: 10,
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
        user: users[2],
        taskDoneCount: 4,
        taskTotalCount: 10,
      },
      {
        id: "1696f38f-1019-4a04-bf74-6b576b6af975",
        name: "Create Table Columns, Label",
        index: 10,
        labels: [
          {
            id: "8e44543e-2f87-4cd3-8dd3-b7508c08d051",
            name: "Backend",
            color: "#d18b13",
          },
        ],
        user: users[2],
        taskDoneCount: 4,
        taskTotalCount: 10,
      },
      {
        id: "1754d715-152a-403f-898e-bf8a3f45f916",
        name: "Bug login",
        index: 10,
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
        user: users[2],
        taskDoneCount: 4,
        taskTotalCount: 10,
      },
      {
        id: "45d63068-a8fb-4679-ba72-bf5e0f8bc3e9",
        name: "Create Table Columns, Label",
        index: 10,
        labels: [
          {
            id: "8e44543e-2f87-4cd3-8dd3-b7508c08d051",
            name: "Backend",
            color: "#d18b13",
          },
        ],
        user: users[2],
        taskDoneCount: 4,
        taskTotalCount: 10,
      },
      {
        id: "e9e04361-cdf5-497e-ab66-52906e8b24a7",
        name: "Bug login",
        index: 10,
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
        user: users[2],
        taskDoneCount: 4,
        taskTotalCount: 10,
      },
      {
        id: "a54fd316-5a2b-4023-b451-fa5f225af4f0",
        name: "Create Table Columns, Label",
        index: 10,
        labels: [
          {
            id: "8e44543e-2f87-4cd3-8dd3-b7508c08d051",
            name: "Backend",
            color: "#d18b13",
          },
        ],
        user: users[2],
        taskDoneCount: 4,
        taskTotalCount: 10,
      },
      {
        id: "24b8e45a-b642-42fa-a9c9-bd3783eb4f07",
        name: "Bug login",
        index: 10,
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
        user: users[2],
        taskDoneCount: 4,
        taskTotalCount: 10,
      },
      {
        id: "7bf88444-6f28-403b-adce-bc1f7f290a34",
        name: "Create Table Columns, Label",
        index: 10,
        labels: [
          {
            id: "8e44543e-2f87-4cd3-8dd3-b7508c08d051",
            name: "Backend",
            color: "#d18b13",
          },
        ],
        user: users[2],
        taskDoneCount: 4,
        taskTotalCount: 10,
      },
      {
        id: "e7f558c2-d4d9-4ebc-a9d2-d6e967b1c053",
        name: "Bug login",
        index: 10,
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
        user: users[2],
        taskDoneCount: 4,
        taskTotalCount: 10,
      },
    ],
  },
  {
    id: "0efff7ab-661a-4bc3-859b-62daaee66de6",
    name: "Done",
    tasks: [
      {
        id: "1e87157b-f92b-45a5-a0ca-665f087f67da",
        name: "Create Dashboard",
        index: 10,
        labels: [
          {
            id: "f114be37-f091-4080-96d7-8c8412be6ee4",
            name: "Frontend",
            color: "#6699cc",
          },
        ],
        user: users[0],
        taskDoneCount: 8,
        taskTotalCount: 10,
      },
      {
        id: "f11c3b46-2be9-4ae3-a626-acf097557ab3",
        name: "Create Task Component",
        index: 10,
        labels: [
          {
            id: "f114be37-f091-4080-96d7-8c8412be6ee4",
            name: "Frontend",
            color: "#6699cc",
          },
        ],
        user: users[1],
        taskDoneCount: 9,
        taskTotalCount: 10,
      },
    ],
  },
];
