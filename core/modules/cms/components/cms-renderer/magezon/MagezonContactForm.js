import React from 'react';
import ContactForm from '@core_modules/contact/pages/default/index';
import cx from 'classnames';

const MagezonContactForm = (props) => {
    const {
        //
        xs_hide,
        sm_hide,
        md_hide,
        lg_hide,
        disable_element,
        form_width,
    } = props;

    if (!disable_element) {
        return (
            <div
                className={cx('mgz-contact-form', {
                    'max-sm:hidden': xs_hide,
                    'max-md:hidden': sm_hide,
                    'max-lg:hidden': md_hide,
                    'max-xl:hidden': lg_hide,
                })}
            >
                <ContactForm isCms />
                <style jsx>
                    {`
                        .mgz-contact-form {
                            width: ${form_width}px;
                        }
                    `}
                </style>
            </div>
        );
    }
    return null;
};

export default MagezonContactForm;
