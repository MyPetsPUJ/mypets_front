import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.correrNavbar();
  }
  correrNavbar()
  {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll<HTMLElement>('.nav-links li');
    burger?.addEventListener('click',()=>{
      nav?.classList.toggle('nav-active');
      navLinks.forEach((link,index)=>{
        if(link.style.animation){
            link.style.animation='';
        } else {
            link.style.animation= `navLinkFade 0.5s ease forwards ${index/7+0.3}s`;
        }
      });
      burger?.classList.toggle("toggle");
    });
    
  }

}
