import { Component, OnInit } from '@angular/core';
import { AdminService } from '../../../../providers/admin/admin.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AlertService } from '../../../../providers/alert/alert.service';

@Component({
  selector: 'app-generate-fee-receipt',
  templateUrl: './generate-fee-receipt.component.html',
  styleUrls: ['./generate-fee-receipt.component.css']
})
export class GenerateFeeReceiptComponent implements OnInit {

  centers: Array<any>
  quaters = [{ Qtype: "FYQ1", id: 2 }, { Qtype: "FYQ2", id: 3 }, { Qtype: "FYQ3", id: 4 }, { Qtype: "FYQ4", id: 1 }];
 currentYear:number;
 
  years = [ ];
  paymentMode = ["CASH", "CHEQUE", "NEFT", "CARD"];

  studentDetails: Array<any>;
  viewPanel = false;
  mailPanel = false;
  recordPayment = false;
  downloadReceipt = false;
  currentDate:Date;
  selectedStudentDetails: any = {};
  feePaymentForm: FormGroup;
  allItems: any;
  showtable=false;
downloadinData:boolean;
  constructor(
    private adminService: AdminService,
    private fb: FormBuilder,
    private alertService: AlertService
  ) {
    this.currentDate = new Date();
   this.currentYear =(new Date()).getFullYear();
   
   this.years.push(this.currentYear-1);
    this.years.push(this.currentYear);
   }


  generateSlipForm = this.fb.group({
    center: ['', Validators.required],
    quater: ['', Validators.required],
    year: ['', Validators.required],
  });

  


  getCenter() {
    this.adminService.getProgramCenter()
      .subscribe((res) => {
        this.centers = res;
      })
  }




  get() {
    this.downloadinData=false;

    this.adminService.getStudentFeeList(  {"centerCode": this.generateSlipForm.value.center,
    "period": "Quarterly",
    "quarter": this.generateSlipForm.value.quater,
    "year": this.generateSlipForm.value.year})
      .subscribe((res) => {
        console.log(res);
        
        this.showtable=true;
        this.downloadinData=true;

        this.studentDetails = res;
        this.allItems= res.slice(0)
      }, (err) => {
        this.downloadinData=true
        this.showtable=true;

        this.alertService.errorAlert(err)
      })

  }

  searchStudent(event: any) {
    const val =  event.target.value.toLowerCase();
    if (val && val.trim() !== '') {
      this.studentDetails = this.allItems.filter(student => {
        return student.fullName.toLowerCase().startsWith(val);
      });
    } else {
      this.studentDetails = this.allItems
    }
  }




  showSidePanel(value: boolean, student: object) {
    this.mailPanel = false;
    this.viewPanel = value;

    this.selectedStudentDetails = (student) ? student : {};
    this.feePaymentForm = this.getRegenerateSlipForm();    
    this.feePaymentForm.patchValue(this.selectedStudentDetails);

  }

  getRegenerateSlipForm() {
    return this.fb.group({

      addmissionFeeDiscount: [{ value: '', disabled: false }],
      addmissionPaidAmountTotal: [{ value: '', disabled: false }],
      adjust: [{ value: '', disabled: false }],
      admissionFee: [{ value: '', disabled: false }],
      annualFee: [{ value: '', disabled: false }],
      annualFeeDiscount: [{ value: '', disabled: false }],
      annualPaidAmountTotal: [{ value: '', disabled: false }],
      autoComments: [{ value: '', disabled: false }],
      balance: [{ value: '', disabled: false }],
      baseFee: [{ value: '', disabled: false }],
      baseFeeDiscount: [{ value: '', disabled: false }],
      cgst: [{ value: '', disabled: false }],
      comments: [{ value: '', disabled: false }, Validators.required],
      deposit: [{ value: '', disabled: false }],
      depositFeeDiscount: [{ value: '', disabled: false }],
      depositPaidAmountTotal: [{ value: '', disabled: false }],
      extraCharge: [{ value: '', disabled: false }],
      fee: [{ value: '', disabled: false }],
      feeDuration: [{ value: '', disabled: false }],
      feeRatio: [{ value: '', disabled: false }],
      finalAdmissionFee: [{ value: '', disabled: false }],
      finalAnnualCharges: [{ value: '', disabled: false }],
      finalBaseFee: [{ value: '', disabled: false }],
      finalDepositFee: [{ value: '', disabled: false }],
      finalTransportFee: [{ value: '', disabled: false }],
      fullName: [{ value: '', disabled: false }],
      generateActive: [{ value: '', disabled: false }],
      group: [{ value: '', disabled: false }],
      gstAmount: [{ value: '', disabled: false }],
      id: [{ value: '', disabled: false }],
      igst: [{ value: '', disabled: false }],
      invoiceDate: [{ value: '', disabled: false }],
      latePaymentCharge: [{ value: '', disabled: false }],
      month: [{ value: '', disabled: false }],
      payableAmount: [{ value: '', disabled: false }],
      payments: [{ value: '', disabled: false }],
      program: [{ value: '', disabled: false }],
      programPaidAmountTotal: [{ value: '', disabled: false }],
      quarter: [{ value: '', disabled: false }],
      sgst: [{ value: '', disabled: false }],
      stationary: [{ value: '', disabled: false }],
      stationaryPaidAmountTotal: [{ value: '', disabled: false }],
      status: [{ value: '', disabled: false }],
      paymentDate: [{ value: this.currentDate.toISOString().split('T')[0] , disabled: false }],
      totalFee: [{ value: '', disabled: false }],
      totalOtherPaidAmount: [{ value: '', disabled: false }],
      totalOtherRemainningAmount: [{ value: '', disabled: false }],
      totalPaidAmount: [{ value: '', disabled: false }],
      transportFee: [{ value: '', disabled: false }],
      transportPaidAmountTotal: [{ value: '', disabled: false }],
      uniformCharges: [{ value: '', disabled: false }],
      uniformPaidAmountTotal: [{ value: '', disabled: false }],
      year: [{ value: '', disabled: false }],
      // paymentDate: [{ value: '', disabled: false }],
      paymentMode: [{ value: '', disabled: false }],
      paidAmount: [{ value: '', disabled: false }],
      txnid: [{ value: '', disabled: false }],
confirmed:[{value:false,disabled:false}]
      
    });
  }
  ngOnInit() {
    this.getCenter();
  }


  paymentRecord(){
this.recordPayment=true;
this.adminService.payStudentFee(this.feePaymentForm.value)
.subscribe((res)=>{

  console.log(res);
  
  this.recordPayment=false;
},(err)=>{
  this.recordPayment=false;
  this.alertService.errorAlert(err)
})

  }

receiptDownload(){

  this.downloadReceipt=true;
this.adminService.payStudentFee(this.selectedStudentDetails.id)
.subscribe((res)=>{

  console.log(res);
  
  this.downloadReceipt=false;
},(err)=>{
  this.downloadReceipt=false;
  this.alertService.errorAlert(err)
})
}

  


  sendMailPanel(value) {
    this.mailPanel = value;

  }

 




}
