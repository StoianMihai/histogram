import {
    Histogram,
    BarSeries,
    withParentSize,
    XAxis,
    YAxis
} from "@data-ui/histogram";
import { getPosts } from "../api/posts";
import { useQuery } from "@apollo/client";
import { getDate } from "./GetDate";

export const BarGraph = () => {
    const ResponsiveHistogram = withParentSize(
        ({ parentWidth, parentHeight, ...rest }) => (

            <Histogram width={parentWidth} height={parentHeight} {...rest} />
        )
    );

    const { loading, error, data } = useQuery(getPosts(10));

    if (loading) return <p>Loading...</p>;
    if (error) return <p>A aparut o erroare {error.meesage}</p>;

    console.log(data)

    // returnam posturile publicate si dupa anul 2019
    const filteredData = data.allPosts.filter(({ published, createdAt }) => {
        return published && new Date(getDate(createdAt)).getFullYear() >= 2019;
    });


    // console.log('filterdata', filteredData)

    // returnam toate lunile in care avem postari
    const months = filteredData.map((post) => {
        return new Date(getDate(post.createdAt)).getMonth();
    });

    //console.log('luna: ', months)

    // postari pe luna
    const monthsObj = months.reduce((acc, month) => {
        acc[month] = (acc[month] || 0) + 1;
        return acc;

    }, {});

    const getMonths = (month) => {
        switch (month) {
            case "0":
                return "Ianuarie";
            case "1":
                return "Februarie";
            case "2":
                return "Martie";
            case "3":
                return "Aprilie";
            case "4":
                return "Mai";
            case "5":
                return "Iunie";
            case "6":
                return "Iulie";
            case "7":
                return "August";
            case "8":
                return "Septembrie";
            case "9":
                return "Octombrie";
            case "10":
                return "Noiembrie";
            case "11":
                return "Decembrie";
            default:
                return ""
        }
    }

    // afisam luna in format string
    const afisareLuna = Object.keys(monthsObj).map((luna) => getMonths(luna))

    const rawData = Object.values(monthsObj);


    const finalArray = (afisareLuna, rawData) => {
        const keys = Object.keys(rawData);
        const res = {};
        for (let a in afisareLuna) {
            res[afisareLuna[a]] = rawData[keys[a]];
            rawData[afisareLuna[a]] = rawData[keys[a]];
            delete rawData[keys[a]];
        }
    }
    finalArray(afisareLuna, rawData)

    //console.log('nr de posturi per luna ', rawData);


    return (
        <ResponsiveHistogram
            ariaLabel="My histogram of ..."
            orientation="vertical"
            cumulative={true}
            normalized={true}
            binCount={25}
            valueAccessor={(datum) => datum}
            binType="categorical"
            renderTooltip={({ event, datum, data, color }) => (
                <div>
                    <div>
                        <strong>count </strong>
                        {datum.count}
                    </div>
                </div>
            )}
        >
            <BarSeries animated={false} rawData={rawData} />
            <XAxis label={afisareLuna.toString()} />
            <YAxis label="Number of posts" />
        </ResponsiveHistogram>
    );
};

