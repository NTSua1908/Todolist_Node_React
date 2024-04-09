import TaskCreateModel from "../models/TaskModel/TaskCreateModel";
import TaskUpdateModel from "../models/TaskModel/TaskUpdateModel";
import api from "./API";

const BASE_URL_TAG = "task/";

export function GetAllTask(searchText: string, page: number, amount: number) {
  return api.get(BASE_URL_TAG + "GetAll", {
    params: {
      searchText,
      page,
      amount,
    },
  });
}

export function Create(task: TaskCreateModel) {
  return api.post(BASE_URL_TAG + "Create", task);
}

export function Update(id: string, task: TaskUpdateModel) {
  return api.put(BASE_URL_TAG + "Update/" + id, task);
}

export function Delete(id: string) {
  return api.delete(BASE_URL_TAG + "Delete/" + id);
}
