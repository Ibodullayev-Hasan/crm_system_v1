import { ConflictException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateTenantDto } from './dto/create-tenant.dto';
import { UpdateTenantDto } from './dto/update-tenant.dto';
import { Model } from 'mongoose';
import { Tenant, TenantDocument } from './schema/tenant.schema';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../user/schema/user.schema';

@Injectable()
export class TenantService {

  constructor(
    @InjectModel(Tenant.name) private readonly tenantModel: Model<TenantDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>
  ) { }

  // create new tenant
  async create(createTenantDto: CreateTenantDto, admin: User): Promise<Tenant> {
    try {
      const alreadyExistTenant = await this.tenantModel.findOne({
        tenant_name: createTenantDto.tenant_name,
        tenant_phone: createTenantDto.tenant_phone,
        adress: createTenantDto.adress
      }).lean();

      if (alreadyExistTenant) throw new ConflictException('Already existing tenant');

      const newTenant = new this.tenantModel({
        admin: admin.id,
        ...createTenantDto,
      });

      await this.userModel.findByIdAndUpdate(admin.id, { tenantId: newTenant._id });

      return await newTenant.save({ validateBeforeSave: false });

    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }


  findAll() {
    return `This action returns all tenant`;
  }

  findOne(id: number) {
    return `This action returns a #${id} tenant`;
  }

  update(id: number, updateTenantDto: UpdateTenantDto) {
    return `This action updates a #${id} tenant`;
  }

  remove(id: number) {
    return `This action removes a #${id} tenant`;
  }
}
