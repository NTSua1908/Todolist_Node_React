import { ActivityType } from "../../enums/ActivityType";
import { StageShortModel } from "../StageModel/StageCommonModel";
import UserShortModel from "../User/UserShortModel";

export type Activity = {
  type: ActivityType;
  Doer: UserShortModel;
  StageFrom?: StageShortModel;
  StageTo?: StageShortModel;
  SubTaskIndex?: number;
  Date: Date;
};
