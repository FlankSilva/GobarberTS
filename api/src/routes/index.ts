import { Router } from 'express';
import appointmentRouter from './appointments.routes';
import userRouter from './user.routes';
import sessionsRouter from './session.routes';

const routes = Router();

routes.use('/appointments', appointmentRouter);
routes.use('/users', userRouter);
routes.use('/session', sessionsRouter);

export default routes;
