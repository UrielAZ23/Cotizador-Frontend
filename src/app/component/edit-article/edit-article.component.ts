import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.css']
})
export class EditArticleComponent implements OnInit {

  public user:string;
  public url:string;
  public articles:Article[];
  constructor(
    private _articleService:ArticleService,
    private _router:Router,
    private _route:ActivatedRoute,
  ){

    this.url=Global.url
  }
  
  ngOnInit(): void {
    
    this._articleService.getArticles().subscribe(response=>{
      this._route.params.subscribe(q=>{
        this.articles=response.articles
        this.user=q['user']
        // console.log(this.user)
        
      })
    })

  }

  deleteArticle(id){

    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        this._articleService.delete(id).subscribe(async response=>{
          if(response.status=='Success'){
            await Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
            window.location.reload();
          }else{
            Swal.fire(
              'Error!',
              'Something happened.',
              'error'
            )

          }
          
        })
      }
    })

  }

}
