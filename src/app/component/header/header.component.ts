import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
public user:string
  constructor(
    private _route:ActivatedRoute
  ){
    this._route.params.subscribe(params=>{
      this.user= params['user']

    })
  }
}
