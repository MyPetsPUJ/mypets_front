import { Component, OnInit } from '@angular/core';
import { FundacionService } from 'src/app/services/fundacion/fundacion.service';
import { UserFundacion } from '../../interfaces/usuarios/userFundacion';

@Component({
  selector: 'app-fundaciones',
  templateUrl: './fundaciones.component.html',
  styleUrls: ['./fundaciones.component.css']
})
export class FundacionesComponent implements OnInit {
  fundaciones: UserFundacion[] = [];

  constructor(private fundacionesService: FundacionService) { }

  ngOnInit(): void {
    this.fundacionesService.getFundaciones().subscribe({
      next: (res) => {
        this.fundaciones = res;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

}
