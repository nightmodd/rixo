import React, { MouseEventHandler, useRef } from 'react';
import { BaseFilter } from './filters-form';

import styles from './filters-form.module.scss';


interface SelectFilterProps extends BaseFilter {
  type: 'select';
  choices: Array<{
    name: string;
    value: string;
    filterType: string;
  }>;
}
const NormalFilter: React.FC<SelectFilterProps> = ({ name, choices }) => {
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
              data-filter-type={choice.filterType}
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

export default NormalFilter;
