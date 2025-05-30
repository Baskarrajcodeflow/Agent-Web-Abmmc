import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, of } from "rxjs";
import { environment } from "../../environments/environment";
import { BundleTopupReq } from "../interfaces/interfaces";

@Injectable({
  providedIn: "root",
})
export class ApiService {
  token:any
  constructor(private http: HttpClient) {}
  private getHeaders(): HttpHeaders {
    let token;
    if (sessionStorage) {
      token = sessionStorage.getItem("JWT_TOKEN");
      this.token = sessionStorage.getItem("JWT_TOKEN");
      if (token == null || token == undefined) {
        token = "Dummy Value";
        this.token = "Dummy Value";
      }
    }
    return new HttpHeaders().set("Authorization", "Bearer " + token);
  }

  post<T>(endpoint : string, reqPayload : any):Observable<T>{
    console.log(`URL:${environment.apiUrl}${endpoint}`)
     return this.http.post<T>(`${environment.apiUrl}${endpoint}`, reqPayload).pipe(
       catchError(this.handleError<T>(`post ${endpoint}`))
     );
    }
    
  private handleError<T>(operation = 'operation', result?: T) {
    return (error : any) : Observable<T> => {
      console.error(`${operation} failed : ${error.message}`);
      return of(result as T);
    }
  }

  public getUserProfile() {
    let url = environment.apiUrl + "/um/api/agent/profile";
    let h: HttpHeaders = this.getHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this.http.get<any>(url, { headers: h });
  }

    public getPayFromAccountDetails(phoneOrWalletNo:any) {
    let url = environment.apiUrl + `/ts/api/transaction-services/CurrentBalance?phoneOrWalletNo=${phoneOrWalletNo}&meta=WALLET`;
    let h: HttpHeaders = this.getHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this.http.get<any>(url, { headers: h });
  }

  public searchUserToPay(meta:any,phoneOrWalletNo:any) {
    let url = environment.apiUrl + `/ts/api/transaction-services/findUser?phoneOrWalletNo=${phoneOrWalletNo}&meta=${meta}`;
    let h: HttpHeaders = this.getHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this.http.get<any>(url, { headers: h });
  }
  
  public findWithdrawalReq(customerId:any) {
    let url = environment.apiUrl + `ts/api/transaction-services/findWithdrawalReq?id=${customerId}`;
    let h: HttpHeaders = this.getHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this.http.get<any>(url, { headers: h });
  }

  public checkFeesAndCommission(phoneOrWalletNo:any,amount:any) {
    let url = environment.apiUrl + `/ts/api/transaction-services/getFinalAmount?serviceName=WALLET_TO_WALLET&channel=WALLET&amount=${amount}&walletNo=${phoneOrWalletNo}`;
    let h: HttpHeaders = this.getHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this.http.get<any>(url, { headers: h });
  }

  public transferMoney(data:any) {
    let url = environment.apiUrl + `/tms/api/tms/router/basic`;
    let h: HttpHeaders = this.getHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this.http.post<any>(url,data, { headers: h });
  }

  public widthdrawalMoney(data:any) {
    let url = environment.apiUrl + `/ts/api/transaction-services/withdrawal`;
    let h: HttpHeaders = this.getHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this.http.post<any>(url,data, { headers: h });
  }

  public payRollMoney(data:any) {
    let url = environment.apiUrl + `/ts/api/transaction-services/payRoll`;
    let h: HttpHeaders = this.getHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this.http.post<any>(url,data, { headers: h });
  }


  public fetchBreshnaBill(accountNo:any) {
    let url = environment.apiUrl + `/ts/api/transaction-services/fetchBill?accountNo=${accountNo}`;
    let h: HttpHeaders = this.getHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this.http.get<any>(url, { headers: h });
  }

  public payBreshnaBill(data:any) {
    let url = environment.apiUrl + `/tms/api/tms/router/basic`;
    let h: HttpHeaders = this.getHeaders().set(
      "Content-Type",
      "application/json"
    );
    return this.http.post<any>(url,data, { headers: h });
  }

  
  public postKycDetails(body: any) {
    let url = `${environment.apiUrl}/kyc/agent/basic`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    return this.http.post<any>(url, body, { headers: h });
  }
  // public kycProofUpload(biz_license_back: FormData, id: any) {
  //   let url = `${environment.apiUrl}/kyc/agent/uploadAttachment?mapping=${biz_license_back}&submittedFor=${id}`;
  //   let h: HttpHeaders = this.getHeaders().set(
  //     'Content-Type',
  //     'multipart/form-data'
  //   );
  //   return this.http.post<any>(url,{ headers: h });
  // }

