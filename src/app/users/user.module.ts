import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { UserService } from './user.service';
import { UserComponent } from './user.component';
import { UserDetailComponent } from './user-detail.component';
import { UserNewComponent } from './user-new.component';
import { UserEditComponent } from './user-edit.component';

@NgModule({
    imports: [ CoreModule ],
    exports: [ ],
    declarations: [
        UserComponent,
        UserDetailComponent,
        UserNewComponent,
        UserEditComponent
    ],
    providers: [ UserService ]
})
export class UserModule {}