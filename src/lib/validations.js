import { z } from 'zod';

export const bookingSchema = z.object({
  name: z.string().min(2, { message: 'Nome deve ter no mínimo 2 caracteres' }),
  email: z.string().email({ message: 'E-mail inválido' }),
  phone: z.string().optional(),
  service: z.string().min(1, { message: 'Selecione um serviço' }),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Formato de data inválido' }),
  time: z.string().regex(/^\d{2}:\d{2}$/, { message: 'Formato de hora inválido' }),
  notes: z.string().max(500, { message: 'Observações muito longas (máx 500 caracteres)' }).optional(),
});
