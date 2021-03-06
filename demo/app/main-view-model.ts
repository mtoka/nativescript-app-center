import { Observable } from 'tns-core-modules/data/observable';
import { AppCenter } from 'nativescript-app-center';
import { InitOption, PropertyOption, CrashesListener } from 'nativescript-app-center/app-center.common';
import { ErrorReport } from 'nativescript-app-center/Models';
import * as dialogs from 'tns-core-modules/ui/dialogs';

export class HelloWorldModel extends Observable {
  public message: string;
  private appCenter: AppCenter;

  constructor() {
    super();

    this.appCenter = new AppCenter();

    // Analytics Callbacks

    this.appCenter.onAnalyticsListener({
      onBeforeSending: (report: any) => {
        console.log('before');
      },
      onSendingFailed: (log: any) => {
        console.log('failed');
      },
      onSendingSucceeded: (log: any) => {
        console.log('success');
      }
    });

    // Crashes Callbacks

    this.appCenter.onCrashesListener({
      shouldProcess: (report: ErrorReport) => {
        console.log('should Process');
        return true;
      },
      shouldAwaitUserConfirmation: () => {
        console.log('Confirm');
        return false;
      },
      getErrorAttachments: (report: ErrorReport) => {
        return null;
      },
      onBeforeSending: (report: ErrorReport) => {
        console.log('before');
      },
      onSendingFailed: (report: ErrorReport, e: any) => {
        console.log('failed');
      },
      onSendingSucceeded: (report: ErrorReport) => {
        console.log('success');
      }
    });


  }

  trackEvent(): void {
    console.log('track');
    let property: Array<PropertyOption> = new Array<PropertyOption>();
    property.push({ key: "name", value: "mayunga2" }, { key: "Surname", value: "Jonathan" });
    this.appCenter.trackEvent('Clicked', property);
  }

  testCrash(): void {
    console.log('Crash');
    this.appCenter.testCraches();
  }

  distribute(): void {
    this.appCenter.isDistributeEnabled().then((enabled) => {
      console.log(enabled);
    });
  }
}
