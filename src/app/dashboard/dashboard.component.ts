import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { ToastrService } from 'ngx-toastr';
import { EventDetailsCount } from '../services/eventdetailscount.model';
import { Event } from '../services/eventinfo.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  eventDetailsCount:EventDetailsCount =new  EventDetailsCount();
  activeEventType: string;
  roleType = 'user';

  constructor(private eventService: EventService, private toastr: ToastrService,private router: Router) { }

  ngOnInit(): void {
    this.activeEventType="TOTAL";
    this.getEventsDetailsOfType();
  }

  getEventDetailsList(eventType) {
    return  this.eventDetailsCount.eventDetailsMap[eventType];
  }
  getTypeCount(type) {
    if(type=="ALL"){
    return  this.eventDetailsCount.count.totalCount;
    }else if(type=="ACTIVE"){
      return  this.eventDetailsCount.count.activeCount;
    }
    else if(type=="COMPLETED"){
      return  this.eventDetailsCount.count.completedCount;
    }
    else if(type=="UPCOMING"){
      return  this.eventDetailsCount.count.upcomingCount;
    }
  }
  setEventType(type){
    this.activeEventType=type;
  }
  getEventType(){
    return this.activeEventType;
  }
  getEventsDetailsOfType(){
    this.eventService.getEventsDetailsOfType("123456").subscribe((res:any) => {
      console.log(res);
      this.eventDetailsCount=res;
    }, err => {
      this.toastr.error(err.message);
    });
  }
  getNominated(eventId){
    this.eventService.getNominated(this.setEventType,"123456",eventId).subscribe((res:any) => {
      console.log(res);
      this.eventDetailsCount=res;
    }, err => {
      this.toastr.error(err.message);
    });
  }

  editEvent(event:Event){
    console.log(event);
    this.eventService.setEvent(event);
    this.router.navigate(['/edit']);
    if(this.roleType==='Admin'){
      this.eventService.setSelectedTab('mail');
    }else{
      this.eventService.setSelectedTab('createquestion');
    }
  }
}
