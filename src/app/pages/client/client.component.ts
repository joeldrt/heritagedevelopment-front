import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { Propiedad } from 'src/app/models/propiedad';
import { PropiedadService } from 'src/app/services/propiedad/propiedad.service';
import { HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss']
})
export class ClientComponent implements OnInit {

  user: any;

  propiedades: Propiedad[];

  constructor(
    private authService: AuthService,
    private propiedadService: PropiedadService,
    private router: Router,
  ) { }

  ngOnInit() {
    this.user = this.authService.getCurrentUser();
    this.propiedadService.obtenerMisPropiedadesStrapi(this.user.username).subscribe(
      (response: HttpResponse<Propiedad[]>) => {
        this.propiedades = response.body;
      },
      (error: any) => {
        console.error(error);
        this.router.navigate(['/login']);
      }
    );
  }

}
