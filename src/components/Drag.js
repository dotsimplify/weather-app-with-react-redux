import React from "react";
import { Link } from "react-router-dom";
import styles from "./Drag.module.css";
import List from "./Data";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { addCity, removeCity } from "./Redux/actions";
import { FaBars, FaTrash, FaHome } from "react-icons/fa";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const Drag = ({ addCity, removeCity, cities }) => {
  const deleteItem = (cities, index) => {
    cities.splice(index, 1);
    localStorage.setItem("city", JSON.stringify(cities));
  };
  const changeTemp = (kelvin) => {
    return kelvin - 273.15;
  };
  return (
    // Drag and drop manage cities list Item with react-beautiful dnd library

    <div className="App">
      <DragDropContext
        onDragEnd={(param) => {
          const srcI = param.source.index;
          const desI = param.destination?.index;
          if (desI) {
            cities.splice(desI, 0, cities.splice(srcI, 1)[0]);
            List.saveList(cities);
          }
        }}
      >
        <div className={styles.listContainer}>
          <div className={styles.titleDiv}>
            <h1>Manage Cities</h1>
            <h1>
              <Link to="/">
                <FaHome className="homeIcon" />
              </Link>
            </h1>
          </div>
          <Droppable droppableId="droppable-1">
            {(provided, _) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                {cities.length > 0 ? (
                  cities.map((item, i) => (
                    <Draggable
                      key={item.cityName}
                      draggableId={"draggable-" + item.cityName}
                      index={i}
                    >
                      {(provided, snapshot) => (
                        <div
                          className={styles.listItem}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          style={{
                            ...provided.draggableProps.style,
                            boxShadow: snapshot.isDragging
                              ? "0 0 .4rem #666"
                              : "none",
                          }}
                        >
                          <div
                            className={styles.barsIcon}
                            {...provided.dragHandleProps}
                          >
                            <FaBars />
                          </div>
                          <div title="City Name" className={styles.cityName}>
                            {item.cityName}
                          </div>
                          <div title="Temprature" className={styles.cityName}>
                            {Math.floor(changeTemp(item.temp))}
                            <sup>&#8451;</sup>
                          </div>
                          <div
                            title="Min/Max temprature"
                            className={styles.cityName}
                          >
                            {Math.floor(changeTemp(item.minTemp))}
                            <sup>&#8451;</sup> /{" "}
                            {Math.floor(changeTemp(item.maxTemp))}
                            <sup>&#8451;</sup>
                          </div>
                          <div title="Delete City" className={styles.cityName}>
                            <FaTrash
                              onClick={() => {
                                deleteItem(cities, i);
                                removeCity(item);
                              }}
                            />
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <h3>No cities !! Please add one</h3>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </div>
  );
};
const mapStateToProps = (state) => {
  return { cities: state.cities };
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(
    { removeCity: removeCity, addCity: addCity },
    dispatch
  );
};
// connection to the store
export default connect(mapStateToProps, mapDispatchToProps)(Drag);
