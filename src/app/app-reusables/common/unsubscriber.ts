import { Component, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";
@Component({
    template:''
})
export class Unsubscriber implements OnDestroy {
    private subscription = new Subscription();
    private interval!: any
    ngOnDestroy():void {
        if(this.subscription) {
            this.subscription.unsubscribe();
        }
        if(this.interval) {
            clearInterval(this.interval);
        }
    }
    set _otherSubscription(value: Subscription) {
        this.subscription.add(value);
    }
    set _otherInterval(value: any) {
        this.interval = value;
    }
}