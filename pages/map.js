// import Choropleth from "../components/Choropleth";
import dataVisualiser from "../utils/dataVisualiser";
import { selectAllByServerSideParam } from "../database/model";
import { selectDataByTopicName } from "../database/model";
import StyleSelect from "../components/StyleSelect";
import selectOptions from "../utils/selectOptions";

export async function getServerSideProps(params) {
    if (params.location !== "favicon.ico") {
        // const defaultTopic = defaultValue
        //     ? {
        //         label: defaultValue?.topic,
        //         value: defaultValue?.topic,
        //     }
        //     : null;

        const topics = await selectAllByServerSideParam("topics");
        const topicOptions = [
            { value: "All", label: "All" },
            ...selectOptions(topics),
        ];
        const wellbeingData = await selectDataByTopicName("Wellbeing");
        const x = wellbeingData[0].indicator;
        console.log("indicator");
        console.log(x);
        const location = params.location;
        //Geography,Values
        //
        let indicator = "x"
        let indicatorCsv = "x,y"
        const test = await dataVisualiser(indicatorCsv, indicator, location, 'd3-maps-choropleth');
        console.log("test");
        console.log(test);
        return {
            props: {
                test,
                topicOptions,
            },
        };
    } else {
        return {
            props: {}
        }
    }
}


export default function Map({
    test,
    topicOptions,
    invisible
}) {
    return (
        <>
            <form
                action="/api/location-topic-form"
                method="POST"
                className="grid place-items-center gap-3 p-10"
            >
                <div className="flex justify-around w-full max-w-xl m-auto flex-wrap">
                    <StyleSelect
                        options={topicOptions}
                        id="topic"
                    />
                </div>

                <button
                    className=" text-lg px-4 py-2 bg-ecnmy-mint rounded-xl hover:font-bold"
                    type="submit"
                >
                    GO!
                </button>
            </form>

            <div>Map Page</div>
            <div className={`w-1/2 h-[1600px] m-auto`}>
                <iframe id="datawrapper-chart-0jKkG" src={`https://datawrapper.dwcdn.net/${test}/1/`} className="w-full min-w-full h-full" scrolling="no" frameBorder="0">
                </iframe>
            </div>
        </>
    );
}