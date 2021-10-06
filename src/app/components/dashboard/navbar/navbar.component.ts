import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { LoginService } from 'src/app/services/login.service';
import { Menu } from '../../interfaces/menu';



@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent implements OnInit {
  menu: Menu [] = [];
  constructor(private menuService: MenuService, public loginService: LoginService) { }

  ngOnInit(): void {
    
    this.correrNavbar();
  }
  cargarMenu()
  {
    this.menuService.getMenu().subscribe(data => 
      {
        this.menu = data;
      })
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
