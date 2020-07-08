import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

declare var stringee: any;
declare var StringeeSoftPhone: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  isActive: boolean = false;
  routeSnapshot: string[];

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  fromPhoneNumber: any = '842873000259';
  fromNumbers = [{ alias: 'Number-1', number: '+842873000259' }];

  callLogInfo: any;
  access_token: string ='eyJjdHkiOiJzdHJpbmdlZS1hcGk7dj0xIiwidHlwIjoiSldUIiwiYWxnIjoiSFMyNTYifQ.eyJqdGkiOiJTS1d6eDlZRmcyRlZld0cxZk5WNTVJakE1dWdBa0xTSzlJLTE1OTQxNzUzMzEiLCJpc3MiOiJTS1d6eDlZRmcyRlZld0cxZk5WNTVJakE1dWdBa0xTSzlJIiwiZXhwIjoxNTk2NzY3MzMxLCJ1c2VySWQiOiJzaWFtIn0.BY1r-51YojKG-xgHprxxFIrzaMhCToFbBU2teEQql_s';


  ngOnInit(): void {
    this.routeSnapshot = window.location.href.split('/');
    this.callConnect();
  }
   config = {
    showMode: 'full', //full | min | none
    top: 45,
    // left: 50,
    //right: undefined,
    //bottom: undefined,
    arrowLeft: 155,
    arrowDisplay: 'top', //top | bottom | none
    //list your Stringee Number
    fromNumbers: [{ alias: 'Number-1', number: `+842873000259` }, { alias: 'Number-2', number: '+2222' }],
    askCallTypeWhenMakeCall: false,
    appendToElement: null,
    makeAndReceiveCallInNewPopupWindow: false
  };

  closeConfig = {
    showMode: 'none', //full | min | none
    top: 45,
    // left: 50,
    //right: undefined,
    //bottom: undefined,
    arrowLeft: 155,
    arrowDisplay: 'top', //top | bottom | none
    //list your Stringee Number
    fromNumbers: [{ alias: 'Number-1', number: `+842873000259` }, { alias: 'Number-2', number: '+2222' }],
    askCallTypeWhenMakeCall: false,
    appendToElement: null,
    makeAndReceiveCallInNewPopupWindow: false
  };
  callConnect() {
    this.fromNumbers = [{ alias: 'Number-1', number: `${this.fromPhoneNumber}` }];
    setTimeout(() => {
      StringeeSoftPhone.config({ fromNumbers: this.fromNumbers });
      StringeeSoftPhone.connect(this.access_token)
    }, 200);
  }

  callConfig(config) {
    new stringee();
    var access_token = 'YOUR_ACCESS_TOKEN';


    StringeeSoftPhone.init(config);

    StringeeSoftPhone.on('displayModeChange', function (event) {
      console.log('displayModeChange', event);
      if (event === 'min') {
        StringeeSoftPhone.config({ arrowLeft: 75 });
      } else if (event === 'full') {
        StringeeSoftPhone.config({ arrowLeft: 155 });
      }
    });

    StringeeSoftPhone.on('requestNewToken', function () {
      console.log('requestNewToken+++++++');
      StringeeSoftPhone.connect(access_token);
    });

    StringeeSoftPhone.on('authen', function (res) {
      console.log('authen: ', res);
    });

    StringeeSoftPhone.on('disconnect', function () {
      console.log('disconnected');
    });

    // StringeeSoftPhone.on('signalingstate', function (state) {
    //   console.log('signalingstate', state);
    // });

    StringeeSoftPhone.on('beforeMakeCall', function (call, callType) {
      console.log('beforeMakeCall: ' + callType);
      return true;
    });

    StringeeSoftPhone.on('answerIncomingCallBtnClick', function () {
      console.log('answerIncomingCallBtnClick');
    });

    StringeeSoftPhone.on('makeOutgoingCallBtnClick', function (fromNumber, toNumber, callType) {
      console.log('makeOutgoingCallBtnClick: fromNumber=' + fromNumber + ', toNumber=' + toNumber + ',callType=' + callType);
    });

    StringeeSoftPhone.on('incomingCall', function (incomingcall) {
      console.log('incomingCall: ', incomingcall);
    });

    StringeeSoftPhone.on('endCallBtnClick', function () {
      console.log('endCallBtnClick - Kết thúc cuộc gọi');

    });

    StringeeSoftPhone.on('callingScreenHide', function () {
      // this.called = true;
      console.log('callingScreenHide');
    });

    StringeeSoftPhone.on('declineIncomingCallBtnClick', function () {
      console.log('declineIncomingCallBtnClick');
    });

    StringeeSoftPhone.on('incomingScreenHide', function () {
      console.log('incomingScreenHide');
    });

    StringeeSoftPhone.on('customMessage', function (data) {
      console.log('customMessage', data);
    });
  }
  test() {
    StringeeSoftPhone.init(this.closeConfig);
  }
}
