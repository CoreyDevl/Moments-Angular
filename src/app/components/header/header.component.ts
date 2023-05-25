import { Component, OnInit } from '@angular/core';
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  faChampagneGlasses = faChampagneGlasses

  constructor (){}

  ngOnInit(): void {
  
}


}
