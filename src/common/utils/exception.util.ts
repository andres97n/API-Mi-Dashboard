import { BadRequestException, InternalServerErrorException } from "@nestjs/common";


export const handleExceptions = (error: any) => {
  console.log(error);
  
  if (error.code === 11000) {
    throw new BadRequestException(
      `Valor ya existe en base de datos ${JSON.stringify(error.keyValue)}`,
    );
  }
  throw new InternalServerErrorException(
    `No pudimos crear el registro, por favor hable con el administrador`,
  );
};