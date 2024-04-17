import { SelectBoxOption } from "../components/SelectBox/SelectBox";
import ProjectRole from "../enums/ProjectRole";

export function generateSlug(name: string): string {
    const randomString = Math.random().toString(36).substr(2, 8); // Generate random string
    const baseSlug = name
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-")
        .replace(/-+/g, "-")
        .trim();
    return `${baseSlug}-${randomString}`;
}

//Color
const progressColor = {
    Level1: "#ff2b2b",
    Level2: "#ef7900",
    Level3: "#fa9d47",
    Level4: "#dce627",
    Level5: "#77d501",
};

export const getProgressColor = (percent: number) => {
    if (percent <= 0.3) return progressColor.Level1;
    if (percent <= 0.5) return progressColor.Level2;
    if (percent <= 0.8) return progressColor.Level3;
    if (percent < 1) return progressColor.Level4;
    return progressColor.Level5;
};

export const projectRoles: SelectBoxOption[] = [
    {
        name: ProjectRole[ProjectRole.Editor],
        value: ProjectRole.Editor,
    },
    {
        name: ProjectRole[ProjectRole.Viewer],
        value: ProjectRole.Viewer,
    },
];
