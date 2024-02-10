import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export type ThemeType = "dark" | "light";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private _colorMode$: Subject<ThemeType> = new Subject<ThemeType>();
  private _colorMode: ThemeType = "light";

  constructor() {
    const mode: string | null = localStorage.getItem("mode");


    if (mode) {
      this._colorMode = mode as ThemeType;
    } else {
      localStorage.setItem("mode", this._colorMode);
    }

    this._colorMode$.next(this._colorMode);
  }

  get colorMode(): ThemeType {
    return this._colorMode;
  }

  public toggleMode() {
    if (this._colorMode === "dark") this._colorMode = "light";
    else this._colorMode = "dark";

    localStorage.setItem('mode', this._colorMode);

    this._colorMode$.next(this._colorMode);
  }

  public get colorMode$(): Observable<ThemeType> {
    return this._colorMode$.asObservable();
  }

}
