import React, { MouseEventHandler, useRef, useEffect } from 'react';

import { AppliedFilter } from './applied-filter';

import styles from './filters-form.module.scss';

interface BaseFilter {
  name: string;
}
interface NumberFilter extends BaseFilter {
  type: 'number';
  min: number;
  max: number;
}

interface SelectFilterProps extends BaseFilter {
  type: 'select';
  choices: Array<{
    name: string;
    value: string;
  }>;
  appliedFilters: Array<AppliedFilter> | null;
}
const sizeChoices = [
  {
    name: 'XS',
    value: 'XS',
  },
  {
    name: 'S',
    value: 'S',
  },
  {
    name: 'M',
    value: 'M',
  },
  {
    name: 'L',
    value: 'L',
  },
  {
    name: 'XL',
    value: 'XL',
  },
  {
    name: 'XXL',
    value: 'XXL',
  },
];
const colourChoices = [
  {
    name: 'Red',
    value: 'Red',
  },
  {
    name: 'Blue',
    value: 'Blue',
  },
  {
    name: 'Green',
    value: 'Green',
  },
  {
    name: 'Yellow',
    value: 'Yellow',
  },
  {
    name: 'Black',
    value: 'Black',
  },
];
const printChoices = [
  {
    name: 'Print 1',
    value: 'Print1',
  },
  {
    name: 'Print 2',
    value: 'Print2',
  },
  {
    name: 'Print 3',
    value: 'Print3',
  },
  {
    name: 'Print 4',
    value: 'Print4',
  },
  {
    name: 'Print 5',
    value: 'Print5',
  },
  {
    name: 'Print 6',
    value: 'Print6',
  },
  {
    name: 'Print 7',
    value: 'Print7',
  },
];

const NormalFilter: React.FC<SelectFilterProps> = ({
  name,
  choices,
  appliedFilters,
}) => {
  /*  useEffect(() => {
    if (appliedFilters === null || appliedFilters.length === 0) {
      checkboxes.forEach((checkbox) => {
        checkbox.checked = false;
      });
    }
    console.log(appliedFilters);
  }, [appliedFilters]); */

  //refs
  const plus = useRef<HTMLDivElement>(null);
  const minus = useRef<HTMLDivElement>(null);
  const choicesDiv = useRef<HTMLUListElement>(null);

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const button = e.currentTarget;
    //button styleing
    button.classList.toggle(styles.active);
    if (button.classList.contains(styles.active)) {
      plus.current?.classList.add(styles.hide);
      minus.current?.classList.remove(styles.hide);
    } else {
      plus.current?.classList.remove(styles.hide);
      minus.current?.classList.add(styles.hide);
    }
    //choices styling
    choicesDiv.current?.classList.toggle(styles.show);
  };

  return (
    <div className={styles.filter_div}>
      <button className={styles.filter_button} onClick={clickHandler}>
        {name}
        {<i className={`fa-solid fa-minus ${styles.hide}`} ref={minus}></i>}
        {<i className="fa-solid fa-plus" ref={plus}></i>}
      </button>
      <ul className={styles.filter_choices} ref={choicesDiv}>
        {choices.map((choice) => (
          <li className={styles.checkbox_container}>
            <input
              type="checkbox"
              id={choice.value}
              value={choice.value}
              className="checkboxes"
            />
            <label htmlFor={choice.value}>
              <span className={styles.outer_square}>
                <span className={styles.inner_square}></span>
              </span>
              {choice.name}
              <i className={`fa-solid fa-check ${styles.checked}`}></i>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

//const NumberFilter: React.FC<NumberFilter> = ({ name, min, max }) => {};
interface FiltersFormProps {
  appliedFilters: Array<AppliedFilter> | null;
  addAppliedFilter: (filter: Array<AppliedFilter>) => void;
}

const FiltersForm: React.FC<FiltersFormProps> = ({
  appliedFilters,
  addAppliedFilter,
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  let filters: Array<AppliedFilter> = [];

  //clear all checkboxes if appliedFilters is null
  useEffect(() => {
    if (appliedFilters === null || appliedFilters.length === 0) {
      formRef.current
        ?.querySelectorAll<HTMLInputElement>(`.checkboxes:checked`)
        .forEach((checkbox) => {
          checkbox.checked = false;
        });
    }
    //because I just want it to run on this condition only
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appliedFilters === null || appliedFilters.length === 0]);

  //remove checked from checkboxes if appliedFilters is null
  useEffect(() => {
    formRef.current
      ?.querySelectorAll<HTMLInputElement>(`.checkboxes:checked`)
      .forEach((checkbox) => {
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
    const formData = new FormData(form);
    const checkboxes =
      form.querySelectorAll<HTMLInputElement>(`.checkboxes:checked`);

    const values = Array.from(checkboxes).map((checkbox) => {
      formData.append(checkbox.id, checkbox.value);
      return [checkbox.name, checkbox.value];
    });
    console.log(formData);
    filters = values.map((value) => {
      return {
        name: value[0],
        value: value[1],
      };
    });
    addAppliedFilter(filters);
  };

  return (
    <form onChange={onUpdate} ref={formRef}>
      <NormalFilter
        name="Sizes"
        choices={sizeChoices}
        type="select"
        appliedFilters={appliedFilters}
      />
      <NormalFilter
        name="Colour"
        choices={colourChoices}
        type="select"
        appliedFilters={appliedFilters}
      />
      <NormalFilter
        name="Print"
        choices={printChoices}
        type="select"
        appliedFilters={appliedFilters}
      />
    </form>
  );
};

export default FiltersForm;
