import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Feature } from 'src/app/models/feature';
import { Resume } from 'src/app/models/resume';
import { ArticleService } from 'src/app/services/article.service';
import { FeatureService } from 'src/app/services/feature.service';
import { Global } from 'src/app/services/global';
import { ResumeService } from 'src/app/services/resume.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-feature',
  templateUrl: './edit-feature.component.html',
  styleUrls: ['./edit-feature.component.css']
})
export class EditFeatureComponent {

  public diff:number
  public diff2:number
  public url:string
  public user:string

  public articleEdit:Article
  public resumeEdit:Resume
  public featureEdit:Feature


  public idFeature:string
  public resumens:Resume[]
  public articles:Article[]
  public feature:Feature
  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _articleService:ArticleService,
    private _featureService:FeatureService,
    private _resumeService:ResumeService
  ){
    this.url=Global.url
    this._route.params.subscribe(async response1=>{
      this.user=response1['user']
      this.idFeature=response1['idFeature']

      await this._resumeService.searchByIdFeature(this.idFeature).subscribe(async dat=>{
        await this._articleService.getArticles().subscribe(async par=>{
          await this._featureService.getFeature(this.idFeature).subscribe(tar=>{
            this.resumens=dat.resume
            this.articles=par.articles
            this.feature=tar.response
          })
        })

      })
    })
  }

  prueba(resume){
    console.log(resume)
    if(resume.amount==0){
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
            this.update(resume)
        }

      })
    }else{
      this.update(resume)

    }
    
      
    
    }
    
    update(resume){
      //se busca el resumen a modificar
      this._articleService.getArticle(resume.idArticle).subscribe(q=>{
        this.articleEdit=q.article
        this._resumeService.getResume(resume._id).subscribe(async pipe=>{
        this.diff=resume.amount-pipe.response.amount
        this.articleEdit.stock-=this.diff
        if(this.articleEdit.stock>-1){
        resume.total=resume.amount*resume.cost
      //se modifica el articulo
          this.diff2=resume.total-pipe.response.total

        this._featureService.getFeature(resume.idFeature).subscribe(p=>{
          this.featureEdit=p.response
          this.featureEdit.account+=this.diff2
         console.log(this.featureEdit)
         //se modifica el resumen
         //se modifica la factura

         
         
         this._featureService.updateFeature(this.featureEdit._id,this.featureEdit).subscribe(ray=>{
           this._articleService.update(this.articleEdit._id,this.articleEdit).subscribe( vad=>{
             
             if(resume.amount>0){
                  this._resumeService.updateResume(resume._id,resume).subscribe(async dat=>{
                    
                    await Swal.fire(
                      'Success',
                      'Se ha guardado con exito',
                      'success'
                      )
                      window.location.reload()
                      
                    })
                  }else{
                    this._resumeService.deleteResume(resume._id).subscribe(async dat=>{
                    await Swal.fire(
                      'Success',
                      'Se ha guardado con exito',
                      'success'
                      )
                      window.location.reload()

                  })
                }
          })
        })
        
      }) 
      }else{
      await  Swal.fire(
          'Advertencia',
          'No se puede agregar mas',
          'warning'
          )
          window.location.reload()
        }
        
      })
    })
  }

  eliminar(resume){
    
      resume.amount=0
    this.prueba(resume)

  }



}
