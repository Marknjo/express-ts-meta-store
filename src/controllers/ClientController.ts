import { Controller, Get } from '../core';

@Controller()
export class clientController {
  @Get('/')
  homePage() {
    return '<h1>Test HomePage</h2>';
  }

  @Get('/about')
  aboutPage() {
    return '<h1>This is about page</h2>';
  }
}
