import { IBaseRepository } from "@Domain/Interfaces/Repositories/shared/IBaseRepository";
import { RepositoryType } from "@Infra/Data/database";
import { Users } from "@prisma/client";
import { injectable } from "inversify";


@injectable()
export abstract class BaseRepository<T extends Users| Permissions> implements IBaseRepository<T> {
  protected readonly repository: RepositoryType<T>;

  constructor(repository: RepositoryType<T>) {
    this.repository = repository;
  }
 
  async findById(id: string): Promise<T | null> {
    const context = await this.repository.findUnique({
      where: { id },
    });
    return context;
  }

  async create<T>(data: T): Promise<void> {
    await this.repository.create({ data });
  }

  async listAll(): Promise<T[]> {
    const context = await this.repository.findMany();
    return context;
  }

  async update(id: string, data: T): Promise<T> {
    const context = await this.repository.update({
      where: { id },
      data,
    });
    return context;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete({ where: { id } });
  }

  async findManyById(id: string): Promise<T[]> {
    const context = await this.repository.findMany({ where: { id } });
    return context;
  }
}