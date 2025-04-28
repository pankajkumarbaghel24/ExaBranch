import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent {

  contactForm = new FormGroup({
    name: new FormControl(''),
  
  });

  onSubmit() {
    console.log(this.contactForm.value);
  }


  
}
