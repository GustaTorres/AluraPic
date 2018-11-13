import { AlertTypeEnum } from './alert.enum';
export class Alert {
    constructor(
        public readonly alertType: AlertTypeEnum, 
        public readonly message: string
    ) {}
}