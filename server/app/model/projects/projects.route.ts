import express, { Router } from 'express';
import { ProjectControler } from './projects.controller';

const router: Router = express.Router();

router.post('/create-project', ProjectControler.createProject);
router.get('/', ProjectControler.getAllprojects);
router.patch('/:id', ProjectControler.updateProject);
router.delete('/:id', ProjectControler.deleteProject);

export const ProjectRouter = router;
