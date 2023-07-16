import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, NgModel } from '@angular/forms';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../models/user.model';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.scss'],
})
export class CreateUserComponent implements OnInit {
  public createForm!: FormGroup;
  public userURLId!: number;

  constructor(
    private maticon: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private fb: FormBuilder,
    private api: ApiService,
    private toast : ToastrService,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ) {
    this.maticon.addSvgIcon(
      'logo',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/Logo/MTK_logo.svg'
      )
    );
  }
  public isUpdateActive = false;
  public techStacks = ['Frontend', 'Backend', 'Full Stack'];
  public skills: any;
  ngOnInit(): void {
    this.createForm = this.fb.group({
      firstName: [''],
      lastName: [''],
      email: [''],
      mobile: [''],
      gender: [''],
      techStack: [''],
      skill: [''],
      dob: [''],
    });

    this.activatedRoute.params.subscribe(id=>{
      this.userURLId = id['id'];
      this.api.getRegisteredUserId(this.userURLId).subscribe(res=>{
        this.isUpdateActive = true;
        this.fillForm(res);
      })
    })
  }
  submit() {
    this.api.postRegistration(this.createForm.value).subscribe(res=>{
      this.toast.success("Created Successfully");
      this.createForm.reset();
    })
  }
  update() { 
    this.api.updateRegisterUser(this.createForm.value, this.userURLId)
      .subscribe(res => {
        this.toast.success('Updated Successful');
        this.router.navigate(['list']);
      });
   }

  changeTechStack(e: any) {
    if (e.value === 'Frontend') {
      this.skills = ['HTML', 'CSS', 'JS', 'Angular'];
    } else if (e.value === 'Backend') {
      this.skills = ['C#', 'DBMS', 'SQL'];
    } else {
      this.skills = ['HTML', 'CSS', 'JS', 'DBMS', 'SQL', 'Angular', 'C#'];
    }
  }

  fillForm(data: User){
    this.createForm.setValue({
      firstName: data.firstName,
      lastName: data.lastName,
      email: data.email,
      mobile: data.mobile,
      gender: data.gender,
      techStack: data.techStack,
      skill: data.skill,
      dob: data.dob,
    })
    if (data.techStack === 'Frontend') {
      this.skills = ['HTML', 'CSS', 'JS', 'Angular'];
    } else if (data.techStack === 'Backend') {
      this.skills = ['C#', 'DBMS', 'SQL'];
    } else {
      this.skills = ['HTML', 'CSS', 'JS', 'DBMS', 'SQL', 'Angular', 'C#'];
    }
  }
}
