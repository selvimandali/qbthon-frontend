import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  activItem: string;
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  changeActiveItem(selection){
    this.activItem = selection;
    if(selection==='home'){
      this.router.navigate(['/home'])
    }else if(selection==='create'){
      this.router.navigate(['/create-event'])
    }
    if(selection==='reports'){
      this.router.navigate(['/report'])
    }
  }
}
