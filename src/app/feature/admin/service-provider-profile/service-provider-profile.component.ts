import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PhoneValidator } from 'src/app/shared/custom-validator/custom-validator';

@Component({
  selector: 'app-service-provider-profile',
  templateUrl: './service-provider-profile.component.html',
  styleUrls: ['./service-provider-profile.component.scss']
})
export class ServiceProviderProfileComponent implements OnInit {

  loading = false;
  breadCrumbItems: Array<{}>;
  spProfileForm: FormGroup;
  submitted = false;
  serviesDS = [];

  constructor() { }

  // convenience getter for easy access to form fields
  get f(): any { return this.spProfileForm.controls; }

  ngOnInit(): void {
    this.spProfileForm = new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      servies: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      contactNumber: new FormControl(''),
      tags: new FormControl('')
    });

    this.serviesDS = [{name: 'Other', id: '-1'}]
  }

}
