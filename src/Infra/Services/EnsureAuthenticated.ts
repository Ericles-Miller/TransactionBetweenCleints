// import { Configuration } from "@Domain/Config";
// import { NextFunction, Request, Response } from "express";
// import { verify } from "jsonwebtoken";


// export class EnsureAuthenticated {
//   async handle(request: Request, response: Response, next: NextFunction) : Promise<Response> {
//     const authToken = request.headers.authorization;
//     if(!authToken) 
//       return response.status(401).json({message: 'Token in missing'});
    
//     const [, token] = authToken.split(' ');

//     const secretToken = Configuration.authApiSecrets.secretKey;
//     if(secretToken) {
//       try{
//         const {sub} = verify(token, secretToken) as IPayload
//       }
//     }
//   }
// }