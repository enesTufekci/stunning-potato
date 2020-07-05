import { Item, Project } from "../types";

export function parser(project: Project, data: any): Item[] {
  return data.feed.entry.map((item: any) => {
    return project.columns.split(",").reduce((acc, next) => {
      return {
        ...acc,
        [next]: item[`gsx$${next}`]["$t"],
      };
    }, {});
  });
}
