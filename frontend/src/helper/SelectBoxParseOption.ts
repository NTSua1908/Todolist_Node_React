import { SelectBoxOption } from "../components/SelectBox/SelectBox";
import ProjectListModel from "../models/ProjectModel/ProjectListModel";

export function ParseProjectsToSelectBoxOptions(
  projects: ProjectListModel[]
): SelectBoxOption[] {
  return projects.map((project) => {
    return {
      name: project.name,
      value: project.id,
    };
  });
}