  public kycProofUpload(formData: FormData, mapping: string, id: any) {
    const params = new HttpParams()
      .set('mapping', mapping)
      .set('submittedFor', id.toString());
    const url = `${environment.apiUrl}/kyc/agent/uploadAttachment`;
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + this.token); 
    return this.http.post<any>(url, formData, { headers, params });
  }

  public CustomerkycProofUpload(formData: FormData, mapping: string, id: any) {
    const params = new HttpParams()
      .set('mapping', mapping)
      .set('customerId', id.toString());
    const url = `${environment.apiUrl}/kyc/customer/uploadImage`;
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + this.token); 
    return this.http.post<any>(url, formData, { headers, params });
  }

  public subAgentkycProofUpload(formData: FormData, mapping: string, id: any) {
    const params = new HttpParams()
      .set('mapping', mapping)
      .set('submittedFor', id.toString());
    const url = `${environment.apiUrl}/kyc/agent/uploadAttachment`;
    const headers = new HttpHeaders()
      .set("Authorization", "Bearer " + this.token); 
    return this.http.post<any>(url, formData, { headers, params });
  }
  

  public b2bSignIp(body: any) {
    let url = `${environment.apiUrl}/um/api/agent/registerInDirectAgent`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    // console.log(h);
    return this.http.post<any>(url, body, { headers: h });
  }

  public merchantReg(body: any) {
    let url = `${environment.apiUrl}/um/api/merchant/mobile/signUpForMerchant`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    // console.log(h);
    return this.http.post<any>(url, body, { headers: h });
  }

  public generateOtp(body: any) {
    let url = `${environment.apiUrl}/um/api/otp/generate`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    console.log(h);
    return this.http.post<any>(url, body, { headers: h });
  }

  public forgotPwd(body: any) {
    let url = `${environment.apiUrl}/um/api/pwd/forgot`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    console.log(h);
    return this.http.post<any>(url, body, { headers: h });
  }
  
  public verifyOtp(body: any) {
    let url = `${environment.apiUrl}/um/api/otp/verify`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    console.log(h);

    return this.http.post<any>(url, body, { headers: h });
  }

  

  public getCountries() {
    let url = `${environment.apiUrl}/kyc/locations/countries`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    return this.http.get<any>(url, { headers: h });
  }
  public getprovinces() {
    let url = `${environment.apiUrl}/kyc/locations/provinces`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    return this.http.get<any>(url, { headers: h });
  }
  public getdistricts(provinceId: any) {
    let url =
      environment.apiUrl +
      '/kyc/locations/provinces/' +
      provinceId +
      '/districts';
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    return this.http.get<any>(url, { headers: h });
  }

  //-------------------------------------------------------------------------------//
  public registerSubAgent(body: any,parentId:any) {
    let url = `${environment.apiUrl}/um/api/bo/registerSubAgent?parentId=${parentId}`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    // console.log(h);
    return this.http.post<any>(url, body, { headers: h });
  }

  public getSubAgent() {
    let url = `${environment.apiUrl}/um/api/agent/mobile/getAllUnderHands`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    // console.log(h);
    return this.http.get<any>(url, { headers: h });
  }
  
  public getStockBalance(accNo:any) {
    let url = `${environment.apiUrl}/ts/api/transaction-services/stockBalance?accNo=${accNo}`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    // console.log(h);
    return this.http.get<any>(url, { headers: h });
  }

  public subAgentCommission(serviceName:any) {
    let url = `${environment.apiUrl}/um/api/agent/subAgentCommissions?serviceName=${serviceName}`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    // console.log(h);
    return this.http.get<any>(url, { headers: h });
  }
  
  public deleteSubAgent(id:any) {
    let url = `${environment.apiUrl}/um/api/agent/mobile/subagent/${id}`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    // console.log(h);
    return this.http.delete<any>(url, { headers: h });
  }

  public updateSubAgentCommission(subId:any,commission:any) {
    let url = `${environment.apiUrl}/um/api/agent/updateCommission?subId=${subId}&commission=${commission}`;
    let h: HttpHeaders = this.getHeaders().set(
      'Content-Type',
      'application/json'
    );
    // console.log(h);
    return this.http.post<any>(url,{}, { headers: h });
  }

  // Transaction History
public getTranasctionHistory(walletNo: any,trxnType:any,fromDate:any,toDate:any) {
  let url = environment.apiUrl + `/ts/api/transaction-services/getFilteredHistory?walletNo=${walletNo}&trxnType=${trxnType}&fromDate=${fromDate}&toDate=${toDate}`;
  let h: HttpHeaders =
    this.getHeaders().set("Content-Type", "application/json");
  return this.http.get<any>(url, { headers: h })
}

//DCMS
public getSearchWithBenificiaryToken(token:any) {
  let url = `${environment.apiUrl}/dcms/agent/beneficiary?token=${token}`;
  let h: HttpHeaders = this.getHeaders().set(
    'Content-Type',
    'application/json'
  );
  // console.log(h);
  return this.http.get<any>(url, { headers: h });
}


