import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Article } from 'src/app/models/article';
import { ArticleService } from 'src/app/services/article.service';
import { Global } from 'src/app/services/global';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-content',
  templateUrl: './edit-content.component.html',
  styleUrls: ['./edit-content.component.css']
})
export class EditContentComponent implements OnInit {

  public idArticle:String
  public user:string;
  public article!:Article;
  public url:string;

  constructor(
    private _aritlceService:ArticleService,
    private _router:Router,
    private _route:ActivatedRoute
  ){
    this._route.params.subscribe(response=>{
      this.url=Global.url
      this.user=response['user']
      this.idArticle=response['id'];
      this.article= new Article('','','',null,null,'','')
    })
  }
  
  ngOnInit() {
  this.getArticle()
  }
  
  getArticle(){
    this._aritlceService.getArticle(this.idArticle).subscribe(params=>{
      this.article=params.article
      console.log(this.article)
    })

  }
  onSubmit(){
    console.log(this.article)
    this._aritlceService.update(this.article._id,this.article).subscribe( async response=>{

      if(response.status=='success'){
        await Swal.fire(
          'Success',
          'File Update',
          'success'
        )
        this._router.navigate(['/edit-article/'+this.user])
        
      }else{
        await Swal.fire(
          'Error',
          'Something happened',
          'error'
        )

      }
    })

  }
  imageUpload(data:any){
    let image_data=data.body.image
    this.article.image=image_data;
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

}

