/**
 * Angular
 */
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDatepickerModule, MatNativeDateModule } from '@angular/material';

/**
 * Custom
 */
import { ArchitectureModule } from '@itmp/arch';
import { ServicesModule } from './services/services.module';
import { OptLockService } from './services/opt-lock.service';

// PrimeNG
import { MessagesModule } from 'primeng/primeng';
import { DataTableModule } from 'primeng/primeng';
import { SharedModule } from 'primeng/primeng';
import { DropdownModule } from 'primeng/primeng';

// NGX
import { AccordionModule } from 'ngx-bootstrap/accordion';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { BsModalService } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { DatepickerModule } from 'ngx-bootstrap/datepicker';
import { AlertModule } from 'ngx-bootstrap/alert';
import { SelectModule } from 'ng2-select';

/**
 * UI Components
 */
import { LogoComponent } from './common/logo/logo.component';
import { HeaderComponent } from './common/header/header.component';
import { FooterComponent } from './common/footer/footer.component';
import { IconComponent } from './common/icon/icon.component';
import { DashPanelComponent } from './common/dash-panel/dash-panel.component';
import { SideNavComponent } from './common/side-nav/side-nav.component';
import { SearchComponent } from './common/search/search.component';
import { HeadingComponent } from './common/heading/heading.component';
import { FormActionsComponent } from './common/form-actions/form-actions.component';
import { SubheadingComponent } from './common/subheading/subheading.component';
import { UserInfoComponent } from './common/user-info/user-info.component';
import { DisableFormControlDirective } from './directives/disable-form-control.directive';
import { ClickOutsideDirective } from './directives/click-outside.directive';
import { IconNavComponent } from './common/icon-nav/icon-nav.component';
import { HelpComponent } from './common/help/help.component';
import { PanelComponent } from './common/panel/panel.component';
import { NotificationComponent } from './common/notification/notification.component';
import { ContentComponent } from './common/content/content.component';
import { ModalComponent } from './common/modal/modal.component';
import { MenuComponent } from './common/menu/menu.component';
import { TableActionsComponent } from './common/table-actions/table-actions.component';
import { ButtonComponent } from './common/button/button.component';

/**
 * Common Directives
 */
import { CurrencyFormatterDirective } from './directives/currency-formatter/currency-formatter.directive';
/**
 * Common Components
 */
