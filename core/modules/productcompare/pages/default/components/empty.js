import Typography from '@common_typography';
import Button from '@common_button';
import Link from 'next/link';
import classNames from 'classnames';

const EmptyView = (props) => {
    const { t } = props;
    return (
        <div className={classNames('row center-xs')}>
            <div className="xs:basis-full">
                <Typography variant="span" type="regular" align="center">
                    <span className="">{t('common:productCompare:emptyCompare')}</span>
                </Typography>
            </div>
            <div className={classNames('', 'xs:basis-full')}>
                <Link href="/">

                    <Button className="">
                        {t('common:button:continueShopping')}
                    </Button>

                </Link>
            </div>

        </div>
    );
};

export default EmptyView;
