import { Request } from 'express';
import { Accessor } from '../core/providers/controller/AccessorDecorator';
import { Controller } from '../core/providers/controller/Controller';
import { Req } from '../core/providers/controller/ParamsBinder';
import { Property } from '../core/providers/controller/PropertyDecorator';
import { Get } from '../core/providers/controller/routesBinder';

@Controller()
export class AdminController {
  @Property()
  admin: string = '';

  @Accessor()
  get adminItem() {
    return 'My Item';
  }

  constructor() {}

  @Get('/')
  dashboard(@Req req: Request) {
    console.log('Dashboard running... 🚩🚩🚩🚩🚩');
    return '<h1>Test Dashboard</h2>';
  }
}
