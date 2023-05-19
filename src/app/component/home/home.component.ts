import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Customer } from 'src/app/models/customer';
import { CustomerService } from 'src/app/services/customer.servicce';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

    public user:string;
    public customers!:Customer[]
    constructor(
      private _customerService:CustomerService,
      private _route:ActivatedRoute,
      private _router:Router
    ){
      this._route.params.subscribe(params=>{
        this.user=params['user'];
      })
    }

  ngOnInit() {
      this._customerService.getCustomers(true).subscribe(response=>{
        this.customers=response.customers;
        console.log(this.customers);
      },error=>{
        console.log(error)
      })
  }

  deleted(idCustomer){
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
        this._customerService.deleteCustomer(idCustomer).subscribe(async response=>{
          if(response.status=='success'){
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
            console.log(response)

          }
          
        })
      }
    })
  }

}
