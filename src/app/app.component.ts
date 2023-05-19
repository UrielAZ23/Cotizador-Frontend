import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Cotizador';
 status!:boolean;

 constructor(){
  this.status=true
 }
  ngOnInit() {
  
    
  }
  
  ocultar(event:any){
    console.log('hola')
    console.log(event)
    this.status=event.status;
    
  }
}
