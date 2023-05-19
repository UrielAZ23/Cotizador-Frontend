import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.servicce';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-customer',
  templateUrl: './edit-customer.component.html',
  styleUrls: ['./edit-customer.component.css']
})
export class EditCustomerComponent implements OnInit {

  public user:string
  public idCustomer:String
  public customer:Customer;
  constructor(
    private _route:ActivatedRoute,
    private _router:Router,
    private _customerService:CustomerService
  ){
    this.customer = new Customer('','','','')
    this._route.params.subscribe(params=>{
      this.user=params['user'];
      this.idCustomer=params['id'];
      this._customerService.getCustomer(this.idCustomer).subscribe(response=>{
        this.customer=response.customer;
        console.log(this.customer)
      })
    })
  }
  
  ngOnInit(){
    
  }

  update(){
    // console.log("hola")
    this._customerService.updateCustomer(this.customer._id,this.customer).subscribe(async params=>{
      if(params.status=='success'){
        await Swal.fire(
          'Customer Update',
          'El cliente se ha modificado exitosamente',
          'success'
        );
          this._router.navigate(['/home/'+this.user])

      }else{
        Swal.fire(
          'Error',
          'Algo a ocurrido',
          'error'
        )
      }
    })
  }

}
