import { useState, MouseEventHandler } from 'react';
import { Details } from '../types/listing';

import styles from './product-specific-details.module.scss';
import clsx from 'clsx';

const prodcutDetailsAndFit = [
  'Vintage-inspired floral print',
  'Main fabric is crepe',
  'Deep V-neckline, tie and cut-out at centre front',
  'Natural waistline with lace border through back',
  'Blousy sleeves',
  'Partially shirred cuffs with lace trim',
  'Lined body, does not conceal a bra in front',
  'Skirt is unlined for the best drape, improving how it falls',
  'High-low hem',
];

const fabricAndCore = [
  '100% viscose',
  'Lining: 100% polyester',
  'Cold hand wash separately',
];

interface SpecificSectionProps {
  clickHandler: MouseEventHandler<HTMLButtonElement>;
  activeSection: string;
  sectionName: string;
  buttonTitle: string;
  details: Details;
  arrayOfDetails: string[];
}

const SpecificSection = ({
  clickHandler,
  activeSection,
  sectionName,
  buttonTitle,
  details,
  arrayOfDetails,
}: SpecificSectionProps) => {
  return (
    <div className={styles.warpper}>
      <button
        className={clsx({
          [styles.details_button]: true,
          [styles.active]: activeSection === sectionName,
        })}
        onClick={clickHandler}
        data-description={sectionName}
      >
        <span>{buttonTitle}</span>
        {
          <i
            className={clsx({
              'fa-solid fa-minus': true,
              [styles.hide_button]: activeSection !== sectionName,
            })}
          ></i>
        }
        {
          <i
            className={clsx({
              'fa-solid fa-plus': true,
              [styles.hide_button]: activeSection === sectionName,
            })}
          ></i>
        }
      </button>
      <div
        className={clsx({
          [styles.hidden_description]: true,
          [styles.show]: activeSection === sectionName,
        })}
        data-description={sectionName}
      >
        <p>{sectionName === 'fit' ? details.fit : details.fabric}</p>
        <ul className={styles.description_list}>
          {arrayOfDetails.map((detail) => (
            <li key={detail}>{detail}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

interface productSpecificDetailsProps {
  details: Details;
}

const ProductSpecificDetails = ({ details }: productSpecificDetailsProps) => {
  const [activeSection, setActiveSection] = useState('fit');

  const clickHandler: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const button = e.currentTarget;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    setActiveSection(button.dataset.description!);
    if (button.dataset.description === activeSection) {
      setActiveSection('');
    }
  };

  return (
    <div className={styles.specific_details_container}>
      <div className={styles.details_And_fit}>
        <SpecificSection
          clickHandler={clickHandler}
          activeSection={activeSection}
          sectionName="fit"
          buttonTitle="Product Details & Fit"
          details={details}
          arrayOfDetails={prodcutDetailsAndFit}
        />
      </div>
      <div className={styles.fabric_and_core}>
        <SpecificSection
          clickHandler={clickHandler}
          activeSection={activeSection}
          sectionName="fabric"
          buttonTitle="Fabric & Core"
          details={details}
          arrayOfDetails={fabricAndCore}
        />
      </div>
    </div>
  );
};

export default ProductSpecificDetails;
