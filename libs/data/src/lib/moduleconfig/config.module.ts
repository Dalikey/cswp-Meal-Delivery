import { ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

export class CustomConfig {
  apiEndpoint!: string;
}

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [],
  exports: [],
})
export class ConfigModule {
  static forRoot(config: CustomConfig): ModuleWithProviders<ConfigModule> {
    console.log('ConfigModule.forRoot ' + config.apiEndpoint);
    return {
      ngModule: ConfigModule,
      providers: [{ provide: CustomConfig, useValue: config }],
    };
  }
}
