export interface IItem {
  id: string;
  name: string;
  isComplete: boolean;
  isEdit: boolean;
}

export class ItemModel {
  id: string;
  name: string;
  isComplete: boolean;
  isEdit: boolean;

  constructor(obj: any) {
    this.id = obj.id;
    this.name = obj.name;
    this.isComplete = obj.isComplete;
    this.isEdit = false;
  }
}
