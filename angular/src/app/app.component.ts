import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'PARKnSHOP';
  ListContent: string;
  showList(value: string){
    this.ListContent = value;
  }

}
