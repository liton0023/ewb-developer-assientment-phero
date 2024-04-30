import { Model } from 'mongoose';

export type IProjects = {
  title: string;
};

export type ProjectsModel = Model<IProjects, Record<string, unknown>>;

export type IProjectsFilters = {
  searchTerm?: string;
};
