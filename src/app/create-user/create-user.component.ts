import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss']
})
export class CreateUserComponent implements OnInit{
  public createForm!: FormGroup;
  constructor(private maticon : MatIconRegistry, private domSanitizer : DomSanitizer,private fb : FormBuilder){
    this.maticon.addSvgIcon('logo',this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/Logo/MTK_logo.svg'))
  }
  public isUpdateActive = false;
  public techStacks = ["Frontend","Backend","Full Stack"];
  public skills = ["HTML","CSS","JS","DBMS","SQL","Angular","C#"];
  ngOnInit(): void {
    this.createForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      gender: [''],
      techStack: [''],
      skill: [''],
      dob: ['']
    });
}
submit(){

}
update(){
  
}
}
