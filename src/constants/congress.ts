export type AgendaEntry = {
  start: string;
  end: string;
  title: string;
  speaker?: string;
  tag?: 'Apertura' | 'Pausa';
};

export type AgendaRoom = {
  name: string;
  entries: AgendaEntry[];
};

export type AgendaDay = {
  id: string;
  label: string;
  rooms: AgendaRoom[];
};

const pausa = (start: string, end: string, title: string): AgendaEntry => ({ start, end, title, tag: 'Pausa' });

export const congressAgenda: AgendaDay[] = [
  {
    id: 'dia-1',
    label: '25 Feb · Día 1',
    rooms: [
      {
        name: 'Sala 1',
        entries: [
          { start: '07:00', end: '09:00', title: 'Registro', tag: 'Apertura' },
          { start: '09:00', end: '09:45', title: 'Análisis de orina rápido como maniobra semiológica', speaker: 'Dr. Paludi' },
          { start: '10:00', end: '10:45', title: 'PCR LAMP en la clínica felina', speaker: 'Dr. Lugo' },
          pausa('11:00', '11:30', 'Receso'),
          { start: '11:30', end: '12:15', title: 'Manejo de las emergencias en los gatos pediátricos', speaker: 'Dr. Michael Villa' },
          pausa('12:15', '14:00', 'Almuerzo'),
          { start: '14:00', end: '14:45', title: 'Gastritis Crónica Felina', speaker: 'Dr. Bruzzone' },
          { start: '15:00', end: '15:45', title: 'Características farmacológicas de los gatos', speaker: 'Dr. Michael Villa' },
          pausa('16:00', '16:30', 'Receso'),
          { start: '16:30', end: '17:15', title: 'Diarrea crónica en gatos', speaker: 'Dr. Michael Villa' },
          { start: '17:30', end: '18:15', title: 'Interpretación de la disnea por efusión pleural', speaker: 'Dr. Paludi' },
        ],
      },
      {
        name: 'Sala 2',
        entries: [
          { start: '07:00', end: '09:00', title: 'Registro', tag: 'Apertura' },
          { start: '09:00', end: '09:45', title: 'Abordaje diagnóstico del paciente hepático', speaker: 'Dr. Lugo' },
          { start: '10:00', end: '10:45', title: 'El Arte de Cobrar por la Especialidad Felina', speaker: 'Dra. Alejandra Mejia' },
          pausa('11:00', '11:30', 'Receso'),
          { start: '11:30', end: '12:15', title: 'Manejo racional del flutd', speaker: 'Dr. Paludi' },
          pausa('12:15', '14:00', 'Almuerzo'),
          { start: '14:00', end: '14:45', title: 'Triaditis como se diagnóstica y trata', speaker: 'Dr. Paludi' },
          { start: '15:00', end: '15:45', title: 'Marketing de Atracción Felina', speaker: 'Dra. Alejandra Mejia' },
          pausa('16:00', '16:30', 'Receso'),
          { start: '16:30', end: '17:15', title: 'Esofagitis y manejo de cuerpos extraños', speaker: 'Dr. Bruzzone' },
          { start: '17:30', end: '18:15', title: 'Citología diagnóstica: Líquidos corporales', speaker: 'Dr. Lugo' },
        ],
      },
    ],
  },
  {
    id: 'dia-2',
    label: '26 Feb · Día 2',
    rooms: [
      {
        name: 'Sala 1',
        entries: [
          { start: '09:00', end: '09:45', title: 'Dolor en gatos, estrategias de la medicina interna', speaker: 'Dr. Michael Villa' },
          { start: '10:00', end: '10:45', title: 'Peritonitis infecciosa lo importante es el diagnóstico', speaker: 'Dr. Paludi' },
          pausa('11:00', '11:30', 'Receso'),
          { start: '11:30', end: '12:15', title: 'Estrés conocerlo es entender el camino a la clínica', speaker: 'Dr. Paludi' },
          pausa('12:15', '14:00', 'Almuerzo'),
          { start: '14:00', end: '14:45', title: 'Rinitis y sinusitis', speaker: 'Dr. Bruzzone' },
          { start: '15:00', end: '15:45', title: 'Lavado traqueobronquial en gatos', speaker: 'Dr. Lugo' },
          pausa('16:00', '16:30', 'Receso'),
          { start: '16:30', end: '17:15', title: 'Corticoides ángeles o demonios', speaker: 'Dr. Paludi' },
          { start: '17:30', end: '18:15', title: 'Lesión renal aguda en gatos', speaker: 'Dr. Michael Villa' },
        ],
      },
      {
        name: 'Sala 2',
        entries: [
          { start: '09:00', end: '09:45', title: 'Abordaje diagnóstico del VIF', speaker: 'Dr. Lugo' },
          { start: '10:00', end: '10:45', title: 'El Modelo CVI y la Ética como Estrategia de Negocio', speaker: 'Dra. Alejandra Mejia' },
          pausa('11:00', '11:30', 'Receso'),
          { start: '11:30', end: '12:15', title: 'Abordaje diagnóstico de la diabetes felina', speaker: 'Dr. Lugo' },
          pausa('12:15', '14:00', 'Almuerzo'),
          { start: '14:00', end: '14:45', title: 'Manejo de la anemia en gatos', speaker: 'Dr. Michael Villa' },
          { start: '15:00', end: '15:45', title: 'Disrupción en el Modelo de Negocio Felino', speaker: 'Dra. Alejandra Mejia' },
          pausa('16:00', '16:30', 'Receso'),
          { start: '16:30', end: '17:15', title: 'Laringitis obstructiva', speaker: 'Dr. Bruzzone' },
          { start: '17:30', end: '18:15', title: 'Abordaje diagnóstico del pénfigo felino', speaker: 'Dr. Lugo' },
        ],
      },
    ],
  },
];
