import { Component } from '@angular/core';
import { UserService } from '../service/user.service';
import { ClasseService } from '../service/classe.service';

@Component({
  selector: 'app-join-university',
  templateUrl: './join-university.component.html',
  styleUrls: ['./join-university.component.css']
})
export class JoinUniversityComponent {

  constructor(private userService : UserService){}
  Join() {
    this.userService
      .becomeUnconfirmedUser()
      .subscribe(
        () => {
          console.log('changed role');
        },
        (error) => {
          console.error('Error assigning schedule:', error);
        }
      );
  }
}
