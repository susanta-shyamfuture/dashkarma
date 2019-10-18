import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { UserService } from "../../../core/services/user.service";
import { ListaddressComponent } from "../address/listaddress/listaddress.component";
import { environment } from "../../../../environments/environment";
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  userId:any;
  userType:any;
  userDetails:any ={};
  fileData:any;
  imageBaseUrl:any;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private userService: UserService,
    public dialog: MatDialog,
  ) { }

  ngOnInit() {
    this.imageBaseUrl = environment.imageEndpoint;
    //alert(localStorage.getItem('userType'));
    this.userId = localStorage.getItem('userId');
   //this.userImage =  profile_image
    this.getUserDetails(this.userId);
    this.userType = localStorage.getItem('userType');
   // alert(this.userType);
  }

  getUserDetails(id) {
    var data = {
      "user_type":localStorage.getItem('userType')
    }
    this.userService.userDetails(id,data).subscribe(
      res => {
        console.log("User Details==>",res);
       this.userDetails = res['result']['detail'];
      //  console.log("Cms Details==>",this.userDetails);
      },
      error => {
        console.log("Error Get Category",error);
      }
    )
  }

  openListAddress() {
    let dialogRef = this.dialog.open(ListaddressComponent, {
      width: '900px',
      height:'600px',
      data: {
      }
    });
    dialogRef.afterClosed().subscribe(result => {
    })
  }

  gotoPage(page) {
    this.router.navigate([page]);
  }

  fileProgress(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    console.log("Image Path==>",this.fileData);
    const formData = new FormData();
   // formData.append('profile_image', this.fileData);
    formData.append('profile_image', this.fileData, this.fileData.name);
    formData.append('user_type', this.userType);
    console.log("Image Form Data ==>",formData);

    this.userService.updateImage(formData,this.userId).subscribe(
      res => {
        console.log("Update Image==>",res);
        this.getUserDetails(this.userId);
      },
      error => {
       
      }
    )
}

// onSubmit() {
//   const formData = new FormData();
//     formData.append('file', this.fileData);
//     this.http.post('url/to/your/api', formData)
//       .subscribe(res => {
//         console.log(res);
//         this.uploadedFilePath = res.data.filePath;
//         alert('SUCCESS !!');
//       })
// }

}
