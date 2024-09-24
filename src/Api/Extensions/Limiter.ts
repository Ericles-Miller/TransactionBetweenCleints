import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';
import { Request, Response } from 'express';
import { ResponseDTO } from '@Applications/DTOs/Responses/Shared/ResponseDTO';
import { ApiErrorsMessages } from '@Domain/Exceptions/Shared/ApiErrorsMessages';
export class Limiter {
  static usersLimiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 50, 
    keyGenerator(request: Request) : string {
      return request.ip!;
    },
    
    handler(_, response: Response) : void {
      response.status(429).send(new ResponseDTO<string>(ApiErrorsMessages.manyRequest));
    }
  });

  static authLimiter = rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 2, 

      keyGenerator(request: Request) : string {
        return request.ip!;
      },
      handler(_, response: Response) : void {
        response.status(429).send(new ResponseDTO<string>(ApiErrorsMessages.manyRequest));
      }    
    });

  static transactionLimiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 60, 
    keyGenerator(request: Request) : string {
      return request.ip!;
    },
    handler(_, response: Response) : void {
      response.status(429).send(new ResponseDTO<string>(ApiErrorsMessages.manyRequest));
    } 
  });
}
 