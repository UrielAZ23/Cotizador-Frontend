import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-pricing',
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
  providers:[ArticleService]
})
export class PricingComponent implements OnInit {
  
  public url!:string;
  public articles!:Article[];
  public user!:string;
  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _articleService:ArticleService
  ){
    this.url=Global.url;
    this._route.params.subscribe(params=>{
      this.user= params['user']
    })
  }

  ngOnInit() {

    this._articleService.getArticles(true).subscribe(response=>{
        console.log(response.articles);
        this.articles=response.articles;

    },error=>{
      console.log(error)
    })
      
  }

}
