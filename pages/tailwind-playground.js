import getLayoutSSRProps from '@core_modules/theme/layout/ssr';
import Layout from '@layout';
import createApolloClient from '@lib/apollo/apolloClient';
import { withApollo } from '@lib_apollo';
import { withTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// import cx from 'classnames';
// import Button from '@common_button';
// import Typography from '@common_typography';
// import TextField from '@common_forms/TextField';
import Select from '@common_forms/Select';
// import Checkbox from '@common_forms/CheckBox';
// import Radio from '@common_forms/Radio';
import { useState } from 'react';

function Page(props) {
    const { t } = props;
    const [selected, setSelected] = useState();

    const options = [
        { label: 'select1', value: 'select1' },
        { label: 'select2', value: 'select2' },
    ];

    const handleChange = (value) => {
        // console.log(value);
        setSelected(value);
    };

    return (
        <Layout t={t} {...props}>
            <div className="flex items-center justify-center">
                {/* <Typography
                    variant="caption-1"
                    className={cx('cursor-pointer', 'bg-accent', {
                        'cursor-auto': 1,
                    })}
                >
                    Test
                </Typography> */}
                {/* <Button loading>Button</Button> */}
                {/* <TextField /> */}
                {/* <Checkbox
                    data={[
                        { label: 'check 1', value: 'check1' },
                        { label: 'check 2', value: 'check2' },
                    ]}
                    value={['check1']}
                /> */}
                {/* <Radio
                    data={[
                        { label: 'radio1', value: 'radio1' },
                        { label: 'radio2', value: 'radio2' },
                    ]}
                    value={selected}
                    onChange={setSelected}
                /> */}
                <Select value={selected} onChange={handleChange} options={options} />
            </div>
        </Layout>
    );
}

export async function getServerSideProps(ctx) {
    const apolloClient = createApolloClient({}, ctx);
    // layout
    await getLayoutSSRProps({ apolloClient });

    // translation
    const translation = await serverSideTranslations(ctx.locale, ['common', 'home']);

    // for gql ssr cache
    const apolloState = apolloClient.cache.extract();

    return {
        props: {
            ...translation,
            apolloState,
        },
    };
}

export default withApollo({ ssr: true })(withTranslation()(Page));
