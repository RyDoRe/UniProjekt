import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { take, map } from 'rxjs/operators';
import { TaskBoardSliderPage } from '../task-board/task-board';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PageService {

  private baseUrl;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.configService.getKey('restApi').pipe(take(1)).subscribe(url => {
      this.baseUrl = url;
    });
  }

  public createPage(newPage: TaskBoardSliderPage): Observable<TaskBoardSliderPage> {
    return this.http.post(this.baseUrl + 'page/addPage', newPage).pipe(map((page: TaskBoardSliderPage) => {
      return page;
    }));
  }

  public getCustomPages(boardId: string): Observable<TaskBoardSliderPage[]> {
    return this.http.get(this.baseUrl + `page/getCustomPages/${boardId}`).pipe(map((pages: TaskBoardSliderPage[]) => {
      return pages;
    }));
  }
  public getAllPages(): Observable<TaskBoardSliderPage[]> {
    return this.http.get(this.baseUrl + `page/getPages`).pipe(map((pages: TaskBoardSliderPage[]) => {
      return pages;
    }));
  }

  public updatePage(page: TaskBoardSliderPage): Observable<TaskBoardSliderPage> {
    return this.http.post(this.baseUrl + 'page/updatePage', page).pipe(map((pageData: TaskBoardSliderPage) => {
      return pageData;
    }));
  }

  public deletePage(page: TaskBoardSliderPage): Observable<TaskBoardSliderPage> {
    return this.http.delete(this.baseUrl + `page/deletePage/${page.id}`).pipe(map((data: any) => {
      return data;
    }));
  }

}
