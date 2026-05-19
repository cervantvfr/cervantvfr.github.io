import { Component, Input } from '@angular/core';

@Component({
    selector: 'app-project-card',
    templateUrl: './project-card.component.html',
    styleUrl: './project-card.component.css',
    standalone: false
})
export class ProjectCardComponent {
  @Input() projectName: string = "";
}
