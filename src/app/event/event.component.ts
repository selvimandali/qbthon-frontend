import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, FormBuilder, Validators } from '@angular/forms';
import { EventService } from '../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { Event } from '../services/eventinfo.model';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.scss']
})
export class EventComponent implements OnInit {

  eventCreationForm: FormGroup;
  @ViewChild(FormGroupDirective)
  formGroupDirective: FormGroupDirective;
  submitted: boolean;
  isSecOption: boolean;
  today: Date;
  files: any[] = [];
  assocFiles: any[] = [];
  event: Event = new Event();
  skills: string[];

  constructor(private formBuilder: FormBuilder, private eventService: EventService, private toastr: ToastrService) { }

  ngOnInit(): void {
    this.eventCreationForm = this.formBuilder.group({
      date: ['', Validators.required],
      slot: ['', Validators.required],
      skill: ['', Validators.required]
    })
    this.today = new Date();
  }

  get date() {
    return this.eventCreationForm.get('date');
  }

  get slot() {
    return this.eventCreationForm.get('slot');
  }

  get skill() {
    return this.eventCreationForm.get('skill');
  }

  uploadSME(event) {
    for (let index = 0; index < event.target.files.length; index++) {
      this.files.push(event.target.files[index]);
    }
    console.log(this.files);
  }

  createEvent() {
    this.submitted = true;
    if (this.eventCreationForm.invalid) {
      return;
    }
    if (this.files.length > 0) {
      const data = new FormData();
      data.append('smeFile', this.files[0]);
      data.append('assocFile', this.assocFiles[0]);
      this.event.date = this.date.value;
      this.event.skills = this.skill.value.toString();
      this.event.slot = this.slot.value;
      data.append('event',JSON.stringify(this.event));
      console.log(this.event);
      this.eventService.createEvent(data).subscribe(res => {
        const response = res;
        console.log(res);
        this.toastr.success(res.toString());
        this.files = [];
      }, err => {
        console.log(err);
        this.toastr.error(err.error);
        this.files = [];
      });
    } else {
      this.toastr.error('Please select files to upload');
    }
  }

  uploadAssociates(event) {
    for (let index = 0; index < event.target.files.length; index++) {
      this.assocFiles.push(event.target.files[index]);
    }
    console.log(this.assocFiles);
  }


  cancel() {
    this.submitted = false;
    this.eventCreationForm.reset();
    this.slot.setValue('');
    this.date.setValue('');
    this.skill.setValue('');
    this.assocFiles = [];
    this.files = [];
  }

}
