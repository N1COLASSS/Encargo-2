import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.page.html',
  styleUrls: ['./about.page.scss'],
})
export class AboutPage implements OnInit {

  pageTitle = 'About';
  image = 'about.png';
  pageIcon = `../../assets/img/${this.image}`

  
  constructor() { }

  ngOnInit() {
  }

}
