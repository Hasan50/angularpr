import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from "@angular/router";

import { User } from '../../models/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css','../../../assets/resta/css/bootstrap.min.css'],
  encapsulation: ViewEncapsulation.None,
  host: { 'class': 'home' }
})
export class HomeComponent implements OnInit {

  currentUser: User;
    users: User[] = [];

  constructor(private router: Router, private location: Location) {
        
  }
  slides = [
    {img: "../../../assets/resta/images/dish/1.png",name:"Dish Name Here",price:"$100"},
    {img: "../../../assets/resta/images/dish/2.png",name:"Dish Name Here",price:"$100"},
    {img: "../../../assets/resta/images/dish/3.png",name:"Dish Name Here",price:"$100"},
    {img: "../../../assets/resta/images/dish/1.png",name:"Dish Name Here",price:"$100"},
    {img: "../../../assets/resta/images/dish/2.png",name:"Dish Name Here",price:"$100"},
    {img: "../../../assets/resta/images/dish/3.png",name:"Dish Name Here",price:"$100"},
    {img: "../../../assets/resta/images/dish/1.png",name:"Dish Name Here",price:"$100"},
    {img: "../../../assets/resta/images/dish/2.png",name:"Dish Name Here",price:"$100"},
    {img: "../../../assets/resta/images/dish/3.png",name:"Dish Name Here",price:"$100"},
  ];
  slideConfig = { "arrows": false,"dots": true,"slidesToShow": 3, "slidesToScroll": 3,customPaging: function(slider, i) {
    return '<a href="javascript:void(0)">' + (i + 1) + '</a>';
},};
testimonialslides = [
  {img: "../../../assets/resta/images/testimonial/1.jpg"},
  {img: "../../../assets/resta/images/testimonial/2.jpg"},
  {img: "../../../assets/resta/images/testimonial/1.jpg"},
  {img: "../../../assets/resta/images/testimonial/2.jpg"},
];
testimonialImageslideConfig = { "arrows": false,"dots": true,"slidesToShow": 3, "slidesToScroll": 1, draggable: false,
fade: true,asNavFor: '.testimonial-image-slider',customPaging: function(slider, i) {
  return '<a href="javascript:void(0)">' + (i + 1) + '</a>';
}};
testimonialTextslideConfig = { "arrows": false,"dots": false,centerMode: true,focusOnSelect: true,centerPadding: '0',"slidesToShow": 1, "slidesToScroll": 3,
fade: true,asNavFor: '.testimonial-image-slider',     responsive: [
            
  {
    breakpoint: 767,
    settings: {
      autoplay: true,
      dots: false,
      slidesToShow: 2,
      centerMode: false,
      }
  },
  {
    breakpoint: 480,
    settings: {
      autoplay: true,
      dots: false,
      slidesToShow: 1,
      centerMode: false,
      }
  }
]};
  ngOnInit() {    
    // if (location.pathname == '/') {
    //   this.router.navigate(['dashboard']);
     
    // }
  }
}
