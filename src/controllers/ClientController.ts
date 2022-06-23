import { Get } from '../core';

export class clientController {
  @Get('/')
  homePage() {
    console.log('clientController running... 🚩🚩🚩🚩🚩');
    return '<h1>Test HomePage</h2>';
  }
}
