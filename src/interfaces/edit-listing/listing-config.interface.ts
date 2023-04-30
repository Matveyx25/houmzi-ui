import { IOption } from '../shared/option.interface';

export interface IListingConfig {
  propertyAction: IOption[]
  propertyCondition: IOption[]
  propertyType: IOption[]
  rentByType: IOption[]
  generalNumbers: IOption[]
  generalBoolean: IOption[]
  laundryType: IOption[]
  constructionTypeHouse: IOption[]
  constructionTypeFlat: IOption[]
}
