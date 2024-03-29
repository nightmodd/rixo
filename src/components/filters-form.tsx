import React, { useEffect } from 'react';
import NumberFilter from './range-filter';
import NormalFilter from './normal-filter';

import { AppliedFilter } from './applied-filter';

export interface BaseFilter {
  filterName: string;
}

const sizeChoices = [
  {
    name: '8',
    value: '8',
    filterType: 'size',
  },
  {
    name: '10',
    value: '10',
    filterType: 'size',
  },
  {
    name: '12',
    value: '12',
    filterType: 'size',
  },
  {
    name: '14',
    value: '14',
    filterType: 'size',
  },
  {
    name: '16',
    value: '16',
    filterType: 'size',
  },
  {
    name: '18',
    value: '18',
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
  //tlesa mo2kta
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
    const minvalue = document.querySelectorAll<HTMLInputElement>(
      `input[type="number"]#min`
    );
    const maxvalue = document.querySelectorAll<HTMLInputElement>(
      `input[type="number"]#max`
    );

    if (appliedFilters) {
      appliedFilters.forEach((filter) => {
        if (filter.filterType === 'price') {
          minvalue.forEach((min) => {
            if (min.getAttribute('data-filter-type') === 'price') {
              min.value = filter.value[0];
            }
          });
          maxvalue.forEach((max) => {
            if (max.getAttribute('data-filter-type') === 'price') {
              max.value = filter.value[1];
            }
          });
        }
      });
    }
  }, [appliedFilters]);

  const onUpdate = (e: React.ChangeEvent<HTMLFormElement>) => {
    const form = e.currentTarget;
    const checkboxes =
      form.querySelectorAll<HTMLInputElement>(`.checkboxes:checked`);

    const minvalue = form.querySelector<HTMLInputElement>(
      `input[type="number"]#min`
    )?.value;
    const maxvalue = form.querySelector<HTMLInputElement>(
      `input[type="number"]#max`
    )?.value;
    const filterType = form
      .querySelector<HTMLInputElement>(`input[type="number"]#min`)
      ?.getAttribute('data-filter-type');

    const filters: Array<AppliedFilter> = Array.from(checkboxes).map(
      (checkbox) => {
        return {
          value: checkbox.value,
          filterType: checkbox.getAttribute('data-filter-type') as string,
        };
      }
    );
    const pricefilter = {
      value: [minvalue as string, maxvalue as string],
      filterType: filterType as string,
    };
    const allFilters = [...filters, pricefilter];

    addAppliedFilter(allFilters);
  };

  return (
    <form onChange={onUpdate}>
      <NormalFilter filterName="Sizes" choices={sizeChoices} type="select" />
      <NormalFilter filterName="Colour" choices={colourChoices} type="select" />
      <NormalFilter filterName="Print" choices={printChoices} type="select" />
      <NumberFilter
        filterName="Price"
        min={0}
        max={1000}
        type="number"
        filterType={'price'}
      />
    </form>
  );
};

export default FiltersForm;
