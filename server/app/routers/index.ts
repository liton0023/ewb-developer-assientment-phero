import express, { Router } from 'express';
import { ProjectRouter } from '../model/projects/projects.route';
const routers: Router = express.Router();

const modulRoutes = [
  {
    path: '/projects',
    route: ProjectRouter,
  },
];

modulRoutes.forEach(route => routers.use(route.path, route.route));

export default routers;
