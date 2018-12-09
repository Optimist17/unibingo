import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';

import { AppComponent } from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatButtonModule, 
  MatCheckboxModule,
  MatDialogModule,
  MatRippleModule,
  MatToolbarModule,
  MatIconModule,
  MatSidenavModule,
  MatDividerModule,
  MatListModule
} from '@angular/material';
import { BingoDialogComponent } from './dialogs/bingo-dialog/bingo-dialog.component';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';

@NgModule({
  entryComponents: [
    BingoDialogComponent
  ],
  declarations: [
    AppComponent,
    BingoDialogComponent,
    ToolbarComponent,
    SidenavComponent
  ],
  imports: [
    FlexLayoutModule,
    BrowserModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    MatRippleModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
