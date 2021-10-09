import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuService } from 'src/app/services/menu.service';
import { LoginService } from 'src/app/services/login.service';
import { Menu } from '../../interfaces/menu';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  menu: Menu[] = [];
  userIsAuth = false;
  private authListenerSubs: Subscription | undefined;

  constructor(
    private menuService: MenuService,
    public authService: LoginService
  ) {}

  ngOnInit(): void {
    this.correrNavbar();
    this.userIsAuth = this.authService.getIsAuth();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuth => {
      this.userIsAuth = isAuth;
    });
  }

  ngOnDestroy(){
    this.authListenerSubs?.unsubscribe();
  }
  cargarMenu() {
    this.menuService.getMenu().subscribe((data) => {
      this.menu = data;
    });
  }
  correrNavbar() {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll<HTMLElement>('.nav-links li');
    burger?.addEventListener('click', () => {
      nav?.classList.toggle('nav-active');
      navLinks.forEach((link, index) => {
        if (link.style.animation) {
          link.style.animation = '';
        } else {
          link.style.animation = `navLinkFade 0.5s ease forwards ${
            index / 7 + 0.3
          }s`;
        }
      });
      burger?.classList.toggle('toggle');
    });
  }

  onLogout() {
    this.authService.logout();
  }
}
