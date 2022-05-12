import {ChangeEvent, FC, useEffect, useState} from "react";
import dummyData from "./data.json";

import './AutoComplete.css';

type AutoCompleteProps = {
    fetchDataType: string;
};

interface IData {
    name: string;
    code: string;
}

const fetchLiveData = async (value: string) => {
    try {
        const response = await fetch("http://universities.hipolabs.com/search?country=United+States");

        if (!response.ok) {
            console.log(response.status);
            return [ ];
        }

        let liveData = await response.json();

        const regex = new RegExp(`${value}`, "i");
        liveData = liveData.filter((v: IData) => regex.test(v.name));

        return liveData.map((v: IData) => {
            return {
                name: v.name,
                code: Math.random().toString(),
            }
        }).sort();

    } catch (e) {
        console.log(e);
        return [ ];
    }
};

const fetchDummyData = async (value: string) => {
    try {
        const regex = new RegExp(`${value}`, "i");
        return dummyData.sort().filter((v: IData) => regex.test(v.name));
    } catch (e) {
        console.log(e);
        return [ ];
    }
};

function useDebounce<T>(value: T, delay?: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay || 500)
        return () => {
            clearTimeout(timer)
        }
    }, [value, delay])

    return debouncedValue
}

export const AutoComplete: FC<AutoCompleteProps> = (props) => {

    const { fetchDataType } = props;
    const [search, setSearch] = useState({ text: "", suggestions: [] });
    const [isComponentVisible, setIsComponentVisible] = useState(true);
    const debouncedValue = useDebounce<string>(search.text, 1000);
    const [isBusy, setIsBusy] = useState(false);

    useEffect( () => {
        (async () => {
            if (!debouncedValue) {
                return;
            }

            setIsBusy(true);
            let suggestions: any = [];
            suggestions = fetchDataType === 'dummy' ? await fetchDummyData( debouncedValue ) : await fetchLiveData( debouncedValue );
            setIsComponentVisible(true);

            setSearch({
                text: debouncedValue,
                suggestions
            });

            setIsBusy(false);
        })();
    }, [debouncedValue]);

    const onTextChanged = (e: ChangeEvent<HTMLInputElement>) => {
        setSearch({
            text: e.target.value,
            suggestions: []
        });
    };

    const suggestionSelected = (value: IData) => {
        setIsComponentVisible(false);
        setSearch({
            text: value.name,
            suggestions: []
        });
    };

    const highlightedSuggestion = (item: string) =>
        item.split(new RegExp(`(${debouncedValue})`, `gi`)).map((piece: string, index: number) => {
            return (
                <span
                    key={index}
                    style={{
                        background:
                            piece.toLowerCase() === debouncedValue.toLocaleLowerCase()
                                ? "YELLOW"
                                : "TRANSPARENT"
                    }}
                >
              {piece}
            </span>
            );
        });

    const { suggestions } = search;

    return (
        <div className="root">

            <p>Value real-time: {search.text}</p>
            <p>Debounced value: {debouncedValue}</p>

            <div>
                <input
                    id="input"
                    autoComplete="off"
                    value={search.text}
                    onChange={onTextChanged}
                    type={"text"}
                    disabled={isBusy}
                />
            </div>
            {suggestions.length > 0 && isComponentVisible && (
                <ul>
                    {suggestions.map((item: IData) => (
                        <li key={item.code}>
                            <button
                                key={item.code}
                                onClick={() => suggestionSelected(item)}
                            >
                                {highlightedSuggestion(item.name)}
                            </button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};