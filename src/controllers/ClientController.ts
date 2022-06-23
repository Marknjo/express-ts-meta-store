import { Controller, Get, Post } from '../core';

@Controller()
export class clientController {
  @Get('/')
  homePage() {
    return '<h1>Test HomePage</h2>';
  }

  @Post('/about')
  aboutPage() {
    return '<h1>This is about page</h2>';
  }
}
