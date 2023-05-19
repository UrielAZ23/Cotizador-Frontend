import { Component, Output, EventEmitter } from '@angular/core';
import {  Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.servicce';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent {

  @Output() inicio =new EventEmitter();

  public customer!:Customer;
  constructor(
    private _customerService:CustomerService,
    private _router:Router
  ){
    this.customer= new Customer('','','','');
  }

  saveNewCustomer(customer:any){
    this._customerService.saveCustomer(customer).subscribe(response=>{
      if(response.status=='success'){
        Swal.fire(
          'Usuario creado',
          'El usuario ha sido creado exitosamente',
          'success'
        )
        this._router.navigate(['/login']);

        console.log('Se ha guardado correctamente')
      }
    },error=>{
      console.log(error)
    })

  }

  
  // mandarmensaje(event:any){
  //   this.inicio.emit({
  //     status:false
  //   });
    
  // }

}
