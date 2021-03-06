import { Histogram, BarSeries, withParentSize, XAxis, YAxis } from '@data-ui/histogram';

export const BarGraph = (props) => {

    const ResponsiveHistogram = withParentSize(({ parentWidth, parentHeight, ...rest }) => (
        <Histogram
            width={parentWidth}
            height={parentHeight}
            {...rest}
        />
    ))

    function getDate(date) {
        const a = +date;
        const dateConv = new Date(a);
        return dateConv.toLocaleDateString();
    }

    const { loading, error, data } = props.posts;

    if (loading) return <p>Loading...</p>;
    if (error) return console.log(error);

    const filteredData = data.allPosts.filter(({ published, createdAt }) => {
        return published && new Date(getDate(createdAt)).getFullYear() >= 2019;
    });

    const months = filteredData.map((post) => {
        return new Date(getDate(post.createdAt)).getMonth();
    });


    console.log(months)

    const monthsObj = months.reduce((acc, month) => {
        acc[month] = (acc[month] || 0) + 1;
        return acc;
    }, {});

    console.log(monthsObj);

    const rawData = Object.values(monthsObj);

    console.log(rawData);
    return (
        <ResponsiveHistogram
            ariaLabel="My histogram of ..."
            orientation="vertical"
            cumulative={false}
            normalized={false}
            binCount={25}
            valueAccessor={datum => datum}
            binType="numeric"
            renderTooltip={({ event, datum, data, color }) => (
                <div>
                    <div><strong>count </strong>{datum.count}</div>
                </div>
            )}
        >
            <BarSeries
                rawData={rawData}
            />
            <XAxis label="Months" />
            <YAxis label="Number of posts" />
        </ResponsiveHistogram>
    );

}
