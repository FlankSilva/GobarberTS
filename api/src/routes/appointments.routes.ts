import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';

import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const appointmentRouter = Router();

appointmentRouter.use(ensureAuthenticated);

appointmentRouter.post('/', async (request, response) => {
  const { provider_id, date } = request.body;

  const parserDate = parseISO(date);

  const createAppointments = new CreateAppointmentService();

  const appointment = await createAppointments.execute({
    provider_id,
    date: parserDate,
  });

  return response.json(appointment);
});

appointmentRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

export default appointmentRouter;
