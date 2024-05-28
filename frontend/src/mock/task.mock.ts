import { TbLayoutGridRemove } from "react-icons/tb";
import TaskDetailModel from "../models/TaskModel/TaskDetailModel";
import { Activity } from "../models/TaskModel/ActivityModel";
import { ActivityType } from "../enums/ActivityType";

export const taskDetail: TaskDetailModel = {
  id: "08517915-4eca-4971-bec5-41ab4c11e366",
  name: "Create Odotaus for learing Nodejs",
  stage: "Doing",
  createdDate: new Date(2024, 3, 5),
  deadline: new Date(2024, 5, 17),
  description: `## Horizontal Rules
___

## Blockquotes

> Blockquotes can also be nested...
>> ...by using additional greater-than signs right next to each other...
> > > ...or with spaces between arrows.

ABC


\`\`\` css
/* Custom styles for blockquotes */
.custom-blockquote {
  border-left: 4px solid #3498db;
  padding-left: 1em;
  margin-left: 0;
  font-style: italic;
  color: #555;
}
\`\`\`

## Tables

| Option | Description |
| ------ | ----------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |

Right aligned columns

| Option | Description |
| ------:| -----------:|
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default. |
| ext    | extension to be used for dest files. |


## Links

[link text](http://dev.nodeca.com)

[link with title](http://nodeca.github.io/pica/demo/ "title text!")

Autoconverted link https://github.com/nodeca/pica (enable linkify to see)

`,
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
      description: `## Typographic replacements

Enable typographer option to see result.

(c) (C) (r) (R) (tm) (TM) (p) (P) +-

test.. test... test..... test?..... test!....

!!!!!! ???? ,,  -- ---

"Smartypants, double quotes" and 'single quotes'


## Emphasis

**This is bold text**`,
      isDone: true,
      index: 1,
    },
    {
      id: "64e9b7d8-da24-479a-b181-e589c32f8535",
      name: "Create dashboard",
      deadline: new Date(2024, 3, 12),
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC
        
\`\`\` js
var foo = function (bar) {
  return bar++;  
};
console.log(foo(5));
\`\`\``,
      isDone: true,
      index: 2,
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
  createdBy: {
    id: "b5111b5c-7c1d-4bd9-a3f8-b758b12d7a6c",
    username: "Admin",
    displayName: "Nguyen Van Admin",
    avatar:
      "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-107.jpg",
  },
};

export const taskActivities: Activity[] = [
  {
    Doer: {
      id: "b5111b5c-7c1d-4bd9-a3f8-b758b12d7a6c",
      username: "NTSua",
      displayName: "Nguyen Thien Sua",
      avatar:
        "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-107.jpg",
    },
    Date: new Date(2024, 4, 26, 11, 17, 0),
    type: ActivityType.MarkCompleted,
    StageFrom: undefined,
    StageTo: undefined,
    SubTaskIndex: 1,
  },
  {
    Doer: {
      id: "b5111b5c-7c1d-4bd9-a3f8-b758b12d7a6c",
      username: "NTSua",
      displayName: "Nguyen Thien Sua",
      avatar:
        "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-107.jpg",
    },
    Date: new Date(2024, 4, 26, 11, 17, 0),
    type: ActivityType.MarkNotCompleted,
    StageFrom: undefined,
    StageTo: undefined,
    SubTaskIndex: 2,
  },
  {
    Doer: {
      id: "b5111b5c-7c1d-4bd9-a3f8-b758b12d7a6c",
      username: "NTSua",
      displayName: "Nguyen Thien Sua",
      avatar:
        "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-107.jpg",
    },
    Date: new Date(2024, 4, 26, 11, 17, 0),
    type: ActivityType.Move,
    StageFrom: {
      id: "b5111b5c-7c1d-4bd9-a3f8-b758b12d7a6a",
      name: "Doing",
    },
    StageTo: {
      id: "b5111b5c-7c1d-4bd9-a3f8-b758b12d7a6b",
      name: "Todo",
    },
    SubTaskIndex: undefined,
  },
  {
    Doer: {
      id: "b5111b5c-7c1d-4bd9-a3f8-b758b12d7a6c",
      username: "NTSua",
      displayName: "Nguyen Thien Sua",
      avatar:
        "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-107.jpg",
    },
    Date: new Date(2024, 4, 26, 11, 17, 0),
    type: ActivityType.Update,
    StageFrom: undefined,
    StageTo: undefined,
    SubTaskIndex: undefined,
  },
  {
    Doer: {
      id: "b5111b5c-7c1d-4bd9-a3f8-b758b12d7a6c",
      username: "NTSua",
      displayName: "Nguyen Thien Sua",
      avatar:
        "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-107.jpg",
    },
    Date: new Date(2024, 4, 26, 11, 17, 0),
    type: ActivityType.Close,
    StageFrom: undefined,
    StageTo: undefined,
    SubTaskIndex: undefined,
  },
];
