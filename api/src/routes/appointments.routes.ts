import { Router } from 'express';
import { uuid } from 'uuidv4';
import { startOfHour, parseISO, isEqual } from 'date-fns';

const appointmentRouter = Router();

interface Appointment {
  id: string;
  provider: string;
  date: Date;
}

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

  const appointment = {
    id: uuid(),
    provider,
    date: parserDate,
  };

  appointments.push(appointment);

  response.json(appointment);
});

export default appointmentRouter;
