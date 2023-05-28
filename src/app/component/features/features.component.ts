import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from 'src/app/models/feature';
import { Customer } from 'src/app/models/customer'
import { CustomerService } from 'src/app/services/customer.servicce';
import { FeatureService } from 'src/app/services/feature.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {

  public features:Feature
  public user:string
  public customers:Customer[]
  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _featureService:FeatureService,
    private _customerService:CustomerService
  ){
    this._route.params.subscribe(rep=>{
      this.user=rep['user']
      this._featureService.getFeatures().subscribe(response=>{
        this._customerService.getCustomers().subscribe(dat=>{
          this.customers=dat.customers
          this.features=response.features
          console.log(this.features)
  
          
        })
        
      })
    })

  }



}
