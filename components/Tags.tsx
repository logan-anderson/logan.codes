import { TagContext } from "../components/Context/Tagcontext";
import Button from "../components/Buttons/ToggleButton";
import { useContext } from "react";
import { Tag } from "../interfaces";

const Tags = () => {
    const result = [];
    const map = new Map();
    const { tags, setTags } = useContext(TagContext)
    for (const item of tags) {
        if (!map.has(item.name)) {
            map.set(item.name, true); // set any value to Map
            result.push(item);
        }
    }
    return (
        <>
            <h4>Filter by tags:</h4>
            <div className="tags">
                {result.map((tag: Tag) => {
                    return (
                        <span key={tag.name}>
                            <Button
                                clickAction={(e) => {
                                    const newTags = tags.map((tag) => {
                                        // @ts-ignore
                                        if (tag.name === e.target.innerHTML) {
                                            return {
                                                name: tag.name,
                                                selected: !tag.selected,
                                            };
                                        } else {
                                            return tag;
                                        }
                                    });
                                    setTags(newTags);
                                }}
                                active={tag.selected}
                            >
                                {tag.name}
                            </Button>
                        </span>
                    );
                })}
            </div>
        </>
    );
};


export default Tags
