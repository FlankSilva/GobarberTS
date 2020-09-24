import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentRepository from '../repositories/AppointmentRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';

const appointmentRouter = Router();

appointmentRouter.post('/', async (request, response) => {
  try {
    const { provider_id, date } = request.body;

    const parserDate = parseISO(date);

    const createAppointments = new CreateAppointmentService();

    const appointment = await createAppointments.execute({
      provider_id,
      date: parserDate,
    });

    return response.json(appointment);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

appointmentRouter.get('/', async (request, response) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);

  const appointments = await appointmentRepository.find();

  return response.json(appointments);
});

export default appointmentRouter;
