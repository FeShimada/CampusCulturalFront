// event.entity.ts
import { Prisma } from '@prisma/client';

export class Event implements Prisma.EventUncheckedCreateInput {
  id?: string; // Garante que o id seja do tipo string ou undefined
  title: string;
  content?: string;
  published?: boolean;
  authorId: string; // Certifica-se de que o authorId seja sempre do tipo string
}