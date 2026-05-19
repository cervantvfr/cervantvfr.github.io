import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
    selector: 'app-contact',
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.css',
    standalone: false
})
export class ContactComponent {

  constructor(private titleService: Title){
    this.titleService.setTitle('Victor Cervantes - Contact')
  }
}
