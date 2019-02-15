import { LocationStrategy, PathLocationStrategy } from "@angular/common";
import { ErrorHandler, Injectable, Injector } from "@angular/core";
import { UserService } from "src/app/core/user/user.service";
import * as StackTrace from "stacktrace-js";
import { StackFrame } from "stacktrace-js";
import { ServerLogService } from "./server-log.service";
import { Router } from "@angular/router";
import { environment } from "src/environments/environment";

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {

  constructor(private injector: Injector) { }

  handleError(error: any): void {

    console.log('passei pelo handler');

    const location = this.injector.get(LocationStrategy);
    const userService = this.injector.get(UserService);
    const serverLogService = this.injector.get(ServerLogService);
    const router = this.injector.get(Router);

    const url = location instanceof PathLocationStrategy
      ? location.path()
      : '';

    const message: string = error.message
      ? error.message
      : error.toString();

    environment.production && router.navigate(['/error']);

    StackTrace
      .fromError(error)
      .then((stackFrames: Array<StackFrame>) => {
        const stackAsString = stackFrames
          .map(stack => stack.toString())
          .join('\n');

        console.log(message);
        console.log(stackAsString);

        serverLogService.log({
          message,
          url,
          userName: userService.getUserName(),
          stack: stackAsString
        }).subscribe(() => {
          console.log('Error logged on server');
        }, error => {
          console.log(error);
          console.log('Fail to send error log to server');
        });
      });
  }

}