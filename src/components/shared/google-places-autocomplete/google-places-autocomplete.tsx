import React from 'react';
import c from 'classnames';
import s from './google-places-autocomplete.module.scss';
import PlacesAutocomplete from 'react-places-autocomplete';
import { Input } from '../input/input';

interface IProps {
  value: string
  className?: string
  dropDownClassName?: string
  placeholder?: string
  isHideError?: boolean
  types?: string[]
  homePage?: boolean

  onChange(value: string): void

  onSelect?(value: string): void
}

export const GooglePlacesAutocomplete: React.FC<IProps> = (
  {
    value, className, dropDownClassName, placeholder,
    isHideError, types, homePage, onChange, onSelect,
  },
) => (
  <PlacesAutocomplete value={value} searchOptions={{ types }} onChange={onChange} onSelect={onSelect}>
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <div className={c(s.select, className, homePage && s.select_withoutBorder)}>
        <Input {...getInputProps({ placeholder, isHideError, prevIcon: 'icon-search' })}/>
        {
          loading || suggestions.length
            ? <div className={c(s.select__dropdown, dropDownClassName)}>
              {
                loading && <div className={s.select__option}>
                  <span>Loading...</span>
                </div>
              }
              {
                !loading && suggestions.map(suggestion => (
                  <div
                    {...getSuggestionItemProps(suggestion)}
                    key={suggestion.index}
                    className={c(s.select__option, value === suggestion.description && s.active)}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                ))
              }
            </div>
            : null
        }
      </div>
    )}
  </PlacesAutocomplete>
);
