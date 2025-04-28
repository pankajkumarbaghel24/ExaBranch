import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DataService } from 'src/services/data.service';
import { DatePipe } from '@angular/common';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  courseList: any;
  data: any;
  tablesData: any;
  selectedTrainee: any;
  data_id: any;
  id: any;
traineeId: any;
  delete_id: any;

  constructor( private apiService: DataService,private datepipe:DatePipe){}

  courseForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    dob: new FormControl('', [Validators.required]),
    c_id: new FormControl('', [Validators.required, Validators.pattern('^[0-9]*$')])
  });

  ngOnInit(){
    this.getCourse();
    this.getTable();
  }

  getCourse(){
    this.apiService.getData('trainee/allcourse').subscribe(response=>{
      console.log('courselist',response);
      this.courseList=response
    })
  }

  getTable(){
    this.apiService.getData('trainee/getTable').subscribe(response=>{
      console.log('table',response);
      this.tablesData=response
    })
  }


  onSubmit() {
  
    console.log(this.courseForm.value);

    this.courseForm.patchValue //this will help to set the date format (for storing in database)
    ({     
      dob : this.datepipe.transform(this.courseForm.get("dob")?.value, "yyyy-MM-dd"), 
     });
     console.log(this.courseForm.value);

    this.apiService.postData('trainee', this.courseForm.value).subscribe((res: any) => {
      this.data = res;
      if (this.data)
        alert("Data saved succesfully..")
    });
    this.getTable();
    this.onClear();
  }

onClear(){
  this.courseForm.reset();
}


onEdit(id: any) { 
  // Find the selected trainee data
  this.selectedTrainee = this.tablesData.find((t: any) => t.id === parseInt(id)); 
  this.getCourse();
  console.log("Editing Trainee:", this.selectedTrainee);

  if (this.selectedTrainee) {
    this.id = id;

    // Patch form values
    this.courseForm.patchValue({
      // id: this.selectedTrainee.data_id,
      name: this.selectedTrainee.name,
      dob: this.selectedTrainee.dob, // Might need formatting if coming as timestamp
      c_id: this.selectedTrainee.c_id
    });
  }
}

onUpdate() {

  // Ensure date is in correct format
  this.courseForm.patchValue({
    dob: this.datepipe.transform(this.courseForm.get("dob")?.value, "yyyy-MM-dd"),
  });

  console.log("Updating Trainee:", this.courseForm.value);

  // Send PUT request to update trainee
  this.apiService.putData('trainee/' + this.id, this.courseForm.value).subscribe((res: any) => {
    this.data = res;
    if (this.data) {
      alert("Data updated successfully!");
    }

    // Refresh table and reset form
    this.getTable();
    this.onClear();
  });

}

onDelete(id:any){
  this.selectedTrainee = this.tablesData.find((t: any) => t.id === parseInt(id)); 
  this.delete_id=id
  this.apiService.deleteData ('trainee/' + this.delete_id).subscribe((res: any) => {
    this.data = res;
    if (this.data) {
      alert("Data deleted successfully!");
    }

    // Refresh table and reset form
    this.getTable();
    // this.onClear();
  });
}

}




