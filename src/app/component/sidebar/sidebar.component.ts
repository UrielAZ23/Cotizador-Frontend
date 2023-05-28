import { Component, Input } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { Feature } from 'src/app/models/feature';
import { Resume } from 'src/app/models/resume';
import { ArticleService } from 'src/app/services/article.service';
import { FeatureService } from 'src/app/services/feature.service';
import { ResumeService } from 'src/app/services/resume.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() article!:Article

  public diff:number
  public diff2:number
  public resume:Resume;
  public feature:Feature
  public feature1:Feature
  public user:string;

  constructor(
    private _router:Router,
    private _route:ActivatedRoute,
    private _featureService:FeatureService,
    private _resumeService:ResumeService,
    private _articleService:ArticleService
  ){
    this._route.params.subscribe(response=>{
      this.resume= new Resume('','','',0,0,0)
      this.user=response['user']
      this.feature=new Feature('',this.user,0,true)
      console.log(this.feature)
      this._featureService.searchFeature(this.feature).subscribe(res=>{
        
        if(res.response!=''){
          this.feature1=res.response[0]

        }else{
          this._featureService.createFeature(this.feature).subscribe(pipe=>{
            this.feature1=pipe.result
            console.log(this.feature1)
            
          })
        }
      })

    })
  }

  prueba(){
    if(this.article.stock>this.resume.amount || this.article.stock==this.resume.amount ){
      if(this.resume.amount!=0){
        //llenado de resumen
        this.resume.idArticle=this.article._id
        this.resume.cost=this.article.pricing
        this.resume.total=this.article.pricing*this.resume.amount
        this.resume.idFeature=this.feature1._id
        
        //existe item con factura activa en 
        this._resumeService.searchResume(this.resume).subscribe(dat=>{
          console.log(dat.resume[0])
          
          if(dat.resume==''){
            //se guarda ya que no se encuentra
            this._resumeService.saveResume(this.resume).subscribe(res=>{
              console.log(res)
              console.log(this.resume)
              console.log(this.feature1)
              //se modifica la factura
              this.modificaFactura(this.feature1,this.resume.total)
              //se modifica la cantidad de piezas que hay

              this.updateArticle(-this.resume.amount)
            })
            
          }else{
            
            this.resume._id=dat.resume[0]._id
            this.diff=this.resume.total-dat.resume[0].total
            this.diff2=dat.resume[0].amount-this.resume.amount
            if(this.diff2==0){
              this.diff2=-this.resume.amount
              this.resume.amount-=this.diff2
            }
            //se modifica
            this._resumeService.updateResume(this.resume._id,this.resume).subscribe(red=>{
              console.log(red)
              console.log(this.resume)
              console.log(this.feature1)
              this.modificaFactura(this.feature1,this.diff)
              this.updateArticle(this.diff2)
            })
          }

          
        })
        
        

      }

    }
  }

  modificaFactura(factura,price:any=null){
    console.log(price)
    factura.account+=price

    
    this._featureService.updateFeature(factura._id,factura).subscribe(dat=>{
      console.log(dat.featureUpdate)
    })
  }

  updateArticle(pices){
    console.log(pices)
    this.article.stock+=pices
    this._articleService.update(this.article._id,this.article).subscribe( dat=>{
      console.log(this.article)

       Swal.fire(
        'Success',
        'Se ha agregado a la factura',
        'success'
      )
      this._router.navigate(['/features/edit-feature/'+this.user+'/'+this.feature1._id])
    
    })

  }
}
