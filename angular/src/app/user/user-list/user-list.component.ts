import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user.model";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  constructor(private userService: UserService) { }

  users: User[];
  errorMsg: string;
  isCreateMode: boolean = false;
  isUpdateMode: boolean = false;
  tobeUpdatedUser: User;
  @ViewChild('userForm') userForm: NgForm;

  ngOnInit() {
    //this.getUsers();
  }

  getUsers(){
    this.hideForms();
    this.userService.getUsers().
    subscribe(
      (data) => {
        this.users = data;
      }
    );
  }

  deleteUser(user: User){
    this.hideForms();
    this.userService.deleteUserbyId(user.id).subscribe(
      data => {
        if(data){
          this.getUsers();
        }else{
          this.displayErrorMessage(user, 'deletion');
        }
      }
    )
  }

  displayErrorMessage(user: User, msg: string){
    this.errorMsg = `${msg} on {user.firstName} {user.lastName} failed`;
  }

  //create new user
  submitUser(userForm: NgForm){
    this.hideForms();
    let formValue = userForm.form.value;
    let user: User = new User(0, formValue.fname, formValue.lname, formValue.email);
    this.errorMsg = null;
    this.userService.createNewUser(user).subscribe(
      data => {
        if(data){
          this.getUsers();
        }else{
          this.displayErrorMessage(user, 'create');
        }
      }
    )
  }

  createUser(){
    this.isCreateMode = true;
  }

  updateUser(userForm: NgForm){
    this.hideForms();
    let formValue = userForm.form.value;
    let user: User = new User(this.tobeUpdatedUser.id, formValue.fname, formValue.lname, formValue.email);
    this.userService.updateUser(user).subscribe(
      data => {
        if(data){
          this.getUsers();
        }else{
          this.displayErrorMessage(user, 'update');
        }
      }
    )
  }

  onClickUpdate(user: User){
    this.isUpdateMode = true;
    this.tobeUpdatedUser = user;
  }

  hideForms(){
    this.isUpdateMode = false;
    this.isCreateMode = false;
    this.errorMsg = null;
  }
}
