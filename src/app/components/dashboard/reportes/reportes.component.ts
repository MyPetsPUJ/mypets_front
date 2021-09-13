import { DatePipe } from '@angular/common';
import { HOST_ATTR } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { stringify } from 'querystring';


@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  range = new FormGroup({
    inicio: new FormControl(),
    final: new FormControl()
  });
  constructor() { 
  }

  ngOnInit(): void {
  }
  verFecha()
  {
    console.log(this.range.value);
  }
}
