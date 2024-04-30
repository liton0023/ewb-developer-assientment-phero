import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponce';
import { paginationFields } from '../../constants/pagination';
import { projectsFilterableFields } from './projects.consstants';
import { IProjects } from './projects.interface';
import { ProjectService } from './projects.server';

const createProject = catchAsync(async (req: Request, res: Response) => {
  const { ...projectsData } = req.body;

  const result = await ProjectService.createProject(projectsData);
  sendResponse<IProjects>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects created successfully',
    data: result,
  });
});

const getAllprojects = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, projectsFilterableFields);
  const paginationOptions = pick(req.query, paginationFields);

  const result = await ProjectService.getAllProjects(
    filters,
    paginationOptions,
  );

  sendResponse<IProjects[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects fetched successfully',
    data: result,
  });
});

const updateProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const updateData = req.body;
  const result = await ProjectService.updateProject(id, updateData);
  sendResponse<IProjects>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Projects updated successfully',
    data: result,
  });
});

const deleteProject = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const result = await ProjectService.deleteProject(id);
  sendResponse<IProjects>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'project deleted successfully',
    data: result,
  });
});

export const ProjectControler = {
  createProject,
  getAllprojects,
  updateProject,
  deleteProject,
};
