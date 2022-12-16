import { Component, Inject, Injectable, NgZone } from '@angular/core';
import { Router, UrlTree } from '@angular/router';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export abstract class AbstractComponent {
  public ngZone: NgZone;
  public router: Router;
  baseurl: string = environment.baseurl;
  constructor(ngZone: NgZone, router: Router) {
    this.ngZone = ngZone;
    this.router = router;
  }

  showErrorAlert(erreur: string, route: string) {
    Swal.fire({
      title: 'Erreur !',
      text: erreur,
      icon: 'error',
      showCancelButton: true,
      confirmButtonText: 'Accueil',
      cancelButtonText: 'Rester',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngZone.run(() => this.router.navigateByUrl('/'));
      } else if (result.isDismissed) {
        this.ngZone.run(() => this.router.navigateByUrl(route));
      }
    });
  }

  showSuccesAlert(route: string) {
    Swal.fire({
      title: 'Succès !',
      text: "L'opération à réussie , choissisez votre redirection",
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Accueil',
      cancelButtonText: 'Rester',
    }).then((result) => {
      if (result.isConfirmed) {
        this.ngZone.run(() => this.router.navigateByUrl(route));
      } else if (result.isDismissed) {
        this.ngZone.run(() => this.router.navigateByUrl('/'));
      }
    });
  }

  redirect(route: string | UrlTree) {
    this.ngZone.run(() => this.router.navigateByUrl(route));
  }
}
