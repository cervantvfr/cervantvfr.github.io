import { Component } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { experience } from './experience';

@Component({
    selector: 'app-cv',
    templateUrl: './cv.component.html',
    styleUrl: './cv.component.css',
    standalone: false
})
export class CvComponent {
  readonly experience = experience;

  constructor(private titleService: Title){
    this.titleService.setTitle('Victor Cervantes - CV')
  }
}
