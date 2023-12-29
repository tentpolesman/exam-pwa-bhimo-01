import Button from '@common_button';
import classNames from 'classnames';
import Alert from '@common/Alert';

const EmptyView = (props) => {
    const { t } = props;
    return (
        <div className={classNames('flex flex-col items-center justify-center')}>
            <div className="xs:basis-full">
                <Alert severity="warning">{t('common:productCompare:emptyCompare')}</Alert>
            </div>
            <div className={classNames('', 'xs:basis-full')}>
                <Button variant="tertiary" link="/">
                    {t('common:button:continueShopping')}
                </Button>
            </div>

        </div>
    );
};

export default EmptyView;
