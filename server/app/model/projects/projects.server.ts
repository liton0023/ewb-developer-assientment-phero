import { SortOrder } from 'mongoose';
import { paginationHelpers } from '../../helpers/paginationHelpers';
import { IPaginationOptions } from '../../interface/pagination';
import { projectsSearchableFields } from './projects.consstants';
import { IProjects, IProjectsFilters } from './projects.interface';
import { Projects } from './projects.model';

const createProject = async (payload: IProjects): Promise<IProjects | null> => {
  const result = await Projects.create(payload);
  return result;
};

const getAllProjects = async (
  filters: IProjectsFilters,
  paginationOptions: IPaginationOptions,
): Promise<IProjects[]> => {
  const { searchTerm, ...filtersData } = filters;
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(paginationOptions);

  const andContitions = [];
  if (searchTerm) {
    andContitions.push({
      $or: projectsSearchableFields.map(field => ({
        [field]: {
          $regex: searchTerm,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andContitions.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const sortConditions: { [key: string]: SortOrder } = {};
  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }
  const whereConditions = andContitions.length ? { $and: andContitions } : {};
  const result = await Projects.find(whereConditions)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit);

  const total = await Projects.countDocuments(whereConditions);

  return result;
};

const updateProject = async (
  id: string,
  payload: Partial<IProjects>,
): Promise<IProjects | null> => {
  const result = await Projects.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

const deleteProject = async (id: string): Promise<IProjects | null> => {
  const result = await Projects.findByIdAndDelete(id);
  return result;
};

export const ProjectService = {
  createProject,
  getAllProjects,
  updateProject,
  deleteProject,
};
