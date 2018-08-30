import { Headers } from '@angular/http';
import { Error } from '@caiu/errors';
import { Store } from '@caiu/store';

export class Login {
    grant_type = 'password';
    username = '';
    password = '';
}
