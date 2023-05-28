import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { routing, appRoutingProviders } from './app.routing';
import { HttpClientModule } from '@angular/common/http'
import { AngularFileUploaderModule } from 'angular-file-uploader';

import { FormsModule } from '@angular/forms'

import { AppComponent } from './app.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { ErrorComponent } from './component/error/error.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { FeaturesComponent } from './component/features/features.component';
import { PricingComponent } from './component/pricing/pricing.component';
import { ArticleComponent } from './component/article/article.component';
import { NewArticleComponent } from './component/new-article/new-article.component';
import { NewCustomerComponent } from './component/new-customer/new-customer.component';


//service
import { ArticleService } from './services/article.service';
import { CustomerService } from './services/customer.servicce';
import { EditArticleComponent } from './component/edit-article/edit-article.component';
import { EditContentComponent } from './component/edit-content/edit-content.component';
import { EditCustomerComponent } from './component/edit-customer/edit-customer.component';
import { FeatureService } from './services/feature.service';
import { ResumeService } from './services/resume.service';
import { EditFeatureComponent } from './component/edit-feature/edit-feature.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    LoginComponent,
    ErrorComponent,
    SidebarComponent,
    FeaturesComponent,
    PricingComponent,
    ArticleComponent,
    NewArticleComponent,
    NewCustomerComponent,
    EditArticleComponent,
    EditContentComponent,
    EditCustomerComponent,
    EditFeatureComponent
  ],
  imports: [
    BrowserModule,
    routing,
    AngularFileUploaderModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [appRoutingProviders, ArticleService,CustomerService,FeatureService,ResumeService],
  bootstrap: [AppComponent]
})
export class AppModule { }
