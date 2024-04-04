import api from "./API";

const BASE_URL_TAG = "task/";

export function GetAllTask(searchText, page, amount) {
  return api.get(BASE_URL_TAG + "GetAll", {
    params: {
      searchText,
      page,
      amount,
    },
  });
}

export function Create(task) {
  return api.post(BASE_URL_TAG + "Create", {
    name: task.name,
    description: task.description,
  });
}

export function Update(id, task) {
  return api.put(BASE_URL_TAG + "Update/" + id, {
    name: task.name,
    description: task.description,
  });
}

export function Delete(id) {
  return api.delete(BASE_URL_TAG + "Delete/" + id);
}

export function toggleDoneTask(id) {
  return api.delete(BASE_URL_TAG + "ToggleDoneTask/" + id);
}
