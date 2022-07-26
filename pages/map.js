import dataVisualiser from "../utils/dataVisualiser";
import { selectTopicsWithLinkedData } from "../database/model";
import StyleSelect from "../components/StyleSelect";
import selectOptions from "../utils/selectOptions";
import { useState } from "react";

export async function getServerSideProps(params) {
    if (params.location !== "favicon.ico") {

        const topics = await selectTopicsWithLinkedData();
        console.log("topics");
        console.log(topics);
        const topicOptions = [
            { value: "All", label: "All" },
            ...selectOptions(topics),
        ];

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
                topics
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
    topics,
    topicOptions,
    invisible
}) {

    let [topic, setTopic] = useState(null);



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
                        onChange={() => { setTopic(value); loadIndicators(topic) }}
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