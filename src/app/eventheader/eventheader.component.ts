import { Component, OnInit, ViewChild } from '@angular/core';
import { TabsetComponent, TabDirective } from 'ngx-bootstrap/tabs';
import { EventService } from '../services/event.service';
import { Event } from '../services/eventinfo.model';
import { StatusComponent } from '../status/status.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-eventheader',
  templateUrl: './eventheader.component.html',
  styleUrls: ['./eventheader.component.scss']
})
export class EventheaderComponent implements OnInit {

  @ViewChild('caseTabs') caseTabs: TabsetComponent;
  @ViewChild('adminCaseTabs') adminCaseTabs: TabsetComponent;
  event: Event;
  userRole = 'user';
  isStatusSelected: boolean;
  @ViewChild('statusComponent') statusComponent: StatusComponent;

  constructor(private eventService: EventService, private router: Router) { }

  ngOnInit(): void {
    this.populateEventDetails();
  }

  ngAfterViewInit() {
    if(this.userRole!='Admin'){
      this.selectedTabValue;
    }else{
      this.selectedTabValueForUser;
    }
  }

  get selectedTabValue(){
    if (this.eventService.getSelectedTab()) {
      if (this.eventService.getSelectedTab() === 'mail') {
        if (this.adminCaseTabs) {
          this.adminCaseTabs.tabs[0].active = true;
        }
        this.eventService.setSelectedTab('');
      } else if (this.eventService.getSelectedTab() === 'viewquestions') {
        if (this.adminCaseTabs) {
          this.adminCaseTabs.tabs[1].active = true;
        }
        this.eventService.setSelectedTab('');
      }else {
        this.eventService.setSelectedTab('');
      }
    }
    return true;
  }

  get selectedTabValueForUser() {
    if (this.eventService.getSelectedTab()) {
      if (this.eventService.getSelectedTab() === 'createquestion') {
        if (this.caseTabs) {
          this.caseTabs.tabs[0].active = true;
        }
        this.eventService.setSelectedTab('');
      } else if (this.eventService.getSelectedTab() === 'viewstatus') {
        if (this.caseTabs) {
          this.caseTabs.tabs[1].active = true;
        }
        this.eventService.setSelectedTab('');
      } else if (this.eventService.getSelectedTab() === 'leaderboard') {
        if (this.caseTabs) {
          this.caseTabs.tabs[2].active = true;
        }
        this.eventService.setSelectedTab('');
      } else {
        this.eventService.setSelectedTab('');
      }
    }
    return true;
  }

  populateEventDetails(){
    this.event = this.eventService.getEvent();
    if(!this.event){
      this.router.navigate(['/home']);
    }
  }

  refreshData(){
    console.log("Refreshing data::::");
    if(this.statusComponent){
      this.statusComponent.getQuestionsMapList();
    }
  }

}
