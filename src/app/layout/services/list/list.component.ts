import { Component, OnInit ,Optional,Inject} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PackageComponent } from "../../../core/components/package/package.component";
import { MainService } from "../../../core/services/main.service";
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  subServiceList:any=[];
  parentCatDetails:any ={};
  constructor(
    public dialog: MatDialog,
    private mainService: MainService,
    private route: ActivatedRoute,
    private dialogRef: MatDialogRef<ListComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any
  ) { 
    dialogRef.disableClose = true;
    console.log("kkkk==>",data.service);
    this.subCatList(data.service.id)
  }

  ngOnInit() {
    // this.route.params.subscribe(routeParams => {
    //   this.getSubCatList(routeParams.id)
    //  });
  }

  subCatList(id) {
 //   this.spinner.show();
    this.mainService.getSubCatList(id).subscribe(
      res => {
        console.log("Sub Cat List==>", res);
        this.parentCatDetails = res['result']['parent'][0]['detail'];
        this.subServiceList =res['result']['list'];
     //   this.spinner.hide();
      },
      error => {
        console.log(error.error);
      //  this.spinner.hide();
      }
    )
  }

  getsubCatListt(servicelist) {
    console.log("click123==>",servicelist.subcategories.length);
    if(servicelist.subcategories.length > 0) {
      this.mainService.getSubCatList(servicelist.id).subscribe(
        res => {
          console.log("Sub Cat List kalyan==>", res);
          this.parentCatDetails = res['result']['parent'][0]['detail'];
          this.subServiceList =res['result']['list'];
       //   this.spinner.hide();
        },
        error => {
          console.log(error.error);
        //  this.spinner.hide();
        }
      )
    }
    else {
      let dialogRef = this.dialog.open(PackageComponent, {
        width: '900px',
        height:'600px',
        data: {
          "service":servicelist
        }
      });
      dialogRef.afterClosed().subscribe(result => {
      })
    }
  }

  backModal() {
    this.dialogRef.close(true);
  }

  closeModal() {
    this.dialog.closeAll();
  }

}
