import UserShortModel from "../User/UserShortModel";

export type CommentDetailModel = {
  id: string;
  user: UserShortModel;
  content: string;
  replyFor: UserShortModel;
  replyCount: number;
  createdDate: Date;
  updatedDate?: Date;
  isMyComment: boolean;
  replies: CommentDetailModel[];
};

export type CommentCreateModel = {
  content: string;
  replyFor: string;
  parentId?: string;
  taskId: string;
};

export type CommentUpdateModel = {
  content: string;
};
