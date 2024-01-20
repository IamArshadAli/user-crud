import { Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserFormComponent } from './Components/user-form/user-form.component';
import { UserService } from './Services/user.service';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBarService } from './Services/mat-snack-bar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'user-crud';
  displayedColumns: string[] = [
    'id',
    'department',
    'name',
    'mobile',
    'email',
    'doj',
    'gender',
    'salary',
    'userCode',
    'status',
    'action',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _userService: UserService,
    private _snackBar: MatSnackBarService
  ) {}

  ngOnInit(): void {
    this.getUsersList();
  }

  getUsersList() {
    this._userService.getAllUsers().subscribe((users: any) => {
      console.log(users);
      this.dataSource = new MatTableDataSource(users);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteUser(id: string) {
    console.log(id);
    this._userService.deleteUser(id).subscribe((res) => {
      this._snackBar.openSnackBar('User Deleted Successfully', 'Done!');
      this.getUsersList();
    });
  }

  openUserForm() {
    const dialogRef = this._dialog.open(UserFormComponent);
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.getUsersList();
    });
  }

  openEditUserForm(data: any) {
    const dialogRef = this._dialog.open(UserFormComponent, { data: data });
    dialogRef.afterClosed().subscribe((res) => {
      if (res) this.getUsersList();
    });
  }
}
