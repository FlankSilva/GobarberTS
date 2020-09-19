import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';

const appointmentRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parserDate = startOfHour(parseISO(date));

  const findByDate = appointmentRepository.findByDate(parserDate);

  if (findByDate)
    return response
      .status(400)
      .json({ error: 'This appointments is already book' });

  const appointment = appointmentRepository.create({ provider, date });

  response.json(appointment);
});

export default appointmentRouter;
