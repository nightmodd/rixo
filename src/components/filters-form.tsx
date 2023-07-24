import React, { useEffect } from 'react';
import NumberFilter from './range-filter';
import NormalFilter from './normal-filter';

import { AppliedFilter } from './applied-filter';

export interface BaseFilter {
  name: string;
}

const sizeChoices = [
  {
    name: 'XS',
    value: 'XS',
    filterType: 'size',
  },
  {
    name: 'S',
    value: 'S',
    filterType: 'size',
  },
  {
    name: 'M',
    value: 'M',
    filterType: 'size',
  },
  {
    name: 'L',
    value: 'L',
    filterType: 'size',
  },
  {
    name: 'XL',
    value: 'XL',
    filterType: 'size',
  },
  {
    name: 'XXL',
    value: 'XXL',
    filterType: 'size',
  },
];
const colourChoices = [
  {
    name: 'Red',
    value: 'Red',
    filterType: 'colour',
  },
  {
    name: 'Blue',
    value: 'Blue',
    filterType: 'colour',
  },
  {
    name: 'Green',
    value: 'Green',
    filterType: 'colour',
  },
  {
    name: 'Yellow',
    value: 'Yellow',
    filterType: 'colour',
  },
  {
    name: 'Black',
    value: 'Black',
    filterType: 'colour',
  },
];
const printChoices = [
  {
    name: 'Print 1',
    value: 'Print1',
    filterType: 'print',
  },
  {
    name: 'Print 2',
    value: 'Print2',
    filterType: 'print',
  },
  {
    name: 'Print 3',
    value: 'Print3',
    filterType: 'print',
  },
  {
    name: 'Print 4',
    value: 'Print4',
    filterType: 'print',
  },
  {
    name: 'Print 5',
    value: 'Print5',
    filterType: 'print',
  },
  {
    name: 'Print 6',
    value: 'Print6',
    filterType: 'print',
  },
  {
    name: 'Print 7',
    value: 'Print7',
    filterType: 'print',
  },
];

interface FiltersFormProps {
  appliedFilters: Array<AppliedFilter> | null;
  addAppliedFilter: (filter: Array<AppliedFilter>) => void;
}

const FiltersForm: React.FC<FiltersFormProps> = ({
  appliedFilters,
  addAppliedFilter,
}) => {
  //remove checked from checkboxes if appliedFilters is null
  useEffect(() => {
    const checkboxs =
      document.querySelectorAll<HTMLInputElement>(`.checkboxes`);
    checkboxs.forEach((checkbox) => {
      if (
        appliedFilters?.map((filter) => filter.value).includes(checkbox.value)
      ) {
        checkbox.checked = true;
      } else {
        checkbox.checked = false;
      }
    });
  }, [appliedFilters]);

  const onUpdate = (e: React.ChangeEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const checkboxes =
      form.querySelectorAll<HTMLInputElement>(`.checkboxes:checked`);

    const filters: Array<AppliedFilter> = Array.from(checkboxes).map(
      (checkbox) => {
        return {
          value: checkbox.value,
          filterType: checkbox.getAttribute('data-filter-type') as string,
        };
      }
    );

    addAppliedFilter(filters);
  };

  return (
    <form onChange={onUpdate}>
      <NormalFilter name="Sizes" choices={sizeChoices} type="select" />
      <NormalFilter name="Colour" choices={colourChoices} type="select" />
      <NormalFilter name="Print" choices={printChoices} type="select" />
      <NumberFilter
        name="Price"
        min={0}
        max={1000}
        type="number"
        filterType={'price'}
      />
    </form>
  );
};

export default FiltersForm;
