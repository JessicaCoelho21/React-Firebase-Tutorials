import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 } from "uuid";
import _ from "lodash";

import "./App.css";

const item = {
  id: v4(),
  name: "Clean the house",
};

const item2 = {
  id: v4(),
  name: "Clean the car",
};

function App() {
  const [text, setText] = React.useState("");
  const [state, setState] = React.useState({
    todo: {
      title: "Todo",
      items: [item2, item],
    },
    "in-progress": {
      title: "In Progress",
      items: [],
    },
    done: {
      title: "Completed",
      items: [],
    },
  });

  const handleDragEnd = ({ destination, source }) => {
    if (!destination) {
      return;
    }

    if (
      destination.index === source.index &&
      destination.droppableId === source.droppableId
    ) {
      return;
    }

    //cópia da tarefa, antes de passar da coluna inicial para a nova coluna
    const itemCopy = { ...state[source.droppableId].items[source.index] };

    setState((prev) => {
      prev = { ...prev };

      //remove a tarefa da coluna inicial
      prev[source.droppableId].items.splice(source.index, 1);

      //adiciona a tarefa à nova coluna
      prev[destination.droppableId].items.splice(
        destination.index,
        0,
        itemCopy
      );

      return prev;
    });
  };

  const addItem = () => {
    setState((prev) => {
      return {
        ...prev,
        todo: {
          title: "Todo",
          items: [{ id: v4(), name: text }, ...prev.todo.items],
        },
      };
    });

    setText("");
  };

  return (
    <div className="App">
      <div>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button onClick={addItem}>Add</button>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        {_.map(state, (data, key) => {
          return (
            <div className="column" key={key}>
              <h3>{data.title}</h3>
              <Droppable droppableId={key}>
                {(provided, snapshot) => {
                  return (
                    <div
                      ref={provided.innerRef}
                      {...provided.droppableProps}
                      className="droppable-col"
                    >
                      {data.items.map((element, index) => {
                        return (
                          <Draggable
                            key={element.id}
                            index={index}
                            draggableId={element.id}
                          >
                            {(provided, snapshot) => {
                              return (
                                <div
                                  className={`item ${snapshot.isDragging && 'dragging'}`}
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                >
                                  {element.name}
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provided.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default App;
