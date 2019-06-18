import { Subscription } from 'rxjs';
import { AuthService } from './../auth/auth.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  userIsAuthenticated = false;
  userId: any;
  private authListenerSubs: Subscription;
  private userIdListenerSubs: Subscription;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    console.log('header init', this.userId, this.userIsAuthenticated);
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.userId = this.authService.getUserId();
    this.authListenerSubs = this.authService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
    this.userIdListenerSubs = this.authService.getUserIdListener().subscribe(retrievedUserId => {
      this.userId = retrievedUserId;
    });
  }

  onLogout() {
    this.authService.logout();
    this.userId = this.authService.getUserId();
    console.log('header logout', this.userId, this.userIsAuthenticated);
  }

}
