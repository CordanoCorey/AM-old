import { Action } from '@caiu/store';
import { Attachments } from './attachments.model';

export function attachmentsReducer(state: Attachments = new Attachments(), action: Action): Attachments {
    switch (action.type) {

        default:
            return state;
    }
}
