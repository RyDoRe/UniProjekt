import { Injectable } from '@angular/core';
import { Observable, forkJoin, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  public cache: IConfig; // stores latest config
  public restUrl: string;
  public authUrl: string;

  constructor(
    private http: HttpClient,

  ) {
    this.load();
  }
  /**
     * get key from config file
     * @returns Observable<any>
     */
  getKey(key: string): Observable<any> {
    // get cache
    if (this.cache) {
      return of(this.cache[key]);
    } else {
      // read config file
      return this.http.get('./assets/config.json').pipe(map((file: IConfig) => {
        this.cache = file;
        return file[key];
      }));
    }
  }
  private loadFiles(): Observable<any> {
    return forkJoin(this.http.get('./assets/config.json')).pipe(map((configs: any[]) => {
      this.cache = configs[0];
      this.restUrl = this.cache.restApi;
    }));
  }

  public load() {
    return this.loadFiles().toPromise();
  }

}

export interface IConfig {
  restApi: string;
}
