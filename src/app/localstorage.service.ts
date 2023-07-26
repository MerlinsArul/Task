import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {
  private readonly prefix = 'my_app_';

  constructor() {}

  setFields(key: string, value: any[]) {
    localStorage.setItem(this.prefix + key, JSON.stringify(value));
  }

  getFields(key: string): any[] {
    const storedData = localStorage.getItem(this.prefix + key);
    return storedData ? JSON.parse(storedData) : [];
  }
}
