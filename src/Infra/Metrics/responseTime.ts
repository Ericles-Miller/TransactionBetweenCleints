import { Request, Response } from "express";
import { restResponseTimeHistogram } from "./metrics";

export function responseMetric(request: Request, response: Response, time: number) :void {
  if (request?.route?.path) {
    restResponseTimeHistogram.observe({
      method: request.method,
      route: request.route.path,
      status_code: response.statusCode,
    },
    time * 1000
    );
  }
}



