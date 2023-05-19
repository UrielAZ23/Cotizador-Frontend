import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Feature } from 'src/app/models/feature';
import { FeatureService } from 'src/app/services/feature.service';

@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent {

  public features:Feature
  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _featureService:FeatureService
  ){

    this._featureService.getFeatures().subscribe(response=>{
      this.features=response.features
      console.log(this.features)
    })

  }



}
