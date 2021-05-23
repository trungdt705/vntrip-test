import {
    Body,
    Controller,
    Delete,
    Get,
    HttpStatus,
    Param,
    ParseIntPipe,
    Post,
    Put,
    Req,
    UseGuards,
    UsePipes,
    Request,
} from '@nestjs/common';
import { AuthGuard } from '../guard/auth.guard';
import { CreateProductDto } from './dto/CreateProductDto';
import { ProductService } from './product.service';
import { JoiValidationPipe } from './validation/JoiValidationPipe';
import { VALIDATION } from './validation/product.validation';

@Controller('/product')
export class ProductController {
    constructor(private _productService: ProductService) {}
    @Get()
    async findAll(): Promise<CreateProductDto[]> {
        return this._productService.findAll();
    }

    @Get(':id')
    async getOne(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
    ): Promise<CreateProductDto> {
        console.log(id);
        return this._productService.getOne(id);
    }

    @Post()
    @UseGuards(AuthGuard)
    @UsePipes(new JoiValidationPipe(VALIDATION.createProduct))
    async create(
        @Body() createCatDto: CreateProductDto,
    ): Promise<CreateProductDto> {
        return this._productService.create(createCatDto);
    }

    @Put(':id')
    async update(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
        @Body() updateProductDto: CreateProductDto,
    ): Promise<CreateProductDto> {
        return this._productService.update(id, updateProductDto);
    }

    @Delete(':id')
    remove(
        @Param(
            'id',
            new ParseIntPipe({
                errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE,
            }),
        )
        id: number,
    ) {
        return this._productService.remove(id);
    }
}
