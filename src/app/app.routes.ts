import { Routes } from '@angular/router';
import { RegistrationFormComponent } from './components/registration-form/registration-form.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AuthGuardService } from './services/auth-guard.service';
import { ProductComponent } from './components/product/product.component';
import { BranchAddressComponent } from './components/branch-address/branch-address.component';
import { OurServicesComponent } from './components/Our-Services/our-services.component';
import { TransactionHistoryComponent } from './components/transaction-history/transaction-history.component';
import { AgentKycRegistrationComponent } from './components/agent-kyc-registration/agent-kyc-registration.component';
import { MoneyTransferComponent } from './components/money-transfer/money-transfer.component';
import { BreshnaPaymentsComponent } from './components/breshna-payments/breshna-payments.component';
import { CashinCashoutComponent } from './components/cashin-cashout/cashin-cashout.component';
import { LoginComponent } from './components/login/login.component';
import { BodyComponent } from './body/body/body.component';
import { HomeComponent } from './components/home/home.component';
import { CashinCashoutMainComponent } from './components/cashin-cashout-main/cashin-cashout-main.component';
import { WithdrawalComponent } from './components/withdrawal/withdrawal.component';
import { SubAgentViewComponent } from './components/SubAgent/sub-agent-view/sub-agent-view/sub-agent-view.component';
import { HowToBecomeComponent } from './components/how-to-become/how-to-become.component';
import { SubAgentRegisterationComponent } from './components/sub-agent-registeration/sub-agent-registeration.component';
import { ManageSubAgentComponent } from './components/manage-sub-agent/manage-sub-agent.component';
import { StockPurchaseComponent } from './components/stock-purchase/stock-purchase.component';
import { DcmsComponent } from './components/dcms/dcms.component';
import { PayrollTransactionComponent } from './components/payroll-transaction/payroll-transaction.component';
import { CreateDirectAgentComponent } from './components/create-direct-agent/create-direct-agent.component';
import { CustomerSignupComponent } from './components/customer-signup/customer-signup.component';
import { MerchantSignupComponent } from './components/merchant-signup/merchant-signup.component';
import { MicroMerchantSignupComponent } from './components/micro-merchant-signup/micro-merchant-signup.component';
import { PushPullMoneyComponent } from './components/wallet-management/push-pull-money/push-pull-money.component';
import { TopUpRechargeComponent } from './components/top-up-recharge/top-up-recharge.component';
import { ListUsersComponent } from './components/list-users/list-users.component';

export const routes: Routes = [
    {
        path : 'registration', component : RegistrationFormComponent
    },
    {
        path : 'product/:product', component : ProductComponent
    },
    {
        path : 'dashboard', component : DashboardComponent 
    },
    {
        path : 'branches', component : BranchAddressComponent 
    },
    {
        path : 'ourservices', component : OurServicesComponent 
    },
    {
        path : 'transactionHistory', component : TransactionHistoryComponent 
    },
    {
        path : 'MoneyTransfer', component : MoneyTransferComponent 
    },
    {
        path : 'PayBills', component : BreshnaPaymentsComponent 
    },
    {
        path : 'cashInOut', component : CashinCashoutComponent 
    },
    {
        path : 'kycFrom', component : CreateDirectAgentComponent 
    },
    {
        path : 'cashinCashoutMain', component : CashinCashoutMainComponent 
    },
    {
        path : 'withdrawal', component : WithdrawalComponent 
    },
    {
        path : 'subAgent', component : SubAgentViewComponent 
    },
    {
        path : 'howtobecome', component : HowToBecomeComponent 
    },
    {
        path : 'subAgentKYC', component : SubAgentRegisterationComponent 
    },
    {
        path : 'manageSubAgent', component : ManageSubAgentComponent 
    },
    {
        path : 'stockPurchase', component : StockPurchaseComponent 
    },
    {
        path : 'customerKYC', component : CustomerSignupComponent 
    },
    {
        path : 'merchantKyc', component : MerchantSignupComponent 
    },
    {
        path : 'micromerchantKyc', component : MicroMerchantSignupComponent 
    },
    {
        path : 'dcms', component : DcmsComponent 
    },
    {
        path : 'payroll', component : PayrollTransactionComponent 
    },
    {
        path : 'listUsers', component : ListUsersComponent 
    },
    {
        path : 'home', component : HomeComponent 
    },
  { path: 'pushpull', component: PushPullMoneyComponent },
  { path: 'topUp', component: TopUpRechargeComponent },

    { path: '**', redirectTo: 'b2a/home', pathMatch: 'full' },

];
