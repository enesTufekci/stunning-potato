import * as React from "react";
import { SettingsContext } from "./SettingsContext";
import { Project } from "./types";

export let NewProjectForm: React.FC = () => {
  let { addProject } = React.useContext(SettingsContext);
  let [newProject, setNewProject] = React.useState<Project>({
    name: "",
    googleSheetId: "",
    columns: "",
    weightColumnName: "",
  });

  let handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      Object.values(newProject).filter((i) => i === null && i === "").length < 2
    ) {
      addProject(newProject);
    }
  };

  let handleChange = (name: string) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    let { value } = e.target;
    setNewProject((project) => ({ ...project, [name]: value }));
  };

  let columns = newProject.columns.split(",");

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">Project Name</label>
        <input
          onChange={handleChange("name")}
          type="text"
          name="name"
          value={newProject.name}
        />
      </div>
      <div>
        <label htmlFor="googleSheetId">Google Sheet Id</label>
        <input
          onChange={handleChange("googleSheetId")}
          type="text"
          name="googleSheetId"
          value={newProject.googleSheetId}
        />
      </div>
      <div>
        <label htmlFor="columns">Columns (seperate with comma)</label>
        <input
          onChange={handleChange("columns")}
          type="text"
          name="columns"
          value={newProject.columns}
        />
      </div>
      <div>
        <label htmlFor="weightColumnName">Weight Column Name</label>
        <select
          onChange={handleChange("weightColumnName")}
          name="weightColumnName"
          id="weightColumnName"
          defaultValue={columns[0]}
        >
          {columns.map((item, index) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export let Settings: React.FC = () => {
  let { projects, selectProject } = React.useContext(SettingsContext);

  return (
    <div>
      {projects.map((project) => (
        <div key={project.googleSheetId}>
          <button onClick={() => selectProject(project.googleSheetId)}>
            {project.name}
          </button>
        </div>
      ))}
      <NewProjectForm />
    </div>
  );
};
