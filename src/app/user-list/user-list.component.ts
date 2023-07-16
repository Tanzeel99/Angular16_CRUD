import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator'; 
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { User } from '../models/user.model';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  public dataSource!: MatTableDataSource<User>;
  public users!: User[];
  @ViewChild(MatPaginator) paginator! : MatPaginator;
  @ViewChild(MatSort) sort! : MatSort;
  displayedColumns:string[] = ['firstName','lastName','email','mobile','gender','techStack','dob','action'];

  constructor(
   private api : ApiService,
   private router : Router,
   private toast : ToastrService,
  //  private confirmService: NgConfirmService,
  ){

  }
  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.api.getRegisteredUser()
      .subscribe({
        next: (res) => {
          this.users = res;
          this.dataSource = new MatTableDataSource(this.users);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  edit(id: number) {
    this.router.navigate(['update', id])
  }

  deleteUser(id: number) {
    // this.confirmService.showConfirm("Are you sure want to Delete?",
    //   () => {
        this.api.deleteRegistered(id)
          .subscribe({
            next: (res) => {
              this.toast.success('Deleted Successfully');
              this.getUsers();
            },
            error: (err) => {
              this.toast.error('Something went wrong!');
            }
          })
      }
  //     ,() => {
  //     })
  // }
}
