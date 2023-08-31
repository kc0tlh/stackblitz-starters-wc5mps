import { ComponentFactoryResolver, Injectable } from '@angular/core';

@Injectable()
export class DynamicRenderer {

  rootViewContainer: any;

  constructor(private factoryResolver: ComponentFactoryResolver) { }

  /**
   * Create root view container by reference
   * @param viewContainerRef
   */
  public setRootViewContainerRef(viewContainerRef: any) {
    this.rootViewContainer = viewContainerRef;
  }

  /**
   * Create dynamic component with adding input and output data
   * @param dynamicComponent
   * @param inputData
   * @param outputData
   */
  public addDynamicComponent(dynamicComponent: any, inputData?: any, outputData?: any) {
    const factory = this.factoryResolver.resolveComponentFactory(dynamicComponent);
    const component = factory.create(this.rootViewContainer.parentInjector);
    const  instance:any  = component.instance;
    if (inputData) {
      Object.keys(inputData).forEach((key) => {
        instance[key] = inputData[key];
      });
    }
    // to handle output events of inner component we register them to instance of outer component
    if (outputData !== undefined && outputData != null) {
      Object.keys(outputData).forEach((output) => {
          if (outputData.hasOwnProperty(output)) {
            instance[output].subscribe(outputData[output]);
          }
        }
      );
    }
    this.rootViewContainer.insert(component.hostView);
  }

}
