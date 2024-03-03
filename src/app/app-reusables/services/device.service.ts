import { Injectable, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, distinctUntilChanged, map, shareReplay, tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class DeviceService {
  private breakpointObserver = inject(BreakpointObserver);
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetPortrait)
    .pipe(
      tap(result => {
        if(result.matches) {
          
        }
      }),
      map(result => result.matches),
      shareReplay()
    );
  isHandsetLadnscape$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.HandsetLandscape)
  .pipe(
    tap(result => {
      if(result.matches) {
        
      }
    }),
    map(result => result.matches),
    shareReplay()
  );
  isTablet$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.TabletPortrait)
  .pipe(
    tap(result => {
      if(result.matches) {
        
      }
    }),
    map(result => result.matches),
    shareReplay()
  );
  isTabletLandscape$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.TabletLandscape)
  .pipe(
    tap(result => {
      if(result.matches) {
        
      }
    }),
    map(result => result.matches),
    shareReplay()
  );
  isLarge$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.XLarge)
  .pipe(
    tap(result => {
      if(result.matches) {
        
      }
    }),
    map(result => result.matches),
    shareReplay()
  );
  // readonly productCols = this.breakpointObserver.observe([Breakpoints.HandsetPortrait, Breakpoints.HandsetLandscape, Breakpoints.TabletPortrait, Breakpoints.TabletLandscape, Breakpoints.Large]).pipe(
  //   distinctUntilChanged(),
  //   tap(b => console.log(b))
  // ).subscribe()
}
