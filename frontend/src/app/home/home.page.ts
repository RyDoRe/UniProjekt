import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';
import { TaskService } from '../services/task.service';
import { TaskItem } from '../task-board/task-board';
import { User } from '../services/auth.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  private user: User;
  public personalTasks: TaskItem[] = [];
  constructor(
    private userService: UserService,
    private taskService: TaskService,
  ) { }

  ngOnInit(): void {
    this.user = this.userService.getUser();
    this.taskService.getPersonalTasks(this.user.id).pipe(take(1)).subscribe(tasks => {
      tasks.forEach(task => {
        task.assignUser = this.user;
      });

      this.personalTasks = tasks;
    });
  }
}

