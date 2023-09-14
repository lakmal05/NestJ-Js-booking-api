import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { DocumentService } from './document.service';
import { CreateDocumentDto, CreateStateDto, DynamicDto } from './dto';
import { response } from 'express';

//@Controller('document')
@Controller('country')
export class DocumentController {
  constructor(private readonly documentService: DocumentService) {}

  @Get('/getColumns')
  getTableCoulmns() {
    // console.log('res resived');
    return this.documentService.getTableCoulmns();
  }

  @Get('')
  async getAll(@Req() request: Request, @Res() response: Response) {
    console.log(response, 'Response');
    return this.documentService.getAll();
  }

  @Get(':country_id')
  getById(@Param('country_id', ParseIntPipe) country_id: number) {
    return this.documentService.getCountryById(country_id);
  }

  // @Post('')
  //  createHome(@Body() body: Record<string, any>) {
  // createDocument(@Body() body: any) {

  // @Post('')
  // createDocument(@Req() request: Request, @Res() response: Response) {
  //   console.log(response, 'Request');
  //   return this.documentService.createDocument();
  // }

  @Post('/state')
  createState(@Body() body: CreateStateDto) {
    return this.documentService.createState(body);
  }
}
