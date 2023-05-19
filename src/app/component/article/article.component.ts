import { Component,OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article';
import { Global } from 'src/app/services/global';
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css'],
  providers:[ArticleService]
})
export class ArticleComponent implements OnInit{

  public url!:string
  public article!:Article;
  public image!:string;
  constructor( 
    private _articleService:ArticleService,
    private _router:Router,
    private _route:ActivatedRoute
    ){
      this.url=Global.url


  }

  ngOnInit() {

    this._route.params.subscribe(params=>{
      // console.log(params['id'])
      let id = params['id']

      this._articleService.getArticle(id).subscribe(response=>{
        console.log(response.article);
        if(response.article){
          this.article=response.article;

        }else{
          this._router.navigate(['/features'])
        }
      }, error=>{
        console.log(error)
      })

    })


      
  }

}
