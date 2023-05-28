// importar los modulos del router de angular
import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./component/home/home.component";
import { LoginComponent } from "./component/login/login.component";
import { ErrorComponent } from "./component/error/error.component";
import { FeaturesComponent } from "./component/features/features.component";
import { PricingComponent } from "./component/pricing/pricing.component";
import { ArticleComponent } from "./component/article/article.component";
import { NewArticleComponent } from "./component/new-article/new-article.component";
import { NewCustomerComponent } from "./component/new-customer/new-customer.component";
import { EditArticleComponent } from "./component/edit-article/edit-article.component";
import { EditContentComponent } from "./component/edit-content/edit-content.component";
import { EditCustomerComponent } from "./component/edit-customer/edit-customer.component";
import { EditFeatureComponent } from "./component/edit-feature/edit-feature.component";


const appRoutes:Routes=[
    {path:'', component:LoginComponent},
    {path:'home/:user', component:HomeComponent},
    {path:'login', component:LoginComponent},
    {path:'customer', component:NewCustomerComponent},
    {path:'features/:user', component:FeaturesComponent},
    {path:'features/edit-feature/:user/:idFeature', component:EditFeatureComponent},
    {path:'edit-article/:user', component:EditArticleComponent},
    {path:'pricing/:user', component:PricingComponent},
    {path:'new-article/:user', component:NewArticleComponent},
    {path:'pricing/article/:id/:user', component:ArticleComponent},
    {path:'edit-article/content/:id/:user', component:EditContentComponent},
    {path:'home/edit-customer/:id/:user', component:EditCustomerComponent},
    // {path:'home', component:HomeComponent},
    {path:'**', component:ErrorComponent},

];

export const appRoutingProviders: any[]=[];
export const routing:ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);