public verifyToken(data:any) {
  let url = `${environment.apiUrl}/dcms/agent/verify`;
  let h: HttpHeaders = this.getHeaders().set(
    'Content-Type',
    'application/json'
  );
  // console.log(h);
  return this.http.post<any>(url,data, { headers: h });
}

public makeBenificiaryAsPaid(data:any) {
  let url = `${environment.apiUrl}/dcms/agent/pay`;
  let h: HttpHeaders = this.getHeaders().set(
    'Content-Type',
    'application/json'
  );
  // console.log(h);
  return this.http.post<any>(url,data, { headers: h });
}

//Payroll Transaction
public getPayrollBalance(phoneOrWalletNo:any,meta:any) {
  let url = `${environment.apiUrl}/ts/api/transaction-services/payRoleBalance?phoneOrWalletNo=${phoneOrWalletNo}&meta=${meta}`;
  let h: HttpHeaders = this.getHeaders().set(
    'Content-Type',
    'application/json'
  );
  // console.log(h);
  return this.http.get<any>(url, { headers: h });
}


public addAgentLicense(file1: File, fieldname: any, photoId: any) {
  let h: HttpHeaders = this.getHeaders();
  const file = new FormData();
  file.append('file', file1);
  let url = `${environment.apiUrl}/kyc/agent/uploadImage?mapping=` + fieldname + `&submittedFor=` + photoId;
  return this.http.post<any>(url, file, { headers: h })
}
public addAgentAddressProof(file1: File, fieldname: any, photoId: any) {
  let h: HttpHeaders = this.getHeaders();
  const file = new FormData();
  file.append('file', file1);
  let url = `${environment.apiUrl}/kyc/agent/uploadImage?mapping=` + fieldname + `&submittedFor=` + photoId;
  return this.http.post<any>(url, file, { headers: h })
}
public addAgentTin(file1: File, fieldname: any, photoId: any) {
  let h: HttpHeaders = this.getHeaders();
  const file = new FormData();
  file.append('file', file1);
  let url = `${environment.apiUrl}/kyc/agent/uploadImage?mapping=` + fieldname + `&submittedFor=` + photoId;
  return this.http.post<any>(url, file, { headers: h })
}

public agentUpdate(req: any) {
  let url = `${environment.apiUrl}/kyc/agent/update`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  console.log(url);
  return this.http.post<any>(url, req, { headers: h });
}

public agentComplete(id: any) {
  let url = `${environment.apiUrl}/kyc/agent/complete?agentId=${id}`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  console.log(url);
  return this.http.post<any>(url, {}, { headers: h });
}

public agentRegister(req: any) {
  let url = `${environment.apiUrl}/um/api/bo/registerAgent`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  console.log(url);
  return this.http.post<any>(url, req, { headers: h });
}

public merchantRegister(req: any) {
  let url = `${environment.apiUrl}/um/api/bo/registerMerchant`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  console.log(url);
  return this.http.post<any>(url, req, { headers: h });
}
public addAgentMultipleDoc(file1: File, fieldname: any, photoId: any) {
  let h: HttpHeaders = this.getHeaders();
  const file = new FormData();
  file.append('file', file1);
  let url = `${environment.apiUrl}/kyc/agent/uploadImage?mapping=` + fieldname + `&submittedFor=` + photoId;
  return this.http.post<any>(url, file, { headers: h })
}


public addAgentPhoto(file1: File, fieldname: any, photoId: any) {
  let h: HttpHeaders = this.getHeaders();
  const file = new FormData();
  file.append('file', file1);
  let url = `${environment.apiUrl}/kyc/agent/uploadImage?mapping=` + fieldname + `&submittedFor=` + photoId;
  return this.http.post<any>(url, file, { headers: h })
}
public addAgentDigSign(file1: File, fieldname: any, photoId: any) {
  let h: HttpHeaders = this.getHeaders();
  const file = new FormData();
  file.append('file', file1);
  let url = `${environment.apiUrl}/kyc/agent/uploadImage?mapping=` + fieldname + `&submittedFor=` + photoId;
  return this.http.post<any>(url, file, { headers: h })
}
public addAgentDocFront(file1: File, fieldname: any, photoId: any) {
  let h: HttpHeaders = this.getHeaders();
  const file = new FormData();
  file.append('file', file1);
  let url = `${environment.apiUrl}/kyc/agent/uploadImage?mapping=` + fieldname + `&submittedFor=` + photoId;
  return this.http.post<any>(url, file, { headers: h })
}
public addSuperAgentSign(file1: File, fieldname: any, photoId: any) {
  let h: HttpHeaders = this.getHeaders();
  const file = new FormData();
  file.append('file', file1);
  // file.append('customerKycId', photoId)
  // file.append('type', customerData)
  let url = `${environment.apiUrl}/kyc/super/uploadAttachment?mapping=` + fieldname + `&submittedFor=` + photoId;
  return this.http.post<any>(url, file, { headers: h })
}

