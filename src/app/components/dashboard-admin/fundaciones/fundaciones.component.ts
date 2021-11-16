import { Component, OnInit } from '@angular/core';
import { FundacionService } from 'src/app/services/fundacion/fundacion.service';

@Component({
  selector: 'app-fundaciones',
  templateUrl: './fundaciones.component.html',
  styleUrls: ['./fundaciones.component.css'],
})
export class FundacionesComponent implements OnInit {
  constructor(private fundacionService: FundacionService) {}

  ngOnInit(): void {
    this.cargarFundaciones();
  }

  cargarFundaciones() {
    this.fundacionService.mostrarFundacionesAdmin().subscribe((res) => {
      console.log(res);
    });
  }
}
