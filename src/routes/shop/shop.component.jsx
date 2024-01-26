import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import CategoriesPreview from "../categories-preview/categories-preview.component";
import Category from "../category/category.component";
import { useDispatch } from "react-redux";
import { fetchCategoriesAsync } from "../../store/category/category.action";

const Shop = () => {
  const disptach = useDispatch();
  useEffect(() => {
    disptach(fetchCategoriesAsync());
  }, []);

  return (
    <Routes>
      <Route index element={<CategoriesPreview />} />
      <Route path=":category" element={<Category />} />
    </Routes>
  );
};

export default Shop;
