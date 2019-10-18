import { Router } from 'express';
import api from './api';

const router = Router();

router.use('/api', api);

router.get('/', (req, res) => {
  res.render('index');
});

export default router;
