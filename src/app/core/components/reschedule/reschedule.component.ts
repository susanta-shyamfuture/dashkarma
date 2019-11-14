import { Component, OnInit,Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import * as moment from 'moment';
import { MainService } from "../../../core/services/main.service";
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
@Component({
  selector: 'app-reschedule',
  templateUrl: './reschedule.component.html',
  styleUrls: ['./reschedule.component.scss']
})
export class RescheduleComponent implements OnInit {
  newdate:any;
  orderId:any;
  today: any = new Date();
  calendarMinDate: any = new Date(this.today.setDate(this.today.getDate() + 3));
  constructor(
    private mainService: MainService,
    private toastr: ToastrService,
    private router: Router,
    public dialog: MatDialog,
    private dialogRef: MatDialogRef<RescheduleComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) { 
    this.orderId = data.orderId;
  }

  ngOnInit() {
  }

  closeModal() {
    this.dialogRef.close(true);
  }

  getReschedule(dt1) {
    if (dt1._selected) {
      this.newdate = moment(dt1._selected).format('YYYY-MM-DD HH:m:s');
      const data = {
        id: this.orderId,
        reschedule: this.newdate,
      };
      this.mainService.rescheduleService(data).subscribe(
        res => {
          if (res['status'] == true) {
            this.dialog.closeAll();
            this.toastr.success('your request for reschedule has been send', '', {
              timeOut: 3000,
            });
          } else {
            this.toastr.success('try again to reschedule the service', '', {
              timeOut: 3000,
            });
          }
        },
        error => {
          console.log(error.error);
          this.toastr.error('Error!!!', '', {
            timeOut: 3000,
          });
        }
      );
    } else {
      this.toastr.warning('Please select a Date Time.', '', {
        timeOut: 3000,
      });
    }
  }

}
