import { Injectable } from '@angular/core';

@Injectable()
export class UpdateServiceProvider {

    remind = false;
    constructor(
    ) {
        this.remind = false;
    }

    remindMelater() {
        this.remind = true;
    }


}