public agentSubmit(req: any) {
  let url = `${environment.apiUrl}/kyc/agent/basic`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  console.log(url);
  return this.http.post<any>(url, req, { headers: h });
}
public addAgentDocBack(file1: File, fieldname: any, photoId: any) {
  let h: HttpHeaders = this.getHeaders();
  const file = new FormData();
  file.append('file', file1);
  let url = `${environment.apiUrl}/kyc/agent/uploadImage?mapping=` + fieldname + `&submittedFor=` + photoId;
  return this.http.post<any>(url, file, { headers: h })
}
public addAgentphoto(file1: File, fieldname: any, agentId: any) {
  let h: HttpHeaders = this.getHeaders();
  const file = new FormData();
  file.append('file', file1);
  // file.append('customerKycId', photoId)
  // file.append('type', customerData)
  let url = `${environment.apiUrl}/kyc/agent/uploadAttachment?mapping=` + fieldname + `&submittedFor=` + agentId;
  return this.http.post<any>(url, file, { headers: h })
}

public getNatureOfBusiness() {
  let url = `${environment.apiUrl}/kyc/common/getAllFirmType`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  console.log(url);
  return this.http.get<any>(url, { headers: h });
}

public getIncomeSource() {
  let url = `${environment.apiUrl}/kyc/common/sourceOfIncome`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  console.log(url);
  return this.http.get<any>(url, { headers: h });
}

public getAccPurpose() {
  let url = `${environment.apiUrl}/kyc/common/purposeOfAcc`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  console.log(url);
  return this.http.get<any>(url, { headers: h });
}

public customerKYCRegister(req: any) {
  let url = `${environment.apiUrl}/um/api/customer/mobile/signUp`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  console.log(url);
  return this.http.post<any>(url, req, { headers: h });
}

public generate(body: any) {
  let url = `${environment.apiUrl}/aaa/generate`;
  let h: HttpHeaders = this.getHeaders().set(
    'Content-Type',
    'application/json'
  );
  console.log(h);
  return this.http.post<any>(url, body, { headers: h });
}
public topUpRecharge(data: any) {
  let url = `${environment.apiUrl}/tms/api/tms/router/basic`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  return this.http.post(url, data, {
    headers: h,
  });
}

public submitCorporateProfilePic(fileToUpload: File) {
  let h: HttpHeaders = this.getHeaders(); 
  const formData = new FormData(); 
  formData.append('file', fileToUpload); 
  let url = `${environment.apiUrl}/um/api/agent/profilePic`;
  return this.http.post<any>(url, formData, { headers: h });
}

public checkPhoneExist(phone:string) {
  let url = `${environment.apiUrl}/um/api/app/phoneCheck?phone=`+phone;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  return this.http.get<any>(url, { headers: h });
}
public checkEmailExist(email:string) {
  let url = `${environment.apiUrl}/um/api/app/emailCheck?email=`+email;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  return this.http.get<any>(url, { headers: h });
}
public ChangePinRequest (data:any) {
  let url = `${environment.apiUrl}/um/api/pwd/update`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  return this.http.post<any>(url,data, { headers: h });
}

public getSubAgentsByAgent() {
  let url = `${environment.apiUrl}/um/api/agent/getSubAgentsByAgent`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  return this.http.get<any>(url, { headers: h });
}

public getNonAwccStockBalance(accNo:number) {
  let url = `${environment.apiUrl}/ts/api/transaction-services/stockBalance?accNo=${accNo}`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  return this.http.get<any>(url, { headers: h });
}
public getAwccStockBalance(accNo:number) {
  let url = `${environment.apiUrl}/ts/api/transaction-services/awccStockBalance?accNo=${accNo}`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  return this.http.get<any>(url, { headers: h });
}

public stockPurchase(data:any) {
  let url = `${environment.apiUrl}/tms/api/tms/router/basic`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  return this.http.post<any>(url,data, { headers: h });
}

public getBundles() {
  let url = environment.apiUrl + `/tms/serviceDetail/awcc/bundlePacks`;
  let h: HttpHeaders =
    this.getHeaders().set("Content-Type", "application/json");
    console.log(url);
  return this.http.get<any>(url, { headers: h })
}
public bundleTopup(req : BundleTopupReq){
  let url = environment.apiUrl + `/tms/api/tms/router/basic`;
  let h: HttpHeaders = this.getHeaders().set(
    "Content-Type",
    "application/json"
  );
  return this.http.post<any>(url, req, { headers: h });
}
}
