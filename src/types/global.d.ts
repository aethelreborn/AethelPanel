declare global {
    namespace NodeJS {
      interface Global {
        uiComponentStore: any;
        name: string;
        aethelpanelVersion: string;
        adminMenuItems: any[];
        regularMenuItems: any[];
      }
    }
  }
  
export {};