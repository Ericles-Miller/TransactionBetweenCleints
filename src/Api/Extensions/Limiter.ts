import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

export class Limiter {

  usersLimiter() : RateLimitRequestHandler {
    const limiter = rateLimit({
      windowMs: 5 * 60 * 1000,
      max: 500, 
      message: 'Too many requests, please try again later.'
    });

    return limiter;
  }

  authLimiter() : RateLimitRequestHandler {
    const limiter = rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 20, 
      message: 'Too many requests, please try again later.'
    });

    return limiter;
  }

  transactionsLimiter() : RateLimitRequestHandler {
    const limiter = rateLimit({
      windowMs: 1 * 60 * 1000,
      max: 60, 
      message: 'Too many requests, please try again later.'
    });

    return limiter
  }
}
 
export const limiter = new Limiter();