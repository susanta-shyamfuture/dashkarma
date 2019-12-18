import { Component, OnInit } from '@angular/core';
import {  MainService} from "../../core/services/main.service";
import { environment } from "../../../environments/environment";
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.scss']
})
export class CalenderComponent implements OnInit {
  pdfFile:any;
  imageBaseUrl:any;
  constructor(
    private mainService: MainService,
    public sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageEndpoint;
    this.getPdf();
  }

  getPdf() {
    this.mainService.getPdfFile().subscribe(
      res => {
       var pdfFile1 = res['result'][0].pdf;
       this.pdfFile = this.sanitizer.bypassSecurityTrustResourceUrl(`${this.imageBaseUrl}${pdfFile1}`);
      },
      error => {
        console.log(error);
      }
    )
  }

}
