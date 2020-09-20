import { Router } from 'express';
import { parseISO } from 'date-fns';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();
const appointmentRepository = new AppointmentRepository();

appointmentRouter.post('/', (request, response) => {
  try {
    const { provider, date } = request.body;

    const parserDate = parseISO(date);

    const createAppointments = new CreateAppointmentService(
      appointmentRepository,
    );

    const appointment = createAppointments.execute({
      provider,
      date: parserDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentRouter.get('/', (request, response) => {
  const appointments = appointmentRepository.all();

  return response.json(appointments);
});

export default appointmentRouter;
