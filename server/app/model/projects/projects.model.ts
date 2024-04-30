import { Schema, model } from 'mongoose';
import { IProjects, ProjectsModel } from './projects.interface';

const ProjectsSchema = new Schema<IProjects, ProjectsModel>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Projects = model<IProjects, ProjectsModel>(
  'Projects',
  ProjectsSchema,
);
