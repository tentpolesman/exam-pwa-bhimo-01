import Typography from '@common_typography';
import Button from '@common_button';
import Link from 'next/link';
import classNames from 'classnames';
import useStyles from './style';

const EmptyView = (props) => {
    const styles = useStyles();
    const { t } = props;
    return (
        <div className={classNames(styles.container, styles.containerEmpty, 'row center-xs')}>
            <div className="xs:basis-full">
                <Typography variant="span" type="regular" align="center">
                    <span className={styles.emptyCart}>{t('common:productCompare:emptyCompare')}</span>
                </Typography>
            </div>
            <div className={classNames(styles.butonEmpty, 'xs:basis-full')}>
                <Link href="/">

                    <Button className={styles.toolbarButton}>
                        {t('common:button:continueShopping')}
                    </Button>

                </Link>
            </div>

        </div>
    );
};

export default EmptyView;
