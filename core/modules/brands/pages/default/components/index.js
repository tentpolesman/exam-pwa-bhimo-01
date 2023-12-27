import { breakPointsUp } from '@helper_theme';
import classNames from 'classnames';
import AllBrands from '@core_modules/brands/pages/default/components/all';
import Featured from '@core_modules/brands/pages/default/components/featured';

const Component = (props) => {
    const { t, featured } = props;
    const desktop = breakPointsUp('sm');
    return (
        <div className={classNames('wrapper-brands mb-[40px]')}>
            <Featured t={t} featured={featured} desktop={desktop} />
            <AllBrands {...props} />
        </div>
    );
};

export default Component;
