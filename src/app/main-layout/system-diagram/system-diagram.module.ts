
import { NgModule } from '@angular/core';
import { SystemDiagramRoutingModule } from 'src/app/main-layout/system-diagram/system-diagram-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';
import { SystemDiagramComponent } from 'src/app/main-layout/system-diagram/system-diagram.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { RendererComponent } from './renderer/renderer.component';
import { GridLayoutService } from './services/grid-layout.service';
import { SystemDiagramDataService } from './services/system-diagram-data.service';
import { ExportAsComponent } from './toolbar/tools/exportAs/exportAs.component';
import { FilterComponent } from './toolbar/tools/filter/filter.component';
import { LegendsComponent } from './toolbar/tools/legends/legends.component';
import { ToggleComponentsComponent } from './toolbar/tools/toggle-components/toggle-components.component';
import { ToolWrapperComponent } from './toolbar/tools/tool-wrapper/tool-wrapper.component';
import { SystemErrorComponent } from 'src/app/main-layout/system-diagram/system-error/system-error.component';
import { D3Service } from './services/d3Service.service';

@NgModule({
  imports: [
    SharedModule,
    SystemDiagramRoutingModule
  ],
  declarations: [
    SystemDiagramComponent,
    ToolbarComponent,
    RendererComponent,
    SystemErrorComponent,
    ExportAsComponent,
    FilterComponent,
    LegendsComponent,
    ToggleComponentsComponent,
    ToolWrapperComponent
  ],
  providers: [
    D3Service,
    GridLayoutService,
    SystemDiagramDataService
  ]
})
export class SystemDiagramModule { }
