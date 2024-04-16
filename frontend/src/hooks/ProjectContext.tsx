import React, { ReactNode, useContext, useState } from "react";

interface Project {
    slug: string | null;
    setSlug: (slug: string) => void;
}

const ProjectContext = React.createContext<Project>({
    slug: localStorage.getItem("project"),
    setSlug: (slug: string) => {},
});

interface ProjectProviderProps {
    children: ReactNode;
}

export function ProjectProvider({ children }: ProjectProviderProps) {
    const [slug, setProjectSlug] = useState<string | null>(
        localStorage.getItem("project")
    );

    const setSlug = (slug: string) => {
        setProjectSlug(slug);
        localStorage.setItem("project", slug);
    };

    return (
        <ProjectContext.Provider
            value={{
                slug,
                setSlug,
            }}
        >
            {children}
        </ProjectContext.Provider>
    );
}

export const useProject = () => useContext(ProjectContext);
