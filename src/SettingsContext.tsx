import * as React from "react";
import { useLocalStorage } from "./utils/useLocalStorage";

import { Project } from "./types";

interface SettingContextValue {
  projects: Project[];
  selectedProject?: Project;
  removeProject: (id: string) => void;
  addProject: (project: Project) => void;
  selectProject: (projectId: string) => void;
}

export let SettingsContext = React.createContext({} as SettingContextValue);

export let SettingsProvider: React.FC = ({ children }) => {
  let [projects, setProjects] = useLocalStorage<Project[]>("projects", []);
  let [selectedProject, setSelectedProject] = useLocalStorage<string>(
    "selectedProject",
    ""
  );

  let removeProject = (id: string) => {
    setProjects(projects.filter((item) => item.googleSheetId !== id));
  };

  let addProject = (project: Project) => {
    setProjects([...projects, project]);
  };

  let selectProject = (projectId: string) => {
    setSelectedProject(projectId);
  };

  return (
    <SettingsContext.Provider
      value={{
        projects,
        selectedProject: projects.find(
          (item) => item.googleSheetId === selectedProject
        ),
        addProject,
        removeProject,
        selectProject,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};
