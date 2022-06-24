import { Request } from 'express';
import { Controller, Get, Req } from '../core';

@Controller()
export class AdminController {
  @Get('/dashboard')
  dashboard(@Req req: Request) {
    console.log('Dashboard running... 🚩🚩🚩🚩🚩');
    return '<h1>Test Dashboard</h2>';
  }
}
