import { NgModule } from '@angular/core';
import { MdListModule } from '@angular/material';
import { MdButtonModule } from '@angular/material';

//import { ToolbarModule } from '../../modules/toolbar/toolbar.module';
//import { DialogModule } from '../../modules/dialog/dialog.module';

@NgModule({
    imports: [
        MdListModule,
        MdButtonModule,
        //ToolbarModule,
        //DialogModule,
        ],
    exports: [
        MdListModule,
        MdButtonModule,
        //ToolbarModule,
        //DialogModule,
        ],
    providers: [],
})
export class MyMaterialModule { }
