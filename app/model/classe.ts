import { Major } from './major';
import { ScheduleSheet } from './schedule-sheet';

export interface Classe {
  id: number;
  name: string;
  major?: Major | null;
  scheduleSheet?: ScheduleSheet | null;
}