import { NinoComponent } from './common/nino/nino.component';
import { ChildDOBDateComponent } from './common/child-dob-date/child-dob-date.component';
import { ChildForenameComponent } from './common/child-forename/child-forename.component';
import { ForenameComponent } from './common/forename/forename.component';
import { SurnameComponent } from './common/surname/surname.component';
import { OtherForenamesComponent } from './common/otherforenames/otherforenames.component';
import { MarriageCpStatusComponent } from './common/marriage-cp-status/marriage-cp-status.component';
import { GenderComponent } from './common/gender/gender.component';
import { TitleComponent } from './common/title/title.component';
import { SpecialistBusinessAreaComponent } from './common/specialist-business-area/specialist-business-area.component';
import { DateLeavingUKComponent } from './common/date-leaving-uk/date-leaving-uk.component';
import { ChildSurnameComponent } from './common/child-surname/child-surname.component';
import { EFEVoucherCodeComponent } from './common/efe-voucher-code/efe-voucher-code.component';
import { ResponseTopUpNumberComponent } from './common/response-top-up-number/response-top-up-number.component';
import { ResponseTopUpRateComponent } from './common/response-top-up-rate/response-top-up-rate.component';
import { AddressComponent } from './common/address/address.component';
import { AddressLineComponent } from './common/address-line/address-line.component';
import { AlternateSequenceNoComponent } from './common/alternate-sequence-no/alternate-sequence-no.component';
import { CountryOfResidenceComponent } from './common/country-of-residence/country-of-residence.component';
import { CRNComponent } from './common/crn/crn.component';
import { EligibilityCodeComponent } from './common/eligibility-code/eligibility-code.component';
import { EligibilityResponseComponent } from './common/eligibility-response/eligibility-response.component';
import { NationalityComponent } from './common/nationality/nationality.component';
import { NSIChildIDComponent } from './common/nsi-child-id/nsi-child-id.component';
import { RelationshiptoChildComponent } from './common/relationship-to-child/relationship-to-child.component';
import { ResponseNarativeComponent } from './common/response-narative/response-narative.component';
import { CheckboxComponent } from './common/checkbox/checkbox.component';
import { CountryComponent } from './common/country/country.component';
import { MergeStatusComponent } from './common/merge-status/merge-status.component';
import { PostcodeComponent } from './common/postcode/postcode.component';
import { AddressTypeComponent } from './common/address-type/address-type.component';
import { MiddlenameComponent } from './common/middlename/middlename.component';
import { AppDateGroupComponent } from './common/app-date-group/app-date-group.component';
import { TaxYearComponent } from './common/tax-year/tax-year.component';
import { DateComponent } from './common/date/date.component';
import { StartEndDateComponent } from './common/start-end-date/start-end-date.component';
import { ApplicationMessagingService } from './services/application-messaging.service';
import { DateOfBirthComponent } from './common/date-of-birth/date-of-birth.component';
import { FullNameComponent } from './common/full-name/full-name.component';
import { CityComponent } from './common/city/city.component';
import { EmailComponent } from './common/email/email.component';
import { PhoneNumberComponent } from './common/phone-number/phone-number.component';
import { AppPostcodeComponent } from './common/app-postcode/app-postcode.component';
import { MoneyComponent } from './common/money/money.component';
import { CommonMessageDetailsComponent } from './common/common-message-details/common-message-details.component';
import { LinkComponent } from './common/link/link.component';
import { CancelSaveActionComponent } from './common/cancel-save-action/cancel-save-action.component';
import { TrnComponent } from './common/trn/trn.component';
import { SlcrefComponent } from './common/slcref/slcref.component';
import { UtrComponent } from './common/utr/utr.component';
import { SkipToContentComponent } from './common/skip-to-content/skip-to-content.component';
import { ScrollTopComponent } from './common/scroll-top/scroll-top.component';
import { TableEditButtonComponent } from './common/table-edit-button/table-edit-button.component';
import { InsertButtonComponent } from './common/insert-button/insert-button.component';
import { ErrorMsgComponent } from './common/error-msg/error-msg.component';

