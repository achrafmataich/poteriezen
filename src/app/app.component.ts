import { Component, OnInit } from '@angular/core';
import { ThemeService } from './services/theme.service';
import { initFlowbite } from 'flowbite';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'PoterieZen';
  isDark!: boolean;

  constructor(
    private readonly colorMode: ThemeService
  ) { }

  ngOnInit(): void {
    initFlowbite();
    this.colorMode.colorMode$.subscribe(val => {
      this.isDark = val === "dark"
    });

    this.isDark = this.colorMode.colorMode === "dark";
  }
}
