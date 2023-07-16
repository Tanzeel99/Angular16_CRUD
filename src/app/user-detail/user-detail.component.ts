import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit{
  public userURLId!: number;
  public userDetails!: User;
  constructor(
    private api: ApiService,
    private toast : ToastrService,
    private activatedRoute : ActivatedRoute,
    private router : Router
  ){

  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(val => {
      this.userURLId = val['id'];
      this.fetchUserDetails(this.userURLId);
    })
  }

  fetchUserDetails(userId: number) {
    this.api.getRegisteredUserId(userId)
      .subscribe({
        next: (res) => {
          this.userDetails = res;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }
}
