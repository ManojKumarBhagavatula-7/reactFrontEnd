import { useState } from "react";
//import { MouseEvent } from "react";

interface ListGroupsProps {
    items: string[];
    heading: string;
    onSelectItem: (item: string)=> void;
}

function ListGroups({items, heading, onSelectItem}: ListGroupsProps) {

  //items=[];
  // const eventHandler = (event:MouseEvent) =>{console.log(event)};
  const [selectedIndex, setSelectedIndex] = useState(-1);


  return (
    <>
      <h1>{heading}</h1>
      <ul className="list-group">
        {/* {items.length === 0 && <p>No items found</p>} */}
        {items.map((item, index) => (
          <li
            className={
              selectedIndex === index
                ? "list-group-item active"
                : "list-group-item"
            }
            onClick={() => {
              setSelectedIndex(index);
              onSelectItem(item);
            }}
            key={index}
          >
            {item}
          </li>
        ))}
      </ul>
    </>
  );
}

export default ListGroups;
