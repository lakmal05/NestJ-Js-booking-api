import { Controller, Get, Param, ParseIntPipe, Res } from '@nestjs/common';
import { TablesService } from './tables.service';
import { Response } from 'express';

@Controller('tables')
export class TablesController {
  constructor(private readonly tablesService: TablesService) {}

  @Get('')
  getTables() {
    return this.tablesService.getTables();
  }

  @Get(':table_id')
  getTableById(@Param('table_id', ParseIntPipe) table_id: number) {
    console.log(table_id);
    return this.tablesService.getTableById(table_id);
  }
  @Get('/getColumns/:table_name')
  getTableColumns(@Param('table_name') table_name: string) {
    return this.tablesService.getTableCoulmns(table_name);
  }
}
