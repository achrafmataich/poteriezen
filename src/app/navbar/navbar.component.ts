import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../services/theme.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  animations: [
    trigger('rotate', [
      state('open', style({ transform: 'rotate(180deg)' })),
      state('closed', style({ transform: 'rotate(0deg)' })),
      transition('open <=> closed', animate('300ms ease-in-out')),
    ]),
  ]
})
export class NavbarComponent implements OnInit {
  isHomeMenuOpen: boolean = false;
  menuShown: boolean = false;
  submenuState: 'open' | 'closed' = 'closed';
  isDark!: boolean;

  constructor(
    private readonly colorMode: ThemeService
  ) { }

  ngOnInit(): void {
    this.colorMode.colorMode$.subscribe(val => {
      this.isDark = val === 'dark';
    });

    this.isDark = this.colorMode.colorMode === "dark";
  }

  handleValueChange(value: any): void {
    this.colorMode.toggleMode();
  }

  toggleHomeMenu = () => {
    this.isHomeMenuOpen = !this.isHomeMenuOpen;
    this.submenuState = this.isHomeMenuOpen ? "open" : "closed";
  }

  toggleMenu = () => {
    this.menuShown = !this.menuShown;
  }

}
