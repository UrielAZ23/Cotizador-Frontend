import { Component, Input } from '@angular/core';
import { Params } from '@angular/router';
import { Article } from 'src/app/models/article';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  @Input() article!:Article

}
