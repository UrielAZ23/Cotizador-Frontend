import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-article',
  templateUrl: './new-article.component.html',
  styleUrls: ['./new-article.component.css'],
  providers:[ArticleService]
})
export class NewArticleComponent {


public user!:string;
  public article!:Article
  public url!:string;
  public status!:string;

  constructor(
    private _articleService:ArticleService,
    private _router:Router,
    private _route:ActivatedRoute
    
  ){
    this.article= new Article('','','',null,null,'','');
    this._route.params.subscribe(params=>{
      this.user=params['user']
    })

  }

  afuConfig = {
    multiple: false,
    formatsAllowed: ".jpg,.png,.gif,.jpeg",
    maxSize: 50,
    uploadAPI:  {
      url:Global.url+'upload-image'
    },
    theme: "attachPin",
    hideProgressBar: true,
    hideResetBtn: true,
    hideSelectBtn: true,
    replaceTexts: {
      selectFileBtn: 'Select Files',
      resetBtn: 'Reset',
      uploadBtn: 'Upload',
      dragNDropBox: 'Drag N Drop',
      attachPinBtn: 'Sube tu imagen para el articulo',
      afterUploadMsg_success: 'Successfully Uploaded !',
      afterUploadMsg_error: 'Upload Failed !'
    }
};
onSubmit(){
  this._articleService.create(this.article).subscribe(response=>{
    console.log(response)
    if(response.status =='success'){
      this.status='success';
      this.article=response.article;
      //alerta
      Swal.fire(
        'Articulo Creado',
        'El articulo se ha creado exitosamente',
        'success'
      );
        this._router.navigate(['/edit-article/'+this.user]);
    
    }else{
      this.status='error';
    }
  },error=>{
    console.log(error);
    this.status='error';
  })

}


imageUpload(data:any){
  console.log(data.body.image)
  let image_data =data.body.image;
  this.article.image=image_data;
}
}
