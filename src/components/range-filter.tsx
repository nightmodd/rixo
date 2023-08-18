import React, { MouseEventHandler, useRef } from 'react';
import { BaseFilter } from './filters-form';

import styles from './filters-form.module.scss';

interface NumberFilter extends BaseFilter {
  type: 'number';
  min: number;
  max: number;
  filterType: string;
}

const NumberFilter: React.FC<NumberFilter> = ({
  filterName,
  min,
  max,
  filterType,
}) => {
  //refs
  const plus = useRef<HTMLDivElement>(null);
  const minus = useRef<HTMLDivElement>(null);
  const priceInput = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLDivElement>(null);
  const priceInputMin = useRef<HTMLInputElement>(null);
  const priceInputMax = useRef<HTMLInputElement>(null);
  const rangeInputMin = useRef<HTMLInputElement>(null);
  const rangeInputMax = useRef<HTMLInputElement>(null);

  const priceGap = 2;

  const rangeInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //getting min and max values  then parsing them to numbers
    const minValue = Number(rangeInputMin.current?.value);
    const maxValue = Number(rangeInputMax.current?.value);

    //checking if the gap between min and max is less than 2
    if (maxValue - minValue < priceGap) {
      if (e.currentTarget === rangeInputMin.current) {
        rangeInputMin.current!.value = `${maxValue - 2}`;
      } else {
        rangeInputMax.current!.value = `${minValue + 2}`;
      }
    } else {
      priceInputMin.current!.value = `${minValue}`;
      priceInputMax.current!.value = `${maxValue}`;
      console.log(priceInputMin.current!.value);

      progress.current!.style.left = `${
        (minValue / Number(rangeInputMin.current?.max)) * 100
      }%`;
      progress.current!.style.right = `${
        100 - (maxValue / Number(rangeInputMax.current?.max)) * 100
      }%`;
    }
  };

  const priceInputHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    //getting min and max values  then parsing them to numbers
    const minValue = Number(priceInputMin.current?.value);
    const maxValue = Number(priceInputMax.current?.value);

    if (maxValue - minValue >= priceGap && maxValue <= 1000) {
      if (e.currentTarget === priceInputMin.current) {
        rangeInputMin.current!.value = `${minValue}`;
        progress.current!.style.left = `${
          (minValue / Number(rangeInputMin.current?.max)) * 100
        }%`;
      } else {
        rangeInputMax.current!.value = `${maxValue}`;

        progress.current!.style.right = `${
          100 - (maxValue / Number(rangeInputMax.current?.max)) * 100
        }%`;
      }
    } else {
      //check that the min value is not greater than max value and vice versa
      if (
        e.currentTarget === priceInputMin.current &&
        e.currentTarget.value > priceInputMax.current!.value
      ) {
        priceInputMin.current!.value = `${maxValue - 2}`;
        rangeInputMin.current!.value = `${maxValue - 2}`;
        progress.current!.style.left = `${
          (minValue / Number(rangeInputMin.current?.max)) * 100
        }%`;
      } else if (
        e.currentTarget === priceInputMax.current &&
        e.currentTarget.value < priceInputMin.current!.value
      ) {
        priceInputMax.current!.value = `${minValue + 2}`;
        rangeInputMax.current!.value = `${minValue + 2}`;
        progress.current!.style.right = `${
          100 - (maxValue / Number(rangeInputMax.current?.max)) * 100
        }%`;
      }
    }
  };

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
    priceInput.current?.classList.toggle(styles.show);
  };

  return (
    <div className={styles.filter_div}>
      <button className={styles.filter_button} onClick={clickHandler}>
        {filterName}
        {<i className={`fa-solid fa-minus ${styles.hide}`} ref={minus}></i>}
        {<i className="fa-solid fa-plus" ref={plus}></i>}
      </button>
      <div className={styles.warpper} ref={priceInput}>
        <div className={styles.filter_price_input}>
          <div className={styles.field}>
            <input
              type="number"
              className={styles.input_min}
              ref={priceInputMin}
              defaultValue={min}
              onChange={priceInputHandler}
              id="min"
              data-filter-type={filterType}
            />
          </div>
          <div className={styles.separator}>-</div>
          <div className={styles.field}>
            <input
              type="number"
              className={styles.input_max}
              ref={priceInputMax}
              defaultValue={max}
              onChange={priceInputHandler}
              id="max"
              data-filter-type={filterType}
            />
          </div>
        </div>
        <div className={styles.slider}>
          <div className={styles.progress} ref={progress}></div>
        </div>
        <div className={styles.range_input}>
          <input
            type="range"
            className={styles.range_min}
            min={min}
            max={max}
            defaultValue={0}
            ref={rangeInputMin}
            onChange={rangeInputHandler}
            step={1}
          />
          <input
            type="range"
            className={styles.range_max}
            min={min}
            max={max}
            defaultValue={1000}
            ref={rangeInputMax}
            onChange={rangeInputHandler}
            step={1}
          />
        </div>
      </div>
    </div>
  );
};

export default NumberFilter;
