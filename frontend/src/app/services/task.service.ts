import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { take, map } from 'rxjs/operators';
import { TaskItem } from '../task-board/task-board';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private baseUrl;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
  ) {
    this.configService.getKey('restApi').pipe(take(1)).subscribe(url => {
      this.baseUrl = url;
    });
  }

  public getAllTasks(boardId: string): Observable<TaskItem[]> {
    return this.http.get(this.baseUrl + `task/getAllTasks/${boardId}`).pipe(map((tasks: TaskItem[]) => {
      return tasks;
    }));
  }
  public createTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post(this.baseUrl + 'task/addTask', task).pipe(map((task: TaskItem) => {
      return task;
    }));
  }
  public updateTask(task: TaskItem): Observable<TaskItem> {
    return this.http.post(this.baseUrl + 'task/updateTask', task).pipe(map((task: TaskItem) => {
      return task;
    }));
  }

  public deleteTask(task: TaskItem): Observable<any> {
    return this.http.delete(this.baseUrl + `task/deleteTask/${task.id}`).pipe(map((data) => {
      return data;
    }));
  }

  public getPersonalTasks(userId: string): Observable<TaskItem[]> {
    return this.http.get(this.baseUrl + `task/getAllTasksOfUser/${userId}`).pipe(map((tasks: TaskItem[]) => {
      return tasks;
    }));
  }

}
