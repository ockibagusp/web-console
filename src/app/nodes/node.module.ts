import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';

import { NodeComponent } from './node.component'
import { NodeDetailComponent } from './node-detail.component';
import { NodeNewComponent } from './node-new.component';
import { NodeEditComponent } from './node-edit.component';

import { NodeService } from './node.service';

@NgModule({
    imports: [ CoreModule ],
    exports: [],
    declarations: [
        NodeComponent,
        NodeDetailComponent,
        NodeNewComponent,
        NodeEditComponent
    ],
    providers: [ NodeService ]
})
export class NodeModule {}