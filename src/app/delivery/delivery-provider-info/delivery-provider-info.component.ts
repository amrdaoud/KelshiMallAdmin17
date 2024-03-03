import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { DeliveryService } from '../delivery.service';
import { filter, map, mergeMap, of, switchMap, tap } from 'rxjs';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { FormArray, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { DeviceService } from '../../app-reusables/services/device.service';
import { InputComponent } from '../../app-reusables/controls/input/input.component';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Area } from '../../app-models/generic';
import { GenericService } from '../../app-services/generic.service';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxChange, MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { DeliveryProviderCoverageBindingModel, DeliveryProviderFeeBindingModel, DeliveryProviderViewModel } from '../delivery';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ConfirmService } from '../../app-reusables/confirm/services/confirm.service';
import { AccountService } from '../../app-reusables/account/services/account.service';

interface ExampleFlatNode { 
  expandable: boolean; 
  name: string; 
  level: number; 
}



@Component({
  selector: 'app-delivery-provider-info',
  standalone: true,
  imports: [CommonModule, MatGridListModule, MatCardModule, MatDividerModule, ReactiveFormsModule, InputComponent, MatButtonModule,
    
    MatProgressBarModule, MatIconModule, MatCheckboxModule, MatExpansionModule, MatListModule, MatToolbarModule],
  templateUrl: './delivery-provider-info.component.html',
  styleUrls: ['./delivery-provider-info.component.scss']
})
export class DeliveryProviderInfoComponent {

