// here i started used hard coded list instead of calling api
const List = {
  getList: function () {
    return (
      (localStorage.getItem("city") &&
        JSON.parse(localStorage.getItem("city"))) ||
      []
    );
  },
  saveList: (list) => {
    localStorage.setItem("city", JSON.stringify(list));
  },
  deleteItem: (list, index) => {
    list.splice(index, 1);
    localStorage.setItem("city", JSON.stringify(list));
  },
};

export default List;
