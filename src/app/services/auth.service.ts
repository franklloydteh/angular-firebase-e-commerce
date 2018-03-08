import {Injectable} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireAuth} from "angularfire2/auth";
import {Observable} from "rxjs/Observable";
import {ActivatedRoute, Router} from "@angular/router";
import {UserService} from "./user.service";
import {AppUser} from "../models/app.user";
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/observable/of'

@Injectable()
export class AuthService {

  user$: Observable<firebase.User>;

  constructor(private afAuth: AngularFireAuth,
              private userService: UserService,
              private route: ActivatedRoute,
              private router: Router) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.auth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(result => {
      this.user$.subscribe(user => this.userService.save(user));
      this.router.navigate([localStorage.getItem('returnUrl')]);
    })
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$
      .switchMap(user => {
        if (user)
          return this.userService.get(user.uid)
        return Observable.of(null);
      });
  }
}
