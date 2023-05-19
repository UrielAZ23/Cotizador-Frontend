import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.servicce';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  public customer:Customer;
  constructor(
    private _router:Router,
    private _customerService:CustomerService
  ){
    this.customer= new Customer('','','','')
  }


  login(){

    this._customerService.searchCustomer(this.customer).subscribe(response=>{
      console.log(response)
      if( response.customers!=null){
         let id= response.customers._id
        Swal.fire(
          'Loggeado',
          'Se ha logeado exitosamente',
          'success'
        )
        this._router.navigate(['/home/'+id])
      }else{
        Swal.fire(
          'Error',
          'El usuario o contraseña no coinciden',
          'warning'
        )
      }
      
    },error=>{
      console.log("no hay coincidencias", error)
    })
    
  }
}
