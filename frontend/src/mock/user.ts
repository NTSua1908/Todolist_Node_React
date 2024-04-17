import UserSelectModel from "../models/User/UserSelectModel";
import ProjectMemberModel from "../models/User/ProjectMemberModel";
import ProjectRole from "../enums/ProjectRole";

export const userLogin: UserGetByTokenModel = {
    id: "b5111b5c-7c1d-4bd9-a3f8-b758b12d7a6c",
    username: "NTSua",
    displayName: "Nguyen Thien Sua",
    role: "User",
    avatar: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-107.jpg",
};

export const userSelects: UserSelectModel[] = [
    {
        id: "4e90dfb0-3e30-44a0-bf44-3eeb7a6079b0",
        username: "JohnDoe",
    },
    {
        id: "fd0af144-46bb-4d36-b06e-5e7d9ccba412",
        username: "JaneSmith",
    },
    {
        id: "b8a44876-ccab-44ff-9e37-657b9ac49d8c",
        username: "MikeJohnson",
    },
    {
        id: "20e3ab05-302c-4457-a0cc-1b918d4d4377",
        username: "EmilyBrown",
    },
    {
        id: "93d96b6b-2d53-4e06-842f-15ff46a8eddb",
        username: "DavidWilson",
    },
    {
        id: "03783d49-149c-45de-b8d1-7e0152454cf5",
        username: "SophiaMiller",
    },
    {
        id: "c4cfb5a1-96b3-46a2-85b7-3a5f5358b569",
        username: "JamesTaylor",
    },
    {
        id: "53ee18df-6dc7-40b6-9aa6-c3ad630e8242",
        username: "OliviaClark",
    },
    {
        id: "f5c3e3a0-67b8-47a5-bc11-1fb8b9305ebf",
        username: "WilliamAnderson",
    },
    {
        id: "78ff25d3-4652-4a0d-95a2-2d50e781f7b5",
        username: "AmeliaMartinez",
    },
    {
        id: "91b77bbd-915e-47b4-bd2e-5a3c7d35cbf7",
        username: "EthanHernandez",
    },
    {
        id: "3ff9c4e2-87ae-4bbd-97d1-b63d8b035e7e",
        username: "IsabellaYoung",
    },
    {
        id: "94d92fa2-273a-4a02-b245-453a293332c1",
        username: "NoahKing",
    },
    {
        id: "b2c3c2fb-8cf5-421a-b8b0-831a43b40848",
        username: "AvaGarcia",
    },
    {
        id: "184f37f1-3434-4e71-9e97-73d084c4fe4d",
        username: "LiamRivera",
    },
];

export const userProjectMembes: ProjectMemberModel[] = [
    {
        id: "b5111b5c-7c1d-4bd9-a3f8-b758b12d7a6c",
        username: "NTSua",
        displayName: "Nguyen Thien Sua",
        avatar: "https://cdn.sforum.vn/sforum/wp-content/uploads/2023/11/avatar-dep-107.jpg",
        grantedDate: new Date(2024, 2, 4),
        role: ProjectRole.Owner,
    },
    {
        id: "4e90dfb0-3e30-44a0-bf44-3eeb7a6079b0",
        username: "JohnDoe",
        displayName: "John Doe",
        avatar: "https://imgt.taimienphi.vn/cf/Images/tt/2021/8/20/top-anh-dai-dien-dep-chat-42.jpg",
        grantedDate: new Date(2024, 2, 4),
        role: ProjectRole.Editor,
    },
    {
        id: "fd0af144-46bb-4d36-b06e-5e7d9ccba412",
        username: "JaneSmith",
        displayName: "Jane Smith",
        avatar: "https://top10binhphuoc.vn/wp-content/uploads/2022/10/avatar-gau-cute-16.jpg",
        grantedDate: new Date(2024, 2, 4),
        role: ProjectRole.Editor,
    },
    {
        id: "b8a44876-ccab-44ff-9e37-657b9ac49d8c",
        username: "MikeJohnson",
        displayName: "Mike Johnson",
        avatar: "https://i.pinimg.com/564x/2b/0f/7a/2b0f7a9533237b7e9b49f62ba73b95dc.jpg",
        grantedDate: new Date(2024, 2, 4),
        role: ProjectRole.Editor,
    },
    {
        id: "20e3ab05-302c-4457-a0cc-1b918d4d4377",
        username: "EmilyBrown",
        displayName: "Emily Brown",
        avatar: "https://i.9mobi.vn/cf/Images/tt/2021/8/20/anh-avatar-dep-61.jpg",
        grantedDate: new Date(2024, 2, 4),
        role: ProjectRole.Viewer,
    },
    {
        id: "93d96b6b-2d53-4e06-842f-15ff46a8eddb",
        username: "DavidWilson",
        displayName: "David Wilson",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSYhOhQyLWEMMy2O35MG7SdOTMi3qll9zdJS-mYJmxgHufC9G4q2jT4EcP7RwE6_ChwiyY&usqp=CAU",
        grantedDate: new Date(2024, 2, 4),
        role: ProjectRole.Editor,
    },
    {
        id: "03783d49-149c-45de-b8d1-7e0152454cf5",
        username: "SophiaMiller",
        displayName: "Sophia Miller",
        avatar: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3ivJurQu4eGcmVlrHWS9QfC8W0cm_ULX6B0OOKLEkmVw_CR7DTAMf5OEDm1TU16yRVzQ&usqp=CAU",
        grantedDate: new Date(2024, 2, 4),
        role: ProjectRole.Viewer,
    },
];