@NgModule({
  imports: [
    /**
     * Angular
     */
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatNativeDateModule,

    /**
     * Custom
     */
    ServicesModule,

    /**
     * PrimeNG
     */
    MessagesModule,
    DataTableModule,
    SharedModule,
    DropdownModule,

    /**
     * NGX / NG2
     */
    AccordionModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    TypeaheadModule.forRoot(),
    BsDropdownModule.forRoot(),
    AlertModule.forRoot(),
    DatepickerModule.forRoot(),
    SelectModule
  ],
  providers: [ApplicationMessagingService, BsModalService, OptLockService],
  declarations: [
    /**
     * UI
     */
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    IconComponent,
    DashPanelComponent,
    SideNavComponent,
    SearchComponent,
    HeadingComponent,
    FormActionsComponent,
    TableActionsComponent,
    SubheadingComponent,
    UserInfoComponent,
    DisableFormControlDirective,
    ClickOutsideDirective,
    IconNavComponent,
    HelpComponent,
    PanelComponent,
    NotificationComponent,
    ContentComponent,
    ModalComponent,
    MenuComponent,
    ButtonComponent,
    SkipToContentComponent,

    /**
     * Common Directives
     */
    CurrencyFormatterDirective,
    /**
     * Common Components
     */
    ForenameComponent,
    SurnameComponent,
    OtherForenamesComponent,
    MarriageCpStatusComponent,
    GenderComponent,
    TitleComponent,
    SpecialistBusinessAreaComponent,
    DateLeavingUKComponent,
    ChildDOBDateComponent,
    ChildForenameComponent,
    ChildSurnameComponent,
    EFEVoucherCodeComponent,
    ResponseTopUpNumberComponent,
    ResponseTopUpRateComponent,
    AddressComponent,
    AddressLineComponent,
    AlternateSequenceNoComponent,
    CountryOfResidenceComponent,
    CRNComponent,
    EligibilityCodeComponent,
    EligibilityResponseComponent,
    NationalityComponent,
    NSIChildIDComponent,
    RelationshiptoChildComponent,
    ResponseNarativeComponent,
    CountryComponent,
    MergeStatusComponent,
    CheckboxComponent,
    PostcodeComponent,
    NinoComponent,
    AddressTypeComponent,
    MiddlenameComponent,
    AppDateGroupComponent,
    TaxYearComponent,
    DateComponent,
    StartEndDateComponent,
    DateOfBirthComponent,
    FullNameComponent,
    CityComponent,
    EmailComponent,
    PhoneNumberComponent,
    AppPostcodeComponent,
    MoneyComponent,
    CommonMessageDetailsComponent,
    LinkComponent,
    CancelSaveActionComponent,
    TrnComponent,
    SlcrefComponent,
    UtrComponent,
    ScrollTopComponent,
    TableEditButtonComponent,
    InsertButtonComponent,
    ErrorMsgComponent
  ],
  exports: [
    /**
     * PrimeNG
     */
    MessagesModule,
    DataTableModule,
    SharedModule,
    DropdownModule,

    /**
     * NGX / NG2
     */
    AccordionModule,
    TabsModule,
    TooltipModule,
    ModalModule,
    PaginationModule,
    TypeaheadModule,
    BsDropdownModule,
    AlertModule,
    DatepickerModule,
    SelectModule,

    /**
     * Common Directives
     */
    CurrencyFormatterDirective,
    /**
     * UI Components
     */
    LogoComponent,
    HeaderComponent,
    FooterComponent,
    IconComponent,
    DashPanelComponent,
    SideNavComponent,
    SearchComponent,
    HeadingComponent,
    FormActionsComponent,
    TableActionsComponent,
    SubheadingComponent,
    UserInfoComponent,
    DisableFormControlDirective,
    ClickOutsideDirective,
    IconNavComponent,
    HelpComponent,
    PanelComponent,
    NotificationComponent,
    ContentComponent,
    ModalComponent,
    MenuComponent,
    ButtonComponent,
    SkipToContentComponent,
    ScrollTopComponent,

    /**
     * Common Components
     */
    ChildDOBDateComponent,
    ForenameComponent,
    SurnameComponent,
    OtherForenamesComponent,
    MarriageCpStatusComponent,
    GenderComponent,
    TitleComponent,
    SpecialistBusinessAreaComponent,
    DateLeavingUKComponent,
    ChildSurnameComponent,
    EFEVoucherCodeComponent,
    ResponseTopUpNumberComponent,
    ResponseTopUpRateComponent,
    AddressComponent,
    AddressLineComponent,
    AlternateSequenceNoComponent,
    CountryOfResidenceComponent,
    CRNComponent,
    EligibilityCodeComponent,
    EligibilityResponseComponent,
    NationalityComponent,
    NSIChildIDComponent,
    RelationshiptoChildComponent,
    ResponseNarativeComponent,
    CountryComponent,
    MergeStatusComponent,
    CheckboxComponent,
    PostcodeComponent,
    NinoComponent,
    AddressTypeComponent,
    MiddlenameComponent,
    AppDateGroupComponent,
    TaxYearComponent,
    DateComponent,
    StartEndDateComponent,
    DateOfBirthComponent,
    FullNameComponent,
    CityComponent,
    EmailComponent,
    PhoneNumberComponent,
    AppPostcodeComponent,
    MoneyComponent,
    CommonMessageDetailsComponent,
    LinkComponent,
    CancelSaveActionComponent,
    TableEditButtonComponent,
    InsertButtonComponent,
    ErrorMsgComponent
  ]
})
export class AppModule {}