  constructor(){
    this.route.paramMap.pipe(
      switchMap((param: ParamMap) => {
        if(param.has("id") && !isNaN(+param.get("id")!)) {
          return this.deliveryService.getDeliveryProviderById(+param?.get("id")!);
        }
        else {
          return of(undefined);
        }
      }),
      tap(provider => {
        if(provider) {
          this.provider = provider;
        }
        this.frm = this.deliveryService.createProviderForm(provider);
        this.iconSource = this.frm.get('logoUrl')?.value;
      }),
      switchMap(() => this.deliveryService.getDeliveryMethods())
    ).subscribe(dm => {
      if(this.provider) {
        this.feeFrm = this.deliveryService.createProviderFeesForm(this.provider, dm)
      }
    });
    this.genericService.getAreas().subscribe(x => {
      this.cities = x.filter(y => !y.parentAreaId);
    })
  }
  private route = inject(ActivatedRoute);
  private deliveryService = inject(DeliveryService);
  private deviceService = inject(DeviceService);
  private genericService = inject(GenericService);
  private snackBar = inject(MatSnackBar);
  private router = inject(Router);
  private confirm = inject(ConfirmService);
  private account = inject(AccountService);
  canDelete = this.account.inRoles(['Super User', 'Delivery Manager'])
  providerId!: number | undefined;
  isHandset$ = this.deviceService.isHandset$;
  loadingProvider$ = this.deliveryService.loadingOneProvider$;
  iconSource!: string | ArrayBuffer | null;
  frm!: FormGroup;
  feeFrm!: FormGroup;
  provider!: DeliveryProviderViewModel;
  cities: Area[] = [];
  selectedCity!: Area;
  selectedCoverage!: DeliveryProviderCoverageBindingModel;
  previewIcon(event: any) {
    if(!event.target?.files || event.target?.files.length === 0) {
      return;
    }
    const selectedFile = event.target.files[0];
    const reader = new FileReader();
    reader.onload = e => {
      this.iconSource = reader.result;      
    };
    reader.readAsDataURL(selectedFile);
    this.frm.get('logoFile')?.setValue(selectedFile);
    this.frm.markAsDirty();
  }
  isPartialySelectedCity(cityName:string): boolean {
    return this.provider.coverages.findIndex(x => x.city === cityName) > -1 && this.provider.coverages.find(x => x.city === cityName)?.areas.length !== this.cities.find(x => x.nameAr === cityName)?.inverseParentArea.length ;
  }
  isAllSelectedCity(cityName: string): boolean {
    return this.provider.coverages.find(x => x.city === cityName)?.areas.length === this.cities.find(x => x.nameAr === cityName)?.inverseParentArea.length ;
  }
  toggleCity(cityName:string, event: MatCheckboxChange) {
    
    if(event.checked) {
      if(this.provider.coverages.findIndex(x => x.city === cityName) > -1) {
        this.provider.coverages.splice(this.provider.coverages.findIndex(x => x.city === cityName),1);
      }
      
      this.provider.coverages.push({city: cityName, areas: this.cities.find(x => x.nameAr === cityName)?.inverseParentArea.map(y => y.nameAr) ?? []})
    } else {
      this.provider.coverages.splice(this.provider.coverages.findIndex(x => x.city === cityName),1);
    }
    
  }
  isSelectedArea(area: Area): boolean {
    const currentCity = this.cities.find(c => c.areaId === area.parentAreaId);
    if(!currentCity) {
      return false;
    }
    return this.provider.coverages.findIndex(x => x.city === currentCity?.nameAr && x.areas.includes(area.nameAr)) > -1 ;
  }
  toggleArea(area: Area, event: MatCheckboxChange) {
    const currentCity = this.cities.find(c => c.areaId === area.parentAreaId);
    if(event.checked) {
      const c = this.provider.coverages.find(x => x.city === currentCity?.nameAr);
      if(!c) {
        this.provider.coverages.push({city: currentCity?.nameAr ?? '', areas: [area.nameAr]})
      }
      else {
        this.provider.coverages.find(x => x.city === currentCity?.nameAr)?.areas.push(area.nameAr);
      }
    }
    else {
      const index = this.provider.coverages.find(x => x.city === currentCity?.nameAr)?.areas.findIndex(x => x === area.nameAr);
      this.provider.coverages.find(x => x.city === currentCity?.nameAr)?.areas.splice(index!,1);
      if(this.provider.coverages.find(x => x.city === currentCity?.nameAr)?.areas.length === 0) {
        this.provider.coverages.splice(this.provider.coverages.findIndex(x => x.city === currentCity?.nameAr), 1);
      }
    }
  }
  get deliveryMethodControls(): FormGroup[] {
    return (this.feeFrm.get('deliveryMethodFees') as FormArray).controls as FormGroup[];
  }
  editAddMainInfo() {
    if(this.frm.invalid) {
      return;
    }
    if(this.provider) {
      this.deliveryService.editDeliveryProviderMainInfo(this.frm.value).subscribe(x => {
        if(x) {
          this.snackBar.open('Main Info Updated', 'Dismiss', {duration: 2000})
        }
      })
    } else {
      this.deliveryService.addDeliveryProvider(this.frm.value).subscribe(x => {
        if(x) {
          this.snackBar.open('Provider Added', 'Dismiss', {duration: 2000});
          this.router.navigateByUrl('/delivery-providers/' + x.deliveryProviderId)
        }
      })
    }
    
  }
  editCoverage() {
    const model = this.buildCoverageBinding();
    this.deliveryService.editDeliveryProviderCoverage(model).subscribe(x => {
      if(x) {
        this.snackBar.open('Coverage Updated', 'Dismiss', {duration: 2000})
      }
    })
  }
  editFees() {
    const model = this.feeFrm.value as DeliveryProviderFeeBindingModel;
    model.deliveryMethodFees = model.deliveryMethodFees.filter(x => x.costPerKm && !isNaN(x.costPerKm))
    this.deliveryService.editDeliveryProviderFees(model).subscribe(x => {
      if(x) {
        this.snackBar.open('Fees Updated', 'Dismiss', {duration: 2000})
      }
    })
  }
  buildCoverageBinding(): DeliveryProviderCoverageBindingModel {
    const result: DeliveryProviderCoverageBindingModel = {deliveryProviderId: this.provider.deliveryProviderId, cityArea: []};
    this.provider.coverages.forEach(view => {
      view.areas.forEach(area => {
        result.cityArea.push({city: view.city, area: area})
      })
    })
    return result;
  }
  reset() {
    location.reload();
  }
  activate() {
    this.confirm.open({Title: 'Activating Provider', 'Message': 'Are you sure you want to activate this provider'}).pipe(
      filter(result => result),
      switchMap(() => {
        return this.deliveryService.activateProvider(this.provider.deliveryProviderId)
      })
    ).subscribe(x => {
      if(x) {
        this.provider.isActive = true;
        this.snackBar.open('Provider Activated', 'Dismiss', {duration: 2000})
      }
    })
  }
  deactivate() {
    this.confirm.open({Title: 'Deactivating Provider', 'Message': 'Are you sure you want to deactivate this provider', MatColor: 'warn'}).pipe(
      filter(result => result),
      switchMap(() => {
        return this.deliveryService.deactivateProvider(this.provider.deliveryProviderId)
      })
    ).subscribe(x => {
      if(x) {
        this.provider.isActive = false;
        this.snackBar.open('Provider Deactivated', 'Dismiss', {duration: 2000})
      }
    })
  }
  delete() {
    this.confirm.open({Title: 'Deleting Provider', 'Message': 'Are you sure you want to delete this provider', MatColor: 'warn'}).pipe(
      filter(result => result),
      switchMap(() => {
        return this.deliveryService.deleteProvider(this.provider.deliveryProviderId)
      })
    ).subscribe(x => {
      if(x) {
        this.snackBar.open('Provider Deleted', 'Dismiss', {duration: 2000})
        this.router.navigateByUrl('/delivery-providers')
      }
    })
  }
}
