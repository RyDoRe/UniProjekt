import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { take, map } from 'rxjs/operators';
import { TaskBoardTemplate } from '../task-board/task-board';
import { v4 as uuid } from 'uuid';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class BoardService {

  private baseUrl;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.configService.getKey('restApi').pipe(take(1)).subscribe(url => {
      this.baseUrl = url;
    });
  }

  public createBoard(name: string): Observable<TaskBoardTemplate> {
    const newBoard: TaskBoardTemplate = {
      id: uuid(),
      name,
    };
    return this.http.post(this.baseUrl + 'board/addBoard', newBoard).pipe(map((board: TaskBoardTemplate) => {
      return board;
    }));
  }

  public getAllBoards(): Observable<TaskBoardTemplate[]> {
    return this.http.get(this.baseUrl + `board/getAllBoards`).pipe(map((boards: TaskBoardTemplate[]) => {
      return boards;
    }));
  }

  public getFullBoard(board: TaskBoardTemplate): Observable<TaskBoardTemplate> {
    return this.http.get(this.baseUrl + `board/getAllBoards/${board.id}`).pipe(map((board: TaskBoardTemplate) => {
      return board;
    }));
  }

  public updateBoard(board: TaskBoardTemplate): Observable<TaskBoardTemplate> {
    return this.http.post(this.baseUrl + 'board/updateBoard', board).pipe(map((board: TaskBoardTemplate) => {
      return board;
    }));
  }
  public deleteBoard(board: TaskBoardTemplate): Observable<TaskBoardTemplate> {
    return this.http.delete(this.baseUrl + `board/deleteBoard/${board.id}`).pipe(map((data: any) => {
      return board;
    }));
  }

}
