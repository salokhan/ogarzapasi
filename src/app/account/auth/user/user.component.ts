import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseUserModel } from 'src/app/core/models/user.models';
import { UserService } from 'src/app/core/services/user.service';
import { AuthenticationService } from 'src/app/core/services/auth.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
})
export class UserComponent implements OnInit {
  user: FirebaseUserModel = new FirebaseUserModel();
  profileForm: FormGroup;

  constructor(
    public userService: UserService,
    public authService: AuthenticationService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // this.route.data.subscribe((routeData) => {
    //   let data = routeData['data'];
    //   if (data) {
    //     this.user = data;
    //     this.createForm(this.user.name);
    //   }
    // });

    // this.userService.getUserByID().then((user) => {
    //   this.user = user;
    //   this.createForm(this.user.firstName + ' '+ this.user.lastName);
    // });

    this.userService.getCurrentUser().then((user) => {
      this.user = user;
      this.userService.getUserByID(user).subscribe((userDetails) => {
        this.user = userDetails;
        this.createForm(this.user.firstName + ' ' + this.user.lastName);
      }, (error) => {
        console.log(error);
      });
      this.createForm(this.user.firstName + ' '+ this.user.lastName);
    });

  }

  createForm(name): void {
    this.profileForm = this.fb.group({
      name: [name, Validators.required],
    });
  }

  save(value) {
    this.userService.updateCurrentUser(value).then(
      (res) => {
        console.log(res);
      },
      (err) => console.log(err)
    );
  }

  logout() {
    this.authService.doLogout().then(
      (res) => {
        this.location.back();
      },
      (error) => {
        console.log('Logout error', error);
      }
    );
  }
}
