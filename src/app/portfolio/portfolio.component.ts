import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-portfolio',
    templateUrl: './portfolio.component.html',
    styleUrl: './portfolio.component.css',
    standalone: false
})
export class PortfolioComponent {

  constructor(private titleService: Title){
    this.titleService.setTitle('Victor Cervantes - Portfolio')
  }
}
