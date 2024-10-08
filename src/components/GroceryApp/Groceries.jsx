import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleDeleteItem, handleDeleteCategory } from "./util/handleDelete";
import { handleCheck } from "./util/handleCheck";
import GroceriesManagement from "./GroceriesManagement";

const Groceries = ({
  updateList,
  list,
  addNewItemVisible,
  setAddNewItemVisible,
}) => {
  const dispatch = useDispatch();
  const groceries = useSelector((state) => state.groceries.groceries);

  const [showDeleteItem, setShowDeleteItem] = useState(false);
  const [showDeleteCategory, setShowDeleteCategory] = useState(false);
  const [expandedCategories, setExpandedCategories] = useState({});

  const toggleCategory = (category) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return (
    <article className="grocery-list">
      <h2>Groceries</h2>
      {/* iterating over all objects in GROCERIES array
      group is category */}
      <div className="grocery-list-container">
        {Object.keys(groceries).map((category, index) => (
          <div key={index} className="category-container">
            {/* accessing the key that holds the name of the category */}
            <h3 onClick={() => toggleCategory(category)}>{category}</h3>
            {showDeleteCategory && (
              <button
                className="delete-icon delete-category"
                onClick={() =>
                  handleDeleteCategory(
                    category,
                    updateList,
                    dispatch,
                    groceries
                  )
                }
              >
                X
              </button>
            )}
            {expandedCategories[category] && (
              <ul className="grocery-list">
                {/* iterating over array of items in a category */}
                {groceries[category].map((item, i) => (
                  <li key={i}>
                    <div className="input-label">
                      <input
                        name={item}
                        /* passing the event and the category name to handleCheck function */
                        onChange={(e) =>
                          handleCheck(e, category, item, updateList)
                        }
                        type="checkbox"
                        checked={
                          (list[category] && list[category][item]) || false
                        }
                        value={item}
                      />
                      {item}
                    </div>
                    {showDeleteItem && (
                      <button
                        className="delete-icon"
                        onClick={() =>
                          handleDeleteItem(
                            category,
                            item,
                            updateList,
                            dispatch,
                            groceries
                          )
                        }
                      >
                        X
                      </button>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
      <GroceriesManagement
        groceries={groceries}
        showDeleteCategory={showDeleteCategory}
        showDeleteItem={showDeleteItem}
        setShowDeleteCategory={setShowDeleteCategory}
        setShowDeleteItem={setShowDeleteItem}
        addNewItemVisible={addNewItemVisible}
        setAddNewItemVisible={setAddNewItemVisible}
      />
    </article>
  );
};

export default Groceries;
