import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagetitleComponent } from './pagetitle/pagetitle.component';
import { PreloaderComponent } from './preloader/preloader.component';
import { EditSaveBtnComponent } from './edit-save-btn/edit-save-btn.component';
import { EditSaveDelBtnComponent } from './edit-save-del-btn/edit-save-del-btn.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TagsComponent } from './tags/tags.component';



@NgModule({
  declarations: [PagetitleComponent, PreloaderComponent,
    PreloaderComponent,
    EditSaveBtnComponent,
    EditSaveDelBtnComponent, TagsComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [PagetitleComponent, PreloaderComponent, EditSaveDelBtnComponent,
    EditSaveBtnComponent]
})
export class UiModule { }
