import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest();
        if (request.headers['Authorization']) {
            return false;
        }
        const token = request.headers['authorization'];
        if (token !== 'Bearer #VNTRIP20!9@4749') {
            return false;
        }
        return true;
    }
}
