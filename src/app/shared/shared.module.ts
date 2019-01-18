
// SharedModule
// SharedModule is a conventional name for an NgModule with the components, directives, and pipes that you use everywhere in your app. This module should consist entirely of declarations, most of them exported.

// The SharedModule may re-export other widget modules, such as CommonModule, FormsModule, and NgModules with the UI controls that you use most widely.

// The SharedModule should not have providers for reasons explained previously. Nor should any of its imported or re-exported modules have providers.

// Import the SharedModule in your feature modules, both those loaded when the app starts and those you lazy load later.
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { NotfoundComponent } from 'src/app/shared/notfound/notfound.component';
import { UploadDialogComponent } from './upload-dialog/upload-dialog.component';
import {ProgressBarModule} from 'primeng/progressbar';
import {AccordionModule} from 'primeng/accordion';
import {DialogModule} from 'primeng/dialog';
import {CheckboxModule} from 'primeng/checkbox';
import { SliderModule } from 'primeng/slider';
import { TooltipModule } from 'primeng/tooltip';
import {TableModule} from 'primeng/table';
import { EllipsisPipe } from './pipes/ellipsis.pipe';
import { TableComponent } from './table/table.component';

// module type: Shared Module
// exports: declarations, no providers recommended
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    DialogModule,
    ProgressBarModule,
    AccordionModule,
    CheckboxModule,
    SliderModule,
    TooltipModule,
    TableModule
  ],
  declarations: [
    NotfoundComponent,
    UploadDialogComponent,
    EllipsisPipe,
    TableComponent
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NotfoundComponent,
    UploadDialogComponent,
    DialogModule,
    ProgressBarModule,
    EllipsisPipe,
    AccordionModule,
    CheckboxModule,
    SliderModule,
    TooltipModule,
    TableModule
  ]
})
export class SharedModule { }
// module exports means those classes (i.e. components and module exports)
// are availble to modules outside it.
