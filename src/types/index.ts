import {z} from 'zod';

//** Projects */
export const projectSchema = z.object({
  _id: z.string(),
  projectName: z.string(),
  clientName: z.string(),
  description: z.string(),
  tasks: z.array(z.string()),
});

export type Project = z.infer<typeof projectSchema>;
export type ProjectFormData = Pick<Project, 'clientName' | 'projectName' | 'description'>;