import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { UserService } from '../../Services/user.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBarService } from '../../Services/mat-snack-bar.service';
import { Validators } from "@angular/forms";

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrl: './user-form.component.css',
})
export class UserFormComponent {
  registerForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private _userService: UserService,
    private _dialogRef: MatDialogRef<UserFormComponent>,
    private _snackBar: MatSnackBarService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.registerForm = this._fb.group({
      department: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      mobile: new FormControl("", Validators.required),
      email: new FormControl("", Validators.required),
      doj: new FormControl("", Validators.required),
      gender: new FormControl("", Validators.required),
      salary: new FormControl("", Validators.required),
      userCode: new FormControl("", Validators.required),
      status: new FormControl(false),
    });
  }

  ngOnInit() {
    this.registerForm.patchValue(this.data);
  }

  onFormSubmit() {
    if (this.registerForm.valid) {
      if (this.data) {
        console.log(this.registerForm.value);
        this._userService
          .updateUser(this.data.id, this.registerForm.value)
          .subscribe((res) => {
            this._snackBar.openSnackBar('User Updated Successfully', 'Done!');
            this._dialogRef.close(true);
          });
      } else {
        console.log(this.registerForm.value);
        this._userService.addUser(this.registerForm.value).subscribe((res) => {
          this._snackBar.openSnackBar('User Added Successfully', 'Done!');
          this._dialogRef.close(true);
        });
      }
    }
  }
}
