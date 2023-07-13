import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = (): React.JSX.Element => (
    <ContentLoader
        speed={2}
        width={280}
        height={466}
        viewBox='0 0 280 483'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
        className='pizza-block'
    >
        <rect x='0' y='280' rx='10' ry='10' width='280' height='27' />
        <circle cx='130' cy='130' r='130' />
        <rect x='0' y='330' rx='14' ry='14' width='280' height='88' />
        <rect x='124' y='436' rx='22' ry='22' width='152' height='45' />
        <rect x='0' y='448' rx='9' ry='9' width='93' height='30' />
    </ContentLoader>
);

export default Skeleton;
