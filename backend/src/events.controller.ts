// events.controller.ts
import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { Event } from './event.entity';

@Controller('events')
export class EventsController {
  constructor(private readonly prisma: PrismaService) {}

  @Post()
  async create(@Body() eventData: Event) {
    return this.prisma.event.create({ data: eventData });
  }

  @Get()
  async findAll() {
    return this.prisma.event.findMany();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.prisma.event.findUnique({ where: { id } });
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() eventData: Event) {
    return this.prisma.event.update({ where: { id }, data: eventData });
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.prisma.event.delete({ where: { id } });
  }
}