import dataVisualiser from "../utils/dataVisualiser";
import { selectDistinctTopicsWithData, selectTopicsWithLinkedData } from "../database/model";
import StyleSelect from "../components/StyleSelect";
import Select from "react-select"
import selectOptions from "../utils/selectOptions";
import { useState, useEffect } from "react";

export async function getServerSideProps(params) {
    if (params.location !== "favicon.ico") {
        const datasets = await selectAllByServerSideParam("datasets")
        const topics = await selectDistinctTopicsWithData();
        const allIndicatorOptions = await selectTopicsWithLinkedData();
        const filteredAllIndicators = allIndicatorOptions.filter((optionA, index, arr) => arr.findIndex(optionB => (optionB.indicator === optionA.indicator)) === index)
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
        let indicatorCsv = `Location,`
        const test = await dataVisualiser(indicatorCsv, indicator, location, 'd3-maps-choropleth');
        console.log("test");
        console.log(test);

        return {
            props: {
                datasets,
                test,
                topicOptions,
                topics,
                allIndicatorOptions,
                filteredAllIndicators
            },
        };
    } else {
        return {
            props: {}
        }
    }
}

export default function Map({
    datasets,
    test,
    topics,
    topicOptions,
    invisible,
    allIndicatorOptions,
    filteredAllIndicators
}) {
    const [topic, setTopic] = useState({ value: "All", label: "All" });
    const [indicatorOptions, setIndicatorOptions] = useState(selectOptions(filteredAllIndicators))
    const [mapId, mapLoading, setMapData] = useChoropleth()
    useEffect(() => {

        const filteredIndicators = topic.value === "All" ? filteredAllIndicators : allIndicatorOptions.filter((option) => option.name === topic.value);
        const newOptions = selectOptions(filteredIndicators, "indicator")
        setIndicatorOptions(newOptions)
    }, [topic, allIndicatorOptions, filteredAllIndicators])

    return (
        <>
            <form
                method="POST"
                className="grid place-items-center gap-3 p-10"
            >
                <div className="flex justify-around w-full max-w-xl m-auto flex-wrap">
                    <StyleSelect
                        defaultValue={topic}
                        options={topicOptions}
                        id="topic"
                        setTopic={setTopic}
                    />
                    <StyleSelect
                        options={indicatorOptions}
                        id="indicator"
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