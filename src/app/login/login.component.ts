import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/core/service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(private fb: FormBuilder,
    private authService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {

    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    const val = this.form.value;

    if (val.email && val.password) {
      this.authService.login(val.email, val.password)
        .subscribe(
          (data) => {
            this.router.navigate([this.route.snapshot.queryParams['returnUrl'] || '/']);
          }, error => {
            // TODO: handle error for failure in authentication
          }
        );
    }
  }

  ngOnInit() {
  }

}
