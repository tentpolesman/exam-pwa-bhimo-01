import Layout from '@layout';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Alert from '@common/Alert';
import Typography from '@common/Typography';
import { getCheckoutData, removeCheckoutData } from '@root/core/helpers/cookies';
import { removeCartId } from '@root/core/helpers/cartId';

const Seller = (props) => {
    const { t, pageConfig } = props;
    const router = useRouter();

    const [seconds, setSeconds] = useState(7);

    const deleteCheckoutData = () => {
        const cdt = getCheckoutData();
        if (cdt) removeCheckoutData();
        removeCartId();
    };

    useEffect(
        () =>
            function cleanup() {
                if (typeof window !== 'undefined') {
                    deleteCheckoutData();
                }
            },
        [],
    );

    useEffect(() => {
        deleteCheckoutData();
        const countdownInterval = setInterval(() => {
            // Decrease the seconds every second
            setSeconds((prevSeconds) => prevSeconds - 1);
        }, 1000);

        // Clear the interval when the component is unmounted
        return () => clearInterval(countdownInterval);
    }, []);

    useEffect(() => {
        // Check if the countdown has reached 0
        if (seconds === 0) {
            // Perform any action when the countdown reaches 0
            router.replace('/');
        }
    }, [seconds]);

    const config = {
        title: t('scv2:success:title'),
        header: 'relative', // available values: "absolute", "relative", false (default)
        headerTitle: t('scv2:success:title'),
        bottomNav: true,
        customFilter: false,
        search: '',
    };

    return (
        <Layout pageConfig={pageConfig || config} {...props}>
            <div className="flex flex-col gap-5">
                <Alert severity="success">{t('scv2:success:message')}</Alert>
                <Typography className="italic text-center !text-neutral-300">
                    {t('scv2:success:waitingRedirect', { s: seconds })}
                </Typography>
            </div>
        </Layout>
    );
};

export default Seller;
