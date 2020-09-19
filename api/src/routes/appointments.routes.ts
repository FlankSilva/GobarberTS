import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';
import Appointment from '../models/Appointment';

const appointmentRouter = Router();

const appointments: Appointment[] = [];

appointmentRouter.post('/', (request, response) => {
  const { provider, date } = request.body;

  const parserDate = startOfHour(parseISO(date));

  const findByDate = appointments.find(appointment =>
    isEqual(parserDate, appointment.date),
  );

  if (findByDate)
    return response
      .status(400)
      .json({ error: 'This appointments is already book' });

  const appointment = new Appointment({ provider, date });

  appointments.push(appointment);

  response.json(appointment);
});

export default appointmentRouter;
