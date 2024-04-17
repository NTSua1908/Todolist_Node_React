import ProjectRole from "../../enums/ProjectRole";

interface ProjectMemberModel {
    id: string;
    username: string;
    displayName: string;
    avatar: string;
    grantedDate: Date;
    role: ProjectRole;
}

export default ProjectMemberModel;
