import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule, LeaveRouteGuard } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalculatorContainerComponent, CalculatorEffective, CalculatorEvent, CalculatorRefComponent } from './calculator-container/calculator-container.component';
import { TodoListComponent } from './todo-list/todo-list.component';

import locDe from '@angular/common/locales/de';
import { registerLocaleData } from '@angular/common';
import { PluralPipe } from './pipes/plural.pipe';
import { SortPipe } from './pipes/sort.pipe';
import { TodoService } from './services/todo.service';
import { DetailModule } from './detail/detail.module';
import { TodoHttpService } from './services/todo-http.service';
registerLocaleData(locDe);

@NgModule({
  declarations: [
    AppComponent,
    CalculatorContainerComponent,
    CalculatorEffective,
    CalculatorEvent,
    CalculatorRefComponent,
    TodoListComponent,
    PluralPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    DetailModule,
    ReactiveFormsModule
  ],
  providers: [
    TodoService,
    TodoHttpService,
    LeaveRouteGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
