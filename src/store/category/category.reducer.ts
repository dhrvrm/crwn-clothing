import { CategoryAction } from "./category.action";
import { CATEGORY_ACTION_TYPES, Category } from "./category.types";

export type CategoriesState = {
  readonly categories: Category[];
  readonly isLoading: boolean;
  readonly error: Error | null ;
};

const CATEGORY_INITIAL_STATE: CategoriesState = {
  categories: [],
  isLoading: false,
  error: null,
};

export const categoryReducer = (
  state = CATEGORY_INITIAL_STATE,
  action = {} as CategoryAction
) => {
  switch (action.type) {
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_START:
      return {
        ...state,
        isLoading: true,
      };
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
      return {
        ...state,
        categories: action.payload,
        isLoading: false,
      };
    case CATEGORY_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
      return {
        ...state,
        error: action.payload,
        isLoading: false,
      };

    default:
      return state;
  }
};
