import { Component, OnInit } from '@angular/core';
import { CheckInOut } from './models/checkInOut.model';
import { InternscheckService } from './service/internscheck.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  msg = '';

  isAlert: boolean = true;

  labelB: string = 'Enter';

  checks: CheckInOut[] = [];

  check: CheckInOut = {
    id: '',
    internName: '',
    positionId: 0,
    teamId: 0,
    date: '',
    checkinTime: '',
    checkoutTime: ''
  };

  constructor(private checkInOut: InternscheckService){

  }
  ngOnInit(): void {
    this.getCheckInOuts();
  }


  getCheckInOuts(){
    this.checkInOut.getAllCheckInOuts().subscribe(
      response => {
        this.checks = response;
      }
    );
  }

  onSubmit(){

    if (this.check.id === '') {
      this.checkInOut.addNewCheck(this.check)
      .subscribe(
        response => {
          //en mettan sa, sava refresh la page, i mean le tablo
          this.getCheckInOuts();

          //en fesant sa, sava clear la form
          this.check = {
            id: '',
            internName: '',
            positionId: 0,
            teamId: 0,
            date: '',
            checkinTime: '',
            checkoutTime: ''
          };

          this.isAlert = false;
          this.msg = 'The new data has been added with success';
          setTimeout(()=>{
            this.isAlert = true;
       }, 3600);

        }
      );
    } else {
      this.labelB = 'Enter'

      this.updateCheck(this.check);

    }

  }

  deleteCheck(id: string){
    this.checkInOut.deleteC(id)
    .subscribe(
      response => {
        this.getCheckInOuts();

        this.isAlert = false;
        this.msg = 'The data has been deleted with success';
        setTimeout(()=>{
          this.isAlert = true;
     }, 3600);

     this.check = {
      id: '',
      internName: '',
      positionId: 0,
      teamId: 0,
      date: '',
      checkinTime: '',
      checkoutTime: ''
    };


      }
    );
}


onModify(check: CheckInOut) {
  this.check = check;
  this.labelB = 'Save';
}

updateCheck(check: CheckInOut){
  this.checkInOut.updateInfoCheck(check)
  .subscribe(
    response => {
      this.getCheckInOuts();
      //mettre alert ici
      this.isAlert = false;
      this.msg = 'The data has been modified with success';
      setTimeout(()=>{
        this.isAlert = true;
   }, 3600);

      this.check = {
        id: '',
        internName: '',
        positionId: 0,
        teamId: 0,
        date: '',
        checkinTime: '',
        checkoutTime: ''
      };
    }
  );
}

}
