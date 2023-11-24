/* eslint-disable no-nested-ternary */
// import TextField from '@common_textfield';
import TextField from '@common_forms/TextField';
import Typography from '@common_typography';
import { passwordStrength, storeConfigNameCookie } from '@config';
import cx from 'classnames';
import Cookies from 'js-cookie';
import { useState } from 'react';

const Password = (props) => {
    const {
        label = 'Password',
        value = '',
        onChange = () => {},
        showPasswordMeter = false,
        showVisible = false,
        error = false,
        errorMessage = '',
        ...restProps
    } = props;
    const [show, setShow] = useState(false);
    const [errorPaswd, setErrorPasswd] = useState({
        status: 'No Password',
    });

    let { numberOfRequiredClass, minValue } = passwordStrength;

    const config = Cookies.getJSON(storeConfigNameCookie);

    if (config && config.customer_password_minimum_password_length) {
        minValue = config.customer_password_minimum_password_length;
    }

    if (config && config.customer_password_required_character_classes_number) {
        numberOfRequiredClass = config.customer_password_required_character_classes_number;
    }

    const handleChange = async (event) => {
        onChange(event);
        if (showPasswordMeter) {
            // lazyload zxcvbn function
            const checkPassword = (await import('@helper_passwordstrength')).default;
            const strength = checkPassword({ value: event.target.value, minValue, numberOfRequiredClass });
            setErrorPasswd(strength);
        }
    };

    return (
        <div className="flex flex-col w-[320px]" {...restProps}>
            {label ? (
                <Typography variant="bd-2" className="uppercase">
                    {label.replace(/_/g, ' ')}
                </Typography>
            ) : null}
            <TextField
                className="password-field mt-2"
                type={show ? 'text' : 'password'}
                iconProps={{
                    rightIcon: showVisible && show ? 'visibility' : showVisible ? 'visibility_off' : '',
                    rightIconClasses: showVisible ? 'cursor-pointer' : '',
                    onClick: () => setShow(!show),
                }}
                hintProps={{
                    displayHintText: error,
                    hintType: error ? 'error' : '',
                    hintText: errorMessage,
                }}
                value={value}
                onChange={handleChange}
            />
            {showPasswordMeter && (
                <>
                    <div>
                        <div
                            className={cx('px-4 py-[10px] flex items-center', {
                                '!bg-neutral-100': errorPaswd.status.toLocaleLowerCase() === 'no password',
                                'bg-accent-red_orange-50': errorPaswd.status.toLocaleLowerCase() === 'weak',
                                'bg-accent-saffron_mango': errorPaswd.status.toLocaleLowerCase() === 'medium',
                                'bg-accent-eucalyptus-100': errorPaswd.status.toLocaleLowerCase().indexOf('strong') !== -1,
                            })}
                        >
                            <Typography className="">{`Password Strength: ${errorPaswd.status}`}</Typography>
                        </div>
                    </div>
                    {errorPaswd?.message ? (
                        <Typography className="text-accent-red_orange" color="red">
                            {errorPaswd.message}
                        </Typography>
                    ) : null}
                </>
            )}
        </div>
    );
};

export default Password;
